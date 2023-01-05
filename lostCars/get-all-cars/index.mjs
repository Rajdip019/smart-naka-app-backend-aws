import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
AWS.config.region = "ap-south-1";

const tableName = process.env.TABLE_NAME;

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async () =>  {
    return dynamodb.scan({ TableName: tableName })
    .promise()
    .then(response => response.Items)
};