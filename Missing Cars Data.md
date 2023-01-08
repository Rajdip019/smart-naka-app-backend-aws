## Get a car data `/lost-cars/get-a-car`

Body 

```json
{
  "number" : "BR31L2411"
}
```

### Success Response :

```json
{
  "model": "Honda Suzuki",
  "lostDiaryDetails": {
    "filedPoliceStation": "Belghoria Police Station",
    "filedByOfficer": {
      "name": "Chingam Pandey",
      "id": "SK23C2345"
    },
    "email": "rajdeep@gmail.com",
    "filedAtTimeStamp": 1672816550273,
    "filedBy": "Rajdeep Sengupta"
  },
  "number": "WB23A3217",
  "carOwnerDetails": {
    "name": "Rajdeep Sengupta",
    "phone": 9528556566,
    "address": "Patna South City"
  },
  "trackDetails": [
    {
      "timeStamp": 1672816498785,
      "location": "Ruby more"
    },
    {
      "timeStamp": 1672816530647,
      "location": "Ghoria more"
    },
    {
      "timeStamp": 1672816550273,
      "location": "Beleghata"
    },
    {
      "timeStamp": 1672816565054,
      "location": "Ruby More"
    }
  ],
  "foundCarDetails": {
    "foundAtTimeStamp": 1672816550273,
    "foundByOfficer": {
      "name": "Tawde",
      "id": "SK23C2445"
    },
    "foundAt": "Patna City",
    "foundAtpoliceStation": "Patna Police Station"
  },
  "isFound": true,
  "color": "black",
  "imgs": [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKhwKEqKCtkoL1n6BXf5SEClFFvQqN-L75kw&usqp=CAU",
    "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa2%2F4b%2Fb7%2Fa24bb7b96a790cf62bfcfe839f1666ff.jpg&imgrefurl=https%3A%2F%2Fin.pinterest.com%2Fpin%2F140596819588636968%2F&tbnid=JgCDFfQ4IahxhM&vet=12ahUKEwj0qbPgrq38AhXRoukKHQ4sAHQQMygpegUIARDKAg..i&docid=V9vs-VBDBQDvYM&w=816&h=612&q=same%20car%20images&ved=2ahUKEwj0qbPgrq38AhXRoukKHQ4sAHQQMygpegUIARDKAg"
  ]
}
```

### Get Specific attributes :

Body 

```json
{
  "number" : "WB23A3217",
  "attributes" : "model, foundCarDetails, color" // add what attributes you want seperated by comma
}
```

### Success Response :

```json
{
  "model": "Honda Suzuki",
  "foundCarDetails": {
    "foundAtTimeStamp": 1672816550273,
    "foundByOfficer": {
      "name": "Tawde",
      "id": "SK23C2445"
    },
    "foundAt": "Patna City",
    "foundAtpoliceStation": "Patna Police Station"
  },
  "color": "black"
}
```

## Get all car data `/lost-cars/get-all-cars`

`NOTE` : This is a **GET** request not POST.

### Success Response :

```json
Not showing the expected Data as it is obvious
```

# Get Filtered Lost car data

## `/lost-cars/filtered-cars`

Body 

```json
{
  "policeStation": "Patna Police Station",
  "time": 30 // in days
}
```

### Success Response :

