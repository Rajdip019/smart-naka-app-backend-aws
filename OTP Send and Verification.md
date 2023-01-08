# OTP send and Verification

## Send OTP `/otp/send`

Body 

```json
{
    "number": "+918910020967",
    "TTL" : 60 // time in seconds
}
```

### Success Response :

```json
{
	"statusCode" : 200,
	"otp" : "123456",
	"timeStamp" : 164752634
}
```

## Verify OTP `/otp/verify`

Body 

```json
{
    "number": "+918910020967", // number of user
    "otp" : "106952" //The OTP you get from user
}
```

### Success Response :

```json
{
	"success" " true
}
```
