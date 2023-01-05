import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
AWS.config.region = "ap-south-1";

const sns = new AWS.SNS();

export const handler = async (event) => {
  console.log(JSON.stringify(event, null, 2));
  try {
    await sns
      .publish({
        Message: JSON.stringify({
          default: "Sample fallback message",
          http: JSON.stringify({
            car_number: event.Records[0].dynamodb.Keys.number.S,
            action: event.Records[0].eventName,
          }),
        }),
        Subject: "A new notification form Lamda",
        TopicArn: "arn:aws:sns:ap-south-1:814090889453:naka-local-car-data",
      })
      .promise();
  } catch (e) {
    console.log("error", e);
  }
  console.log(event.Records[0].dynamodb.Keys.number.S);

  const response = {
    statusCode: 200,
    body: JSON.stringify({ success: "Database Update request sent" }),
  };
  return response;
};
