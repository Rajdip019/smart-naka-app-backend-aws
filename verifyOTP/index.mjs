import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
AWS.config.region = "ap-south-1";

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

const getLastPassword = async (number, otp) => {
  var getPrams = {
    TableName: tableName,
    Key: {
      phone_number: number,
    },
  };
  const result = await dynamodb.get(getPrams).promise();
  if (
    result.Item &&
    result.Item.EXPIRATION_TIME < Math.round(new Date().getTime() / 1000)
  ) {
    return {"error" : "OTP expired."};
  }else{
    if(otp === result.Item.OTP){
      return {"success" : true};
    }else{
      return {"success" : false};
    }
  }
};

export const handler = async (event) => {
  if (!event.number) throw Error("No number provided");
  if (!event.otp) throw Error("No otp to verify provided");
  const res = await getLastPassword(event.number, event.otp);
  return res;
};
