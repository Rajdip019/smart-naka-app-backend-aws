import AWS from "aws-sdk";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import twilio from "twilio";

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

export const handler = async (event) => {
  if (!event.number) throw Error("No number provided");
  const otp = generatePassword();
  const TTL = event.TTL;
    await logPassword(otp, event.number, TTL);
    const accountSid = process.env.TWILIO_ACCOUNT_SID; 
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    try{
      const client = new twilio(accountSid, authToken);
      await client.messages
        .create({
           body: `Here is your OTP of Smart Naka App - ${otp}. This OTP will be expired within 60 seconds and don't share this with anyone.`,
           from: '+17207384969',
           to: event.number
         })
        .then(message => console.log(message.sid)); 
      return { statusCode: 200, timeStamp: Date.now() };
    }catch(e){
      console.log("error",e);
    }
};
