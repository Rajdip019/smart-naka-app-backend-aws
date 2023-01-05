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
  // Set the parameters for the scan
  const prevMiliSec = Date.now() - event.time * 24 * 60 * 60 * 100;
  const params = {
    ExpressionAttributeValues: {
      ":val1": { S: event.policeStation },
      ":val2": { N: prevMiliSec.toString() },
    },
    ExpressionAttributeNames: {
      "#keyone": "lostDiaryDetails",
      "#keytwo": "filedPoliceStation",
      "#keythree": "filedAtTimeStamp",
    },
    FilterExpression: "#keyone.#keytwo = :val1 and #keyone.#keythree >= :val2",
    TableName: tableName,
  };

  const returnData = await dynamodb
    .scan(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Items);
      }
    })
    .promise();
  const unmarshalled = returnData.Items.map((i) =>
    AWS.DynamoDB.Converter.unmarshall(i)
  );
  return { data: unmarshalled, count: returnData.Count};
};
