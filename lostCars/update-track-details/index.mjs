import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
AWS.config.region = "ap-south-1";

const tableName = process.env.TABLE_NAME;

// Create the DynamoDB service object
var dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

export const handler = async (event) => {
  const lastedTrackingData = AWS.DynamoDB.Converter.marshall({
    "location": event.location,
    "timeStamp": Date.now(),
  });
  console.log(lastedTrackingData);
  try{
      const data = await dynamodb.updateItem({
          TableName: tableName,
          Key: {number: { S: event.number }},
          UpdateExpression: "SET #trackDetails = list_append(:newTrackedDetails, #trackDetails)",
          "ExpressionAttributeNames" : {
            "#trackDetails" : "trackDetails"
          },
          ExpressionAttributeValues: {
            ":newTrackedDetails": { L : [{M :lastedTrackingData}]}
          },
        })
        .promise();
        return data
  }catch(e){
    console.log(e);
  }
};