```json
{
  "data": [
    {
      "model": "Flutter Kolkata",
      "lostDiaryDetails": {
        "filedPoliceStation": "Patna Police Station",
        "filedByOfficer": {
          "name": "Talpade",
          "id": "SK23C2345"
        },
        "email": "rajdeep@gmail.com",
        "filedAtTimeStamp": 1672816550273,
        "filedBy": "Debajyoti Saha"
      },
      "number": "BR31L2411",
      "carOwnerDetails": {
        "name": "Debu",
        "phone": 7004121281,
        "address": "Delhi"
      },
      "trackDetails": [
        {
          "timeStamp": 1672816498785,
          "location": "Ruby medium"
        },
        {
          "timeStamp": 1672816530647,
          "location": "Ghoria medium"
        }
      ],
      "isFound": false,
      "color": "Purple",
      "imgs": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKhwKEqKCtkoL1n6BXf5SEClFFvQqN-L75kw&usqp=CAU",
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa2%2F4b%2Fb7%2Fa24bb7b96a790cf62bfcfe839f1666ff.jpg&imgrefurl=https%3A%2F%2Fin.pinterest.com%2Fpin%2F140596819588636968%2F&tbnid=JgCDFfQ4IahxhM&vet=12ahUKEwj0qbPgrq38AhXRoukKHQ4sAHQQMygpegUIARDKAg..i&docid=V9vs-VBDBQDvYM&w=816&h=612&q=same%20car%20images&ved=2ahUKEwj0qbPgrq38AhXRoukKHQ4sAHQQMygpegUIARDKAg"
      ]
    },
    {
      "model": "Mercedes Maruti",
      "lostDiaryDetails": {
        "filedPoliceStation": "Patna Police Station",
        "filedByOfficer": {
          "name": "Chingam Tawde",
          "id": "SK23C2345"
        },
        "email": "rajdeep@gmail.com",
        "filedAtTimeStamp": 1672800000000,
        "filedBy": "Nikhil Raj"
      },
      "number": "BR31L2409",
      "carOwnerDetails": {
        "name": "Nikhil Raj",
        "phone": 7004121281,
        "address": "Kolkata, Bihar"
      },
      "trackDetails": [
        {
          "timeStamp": 1672816498785,
          "location": "Ruby less"
        },
        {
          "timeStamp": 1672816530647,
          "location": "Ghoria less"
        },
        {
          "timeStamp": 1672816550273,
          "location": "Beleghata more"
        }
      ],
      "isFound": false,
      "color": "White",
      "imgs": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKhwKEqKCtkoL1n6BXf5SEClFFvQqN-L75kw&usqp=CAU",
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa2%2F4b%2Fb7%2Fa24bb7b96a790cf62bfcfe839f1666ff.jpg&imgrefurl=https%3A%2F%2Fin.pinterest.com%2Fpin%2F140596819588636968%2F&tbnid=JgCDFfQ4IahxhM&vet=12ahUKEwj0qbPgrq38AhXRoukKHQ4sAHQQMygpegUIARDKAg..i&docid=V9vs-VBDBQDvYM&w=816&h=612&q=same%20car%20images&ved=2ahUKEwj0qbPgrq38AhXRoukKHQ4sAHQQMygpegUIARDKAg"
      ]
    }
  ],
  "count": 2
}
```

# Missing Dairy

## `/lost-car/missing-dairy`

Body 

```json
{
	"missingDairyData" : {
			 "number": "BR31L2411",
			 "carOwnerDetails": {
			  "address": "Delhi",
			  "name": "Debu",
			  "phone": 7004121281
			 },
			 "color": "Purple",
			 "imgs": [
			  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKhwKEqKCtkoL1n6BXf5SEClFFvQqN-L75kw&usqp=CAU",
			  "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa2%2F4b%2Fb7%2Fa24bb7b96a790cf62bfcfe839f1666ff.jpg&imgrefurl=https%3A%2F%2Fin.pinterest.com%2Fpin%2F140596819588636968%2F&tbnid=JgCDFfQ4IahxhM&vet=12ahUKEwj0qbPgrq38AhXRoukKHQ4sAHQQMygpegUIARDKAg..i&docid=V9vs-VBDBQDvYM&w=816&h=612&q=same%20car%20images&ved=2ahUKEwj0qbPgrq38AhXRoukKHQ4sAHQQMygpegUIARDKAg"
			 ],
			 "isFound": false,
			 "lostDiaryDetails": {
			  "email": "rajdeep@gmail.com",
			  "filedAtTimeStamp": 1672816550273,
			  "filedBy": "Debajyoti Saha",
			  "filedByOfficer": {
			   "id": "SK23C2345",
			   "name": "Talpade"
			  },
			  "filedPoliceStation": "Patna Police Station"
			 },
			 "model": "Flutter Kolkata",
			 "trackDetails": []
	}
}
```

### Success Response :

```json
{
  "statusCode": 200,
  "body": "{\"success\":\"Car is found\"}"
}
```

# Confirm Missing car

## `/lost-cars/found`

Body 

```json
{
  "number": "BR31L2409",
  "foundCarDetails": {
    "foundAt": "Patna City",
    "foundAtpoliceStation": "Patna Police Station",
    "foundAtTimeStamp": 1672816550273,
    "foundByOfficer": {
      "id": "SK23C2445",
      "name": "Tawde"
    }
  },
  "emailDetails": {
    "toEmail": "rajdeeptechbyparts019@gmail.com",
    "carNumber": "BR31L2409",
    "model": "Honda Suzuki",
    "color": "red",
    "foundPlace": "Near Ruby More",
    "foundByPolice": "Rajchandra Kante",
    "policeStation": "Ruby official Police station",
    "time": "9:03Am",
    "date": "13/07/22",
    "carOwner": "Rajdeep Sengupta",
    "ownerNumber": "8910020964",
    "ownerAddress": "61, New basudevpur Road belghoria Kolkata"
  }
}
```

### Success Response :

```json
{}
```

# Delete Missing car

## `/lost-cars/delete-car`

Body 

```json
{
  "number": "BR31L2409",
}
```

### Success Response

```json
{}
```
