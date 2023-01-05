import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
AWS.config.region = "ap-south-1";

const dynamodb = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS({ region: "ap-south-1" });

const tableName = process.env.TABLE_NAME;

const generatePassword = () => {
  return (Math.floor(Math.random() * (999999 - 100000)) + 100000).toString();
};

const logPassword = async (password, phone, TTL) => {
  const putPrams = {
    TableName: tableName,
    Item: {
      phone_number: phone,
      OTP: password,
      EXPIRATION_TIME: Math.round(new Date().getTime() / 1000) + TTL,
    },
  };
  await dynamodb.put(putPrams).promise();
};

const isNumberOptedOut = async (number) => {
  const response = await sns
    .checkIfPhoneNumberIsOptedOut({
      phoneNumber: number,
    })
    .promise();
  return response.isOptedOut;
};

export const handler = async (event) => {
  if (!event.number) throw Error("No number provided");
  if (await isNumberOptedOut(event.number)) throw Error("Number opted out");
  const otp = generatePassword();
  const TTL = event.TTL;
  try {
    await logPassword(otp, event.number, TTL);
    await sns
      .publish({
        Message: `Here is your OTP of Smart Naka App - ${otp}. This OTP will be expired within 60 seconds and don't share this with anyone.`,
        PhoneNumber: event.number,
        MessageAttributes: {
          "AWS.SNS.SMS.SenderID": {
            DataType: "String",
            StringValue: "Naka-App",
          },
          "AWS.SNS.SMS.SMSType": {
            DataType: "String",
            StringValue: "Transactional",
          },
        },
      })
      .promise();
    return { statusCode: 200, otp: otp, timeStamp: Date.now() };
  } catch (e) {
    console.log("error :", e);
    return { error: "Something went wrong" };
  }
};
