import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
AWS.config.region = "ap-south-1";

const s3 = new AWS.S3({});

export const handler = async (event) => {
  const uploadedImage = await s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: (Date.now()).toString(),
      Body: event.image,
    })
    .promise();

  return uploadedImage;
};
