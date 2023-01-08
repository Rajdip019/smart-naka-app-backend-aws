import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
AWS.config.region = "ap-south-1";

const s3 = new AWS.S3({ params: {Bucket: process.env.AWS_S3_BUCKET_NAME}});

export const handler = async (event) => {
  var buf = Buffer.from(
    event.imageBinary.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const key = event.name+'-'+(Date.now()).toString();
  const putParams = {
    Key: key,
    Body: buf,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
  };

  const getParams = {
    Key: key,
  }

  // Putting the object in the database
  await s3.putObject(putParams, function (err, data) {
    if (err) {
      console.log(err);
      console.log("Error uploading data: ", data);
    } else {
      console.log("successfully uploaded the image!");
    }
  }).promise();

  // getting the url of the database
  try{
    const url = s3.getSignedUrl('getObject',getParams);
    return {"url" : url};
  }catch(e){
    console.log("error: ", e);
    return {"error" : "Something went wrong."}
  }
  
};
