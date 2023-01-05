import AWS from "aws-sdk";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
const sqsClient = new SQSClient({ region: "ap-south-1" });

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
AWS.config.region = "ap-south-1";

const tableName = process.env.TABLE_NAME;
var dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

export const handler = async (event) => {
  const foundCarDetails = AWS.DynamoDB.Converter.marshall(event.foundCarDetails)
  try {
    await dynamodb
      .updateItem({
        TableName: tableName,
        Key: { number: { S: event.number } },
        UpdateExpression: "SET #foundCarDetails = :v_foundCarDetails, #isFound = :v_isFound",
        ExpressionAttributeNames: {
          "#foundCarDetails": "foundCarDetails",
          "#isFound" : "isFound"
        },
        ExpressionAttributeValues: {
          ":v_foundCarDetails": { M: foundCarDetails },
          ":v_isFound" : {
            "BOOL": true
           }
        },
      })
      .promise();
  } catch (e) {
    console.log(e);
  }

  const paramsforSQS = {
    // Remove DelaySeconds parameter and value for FIFO queues
    DelaySeconds: 1,
    MessageAttributes: {
      toEmail: {
        DataType: "String",
        StringValue: event.emailDetails.toEmail,
      },
      carNumber: {
        DataType: "String",
        StringValue: event.emailDetails.carNumber,
      },
      model: {
        DataType: "String",
        StringValue: event.emailDetails.model,
      },
      color: {
        DataType: "String",
        StringValue: event.emailDetails.color,
      },
      carFoundDetails: {
        DataType: "String",
        StringValue: `The car is found at ${event.emailDetails.foundPlace} and being found by ${event.emailDetails.foundByPolice} officer who is from ${event.emailDetails.policeStation} at this ${event.emailDetails.time} on this ${event.emailDetails.date}.`,
      },
      carOwner: {
        DataType: "String",
        StringValue: event.emailDetails.carOwner,
      },
      ownerNumber: {
        DataType: "String",
        StringValue: event.emailDetails.ownerNumber,
      },
      ownerAddress: {
        DataType: "String",
        StringValue: event.emailDetails.ownerAddress,
      },
    },
    MessageBody: "Send Email to in-charge police station if a car is found!",
    QueueUrl: "https://sqs.ap-south-1.amazonaws.com/814090889453/email-queue",
  };

  try {
    const data = await sqsClient.send(new SendMessageCommand(paramsforSQS));
    if (data) {
      console.log("Success, message sent. MessageID:", data.MessageId);
    }
  } catch (err) {
    console.log("Error", err);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      success: "Car is found",
    }),
  };
  return response;
};
