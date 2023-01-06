import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
AWS.config.region = "ap-south-1";
const sns = new AWS.SNS();

export const handler = async (event) => {
  const topicName = event.topicName.replace(/\s+/g, "-").toLowerCase();

  const createTopicPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .createTopic({ Name: topicName })
    .promise();

  const newTopic = await createTopicPromise;
  
  await sns
    .publish({
      Message: JSON.stringify({
        default: "Sample fallback message",
        GCM: JSON.stringify({
          notification: { body: event.description, title: event.title },
          data: {
            click_action: "FLUTTER_NOTIFICATION_CLICK",
            status: "done",
            body: event.carNumber,
            title: event.title
          },
        }),
      }),
      MessageStructure: "json",
      Subject: "A new notification form Lamda",
      TopicArn: newTopic.TopicArn,
    })
    .promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify({ success: "Push notification sent" }),
  };
  return response;
};
