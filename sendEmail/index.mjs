import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
AWS.config.region = "ap-south-1";

export const handler = async (event) => {
  // Create sendEmail params
  const params = {
    Destination: {
      ToAddresses: [event.Records[0].messageAttributes.toEmail.stringValue],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<html>
       <head></head>
       <body>
       <h1>${event.Records[0].messageAttributes.carNumber.stringValue} car is found!</h1>
       <h2>Car details:</h2>
       <ul>
       <li>Model : ${event.Records[0].messageAttributes.model.stringValue}</li>
       <li>Number : ${event.Records[0].messageAttributes.carNumber.stringValue}</li>
       <li>Color : ${event.Records[0].messageAttributes.color.stringValue}</li>
       </ul>
       <p>${event.Records[0].messageAttributes.carFoundDetails.stringValue}</p>
       <br/>
       <h3>You may now contant the car owner, ${event.Records[0].messageAttributes.carOwner.stringValue}. </h3>
       <p>Owner's contact number is : ${event.Records[0].messageAttributes.ownerNumber.stringValue} and ${event.Records[0].messageAttributes.ownerAddress.stringValue} is this address</p>
       <br/>
       <p>This message has some secret information don't share this with anyone.</p>
       <p> - By Assam Police </p>
       </body>
       </html>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "Your car is found",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `${event.Records[0].messageAttributes.carNumber.stringValue} car is found!`,
      },
    },
    Source: "rajdipgupta019@gmail.com" /* required */,
  };

  // Create the promise and SES service object
  const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  await sendPromise;
  const response = {
    statusCode: 200,
    body: JSON.stringify({ success: "Email sent" }),
  };
  return response;
};
