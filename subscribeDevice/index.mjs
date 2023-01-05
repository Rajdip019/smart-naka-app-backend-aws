import AWS from "aws-sdk";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
const sqsClient = new SQSClient({ region: "ap-south-1" });

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
AWS.config.region = "ap-south-1";

// Make sure this is initialized *after* AWS SDK is configured
const sns = new AWS.SNS();

export const handler = async (event) => {
  const createSNSEndpoint = async (deviceToken) => {
    const params = {
      PlatformApplicationArn:
        "arn:aws:sns:ap-south-1:814090889453:app/GCM/Smart_Naka_Test" /* from step 1 */,
      Token: deviceToken,
    };

    return sns.createPlatformEndpoint(params).promise();
  };

  const subscribeDeviceToTopic = async (endpointArn) => {
    const params = {
      Protocol: "application",
      TopicArn:
        "arn:aws:sns:ap-south-1:814090889453:smart-naka-admin" /* from step 2 */,
      Endpoint: endpointArn,
    };

    return sns.subscribe(params).promise();
  };

  const result = await createSNSEndpoint(event.deviceToken);
  const endpointArn = result.EndpointArn;
  await subscribeDeviceToTopic(endpointArn);

  const paramsforSQS = {
    // Remove DelaySeconds parameter and value for FIFO queues
    DelaySeconds: 1,
    MessageAttributes: {
      deviceEndPoint: {
        DataType: "String",
        StringValue: endpointArn,
      },
      topicName: {
        DataType: "String",
        StringValue: event.topicName,
      },
    },
    MessageBody: "Subscribe to in-chrage police station notifications",
    QueueUrl: "https://sqs.ap-south-1.amazonaws.com/814090889453/lamda-queue",
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
      deviceEndPoint: endpointArn,
      topicName: event.topicName,
    }),
  };
  return response;
};
