# smart-naka-app-backend-aws

# Basic

The main `URL`for the API is : 

```
https://1aksik8wwi.execute-api.ap-south-1.amazonaws.com/dev
```

## Authentication:

In the HTTP header you need to pass this 👇

```json
{
	"x-api-key" : PUT YOUR API KEY // put this in env
}
```
`For API key to test the endpoints you can reach out to me. 😉 

## Update Tracking Details : ( Need to be updated from the camera system )

### `/lost-cars/update-tracking-details`

Body

```json
{
  "number" : "BR31L2411",
  "policeStation" : "Belghoria Police Station",
  "location": "Test location"
}
```

Will return empty object

## Send Notification : ( Need to be updated from the camera system )

### `/send-notification`

Body

```json
{
  "title": "This is a message",
  "description": "This is a description of a message",
	"topicName" : "Belghoria Police Station",
	"carNumber" : "BR31L2411"
}
```

Return :

```json
{
  "statusCode": 200,
  "body": "{\"success\":\"Push notification sent\"}"
}
```
