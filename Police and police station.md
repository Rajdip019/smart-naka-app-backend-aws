# Police/user

## `/police/get`

Body 

```json
{
    "id": "WBN123556790" // This id is for Roshan
}
```

`Debajyoti’s ID : “WBN123556788”`

### Success Response :

```json
{
  "policeStation": "Belghoria Police Station",
  "post": "Chief Officer",
  "number": "+916299511009",
  "id": "WBN123556790",
  "name": "Roshan Kumar",
  "age": 31,
}
```

### Get Specific attributes :

Coming soon….

## Get Notifications ( Home page ) `get-police-station-notifications`

Body 

```json
{
  "policeStation" : "Belghoria Police Station"
}
```

`Debajyoti’s ID : “WBN123556788”`

### Success Response :

```json
{
  "stationId": "belghoria-police-station",
  "trackDetails": [
    {
      "timeStamp": 1673174355298,
      "number": "BR31L2411",
      "location": "Test location"
    }
  ]
}
```

### Get Specific attributes :

Coming soon….
