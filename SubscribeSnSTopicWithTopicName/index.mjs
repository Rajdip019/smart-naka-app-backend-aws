import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
AWS.config.region = "ap-south-1";

// Handle promise's fulfilled/rejected states
export const handler = async (event) => {
  //Changing the name to a topic name
console.log(event.Records[0].messageAttributes);
  const topicName = event.Records[0].messageAttributes.topicName.stringValue
    .replace(/\s+/g, "-")
    .toLowerCase();

  //Creating a new topic if not already exists
  const createTopicPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .createTopic({ Name: topicName })
    .promise();

  const newTopic = await createTopicPromise;

  // subscribing to the new topic arn
  const params = {
    Protocol: "application",
    TopicArn: newTopic.TopicArn /* from step 2 */,
    Endpoint: event.Records[0].messageAttributes.deviceEndPoint.stringValue
  };

  const subscribe = new AWS.SNS({ apiVersion: "2010-03-31" })
    .subscribe(params)
    .promise();

  await subscribe;

  console.log("Subscribbed to" + newTopic.TopicArn);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      topicArn: newTopic.TopicArn,
    }),
  };
  return response;
};
