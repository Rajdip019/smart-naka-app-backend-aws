import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
AWS.config.region = "ap-south-1";

const carTable = process.env.CAR_TABLE_NAME;
const policeStationTable = process.env.POLICE_STATION_TABLE_NAME;

// Create the DynamoDB service object
var dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

export const handler = async (event) => {

  const policeStation = event.policeStation
  .replace(/\s+/g, "-")
  .toLowerCase();

  const lastedTrackingData = AWS.DynamoDB.Converter.marshall({
    "location": event.location,
    "timeStamp": Date.now(),
  });

  const lastedTrackingDataPoliceStation = AWS.DynamoDB.Converter.marshall({
    "location": event.location,
    "timeStamp": Date.now(),
    "number" : event.number
  });
  console.log(lastedTrackingData);
  try{
      await dynamodb.updateItem({
          TableName: carTable,
          Key: {"number": { S: event.number }},
          UpdateExpression: "SET #trackDetails = list_append(:newTrackedDetails, #trackDetails)",
          "ExpressionAttributeNames" : {
            "#trackDetails" : "trackDetails"
          },
          ExpressionAttributeValues: {
            ":newTrackedDetails": { L : [{M :lastedTrackingData}]}
          },
        })
        .promise();
  }catch(e){
    console.log(e);
  }

  try{
    const data = await dynamodb.updateItem({
        TableName: policeStationTable,
        Key: {"stationId": { S: policeStation }},
        UpdateExpression: "SET #trackDetails = list_append(:newTrackedDetails, #trackDetails)",
        "ExpressionAttributeNames" : {
          "#trackDetails" : "trackDetails"
        },
        ExpressionAttributeValues: {
          ":newTrackedDetails": { L : [{M :lastedTrackingDataPoliceStation}]}
        },
      })
      .promise();
      return data
}catch(e){
  console.log(e);
}
};
