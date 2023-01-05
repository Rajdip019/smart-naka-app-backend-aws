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

  const missingDairyData = AWS.DynamoDB.Converter.marshall(event.missingDairyData);

  const params = {
    TableName: tableName,
    Item: missingDairyData
  };

  // Call DynamoDB to read the item from the table
  const data = await dynamodb
    .putItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
        return data;
      }
    })
    .promise();

  return data;
};
