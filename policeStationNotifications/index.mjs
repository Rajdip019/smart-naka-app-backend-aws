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
  const policeStation = event.policeStation.replace(/\s+/g, "-").toLowerCase();

  const params = {
    TableName: tableName,
    Key: {
      stationId: { S: policeStation },
    },
  };

  try {
    const data = await dynamodb
      .getItem(params, function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Item);
          return data.Item;
        }
      })
      .promise();
  
    return AWS.DynamoDB.Converter.unmarshall(data.Item);
  } catch (e) {
    console.error("error", e);
    return { error: "Something went wrong" };
  }
};

