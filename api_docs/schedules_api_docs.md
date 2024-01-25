# END POINTS

## SCHEDULES

### GET /schedules

Get all data from schedules collection

#### Request Header

```json
{
  "Authorization": "Bearer <token admin>"
}
```

#### Request Body

None

#### Response (200)

```json
[
  {
        "_id": "65acd0d5bb7220c13cb8bced",
        "time": "2024-01-29T11:21:24.667Z",
        "isCompleted": false,
        "createdAt": "2024-01-21T08:07:49.164Z",
        "updatedAt": "2024-01-21T08:07:49.164Z",
        "storeInformations": {
            "_id": "65ab448f5e90712f7a164389",
            "name": "Toko Pasar Kue Subuh Senen",
            "location": {
                "type": "Point",
                "coordinates": [
                    106.84318895631226,
                    -6.1763379896884425
                ]
            },
            "photo": "https://res.cloudinary.com/do3tjux3f/image/upload/v1705723023/FP-Stores/Toko%20Pasar%20Kue%20Subuh%20Senen.jpg.jpg",
            "address": "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
            "joinDate": "2024-01-20T03:57:00.025Z",
            "ownerName": "Arif Setiawan",
            "mobilePhone": "+6281938002093",
            "status": "verified",
            "createdAt": "2024-01-20T03:57:03.075Z",
            "updatedAt": "2024-01-20T03:57:03.075Z"
        },
        "userInformations": {
            "_id": "65a7a0387948c4bb3153a8b0",
            "name": "Cristiano Ronaldo",
            "photo": "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
            "joinDate": "2024-01-17T09:39:04.304Z",
            "email": "ronaldo@gmail.com",
            "mobilePhone": "081927380033",
            "address": "Portugal",
            "role": "sales",
            "createdAt": "2024-01-17T09:39:04.304Z",
            "updatedAt": "2024-01-17T09:39:04.304Z"
        }
    },
    {
        "_id": "65acd1be8b47b3387e02b391",
        "time": "2024-01-29T11:21:24.667Z",
        "isCompleted": false,
        "createdAt": "2024-01-21T08:11:42.039Z",
        "updatedAt": "2024-01-21T10:43:30.774Z",
        "storeInformations": {
            "_id": "65ab45725e90712f7a16438e",
            "name": "Toko Kue Royal",
            "location": {
                "type": "Point",
                "coordinates": [
                    106.84226628050624,
                    -6.176041635309103
                ]
            },
            "photo": "https://res.cloudinary.com/do3tjux3f/image/upload/v1705723250/FP-Stores/Toko%20Kue%20Royal.jpg.jpg",
            "address": "Pasar senen, Jl. Senen raya , proyek senen blok 3 Lt. Semi basement CKS 48-49, RW.3, Senen, Kec. Senen, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10410",
            "joinDate": "2024-01-20T04:00:47.476Z",
            "ownerName": "Pak yahya",
            "mobilePhone": "+6281280313378",
            "status": "verified",
            "createdAt": "2024-01-20T04:00:50.123Z",
            "updatedAt": "2024-01-20T04:00:50.123Z"
        },
        "userInformations": {
            "_id": "65a7b2713901c57dc7d6e148",
            "name": "Lionel Messi",
            "photo": "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
            "joinDate": "2024-01-17T10:56:49.197Z",
            "email": "messi@gmail.com",
            "mobilePhone": "081927380033",
            "address": "Argentina",
            "role": "sales",
            "createdAt": "2024-01-17T10:56:49.197Z",
            "updatedAt": "2024-01-17T10:56:49.197Z"
        }
    },
    {
        "_id": "65acd1e78b47b3387e02b392",
        "time": "2024-01-30T11:21:24.667Z",
        "isCompleted": false,
        "createdAt": "2024-01-21T08:12:23.815Z",
        "updatedAt": "2024-01-21T08:12:23.815Z",
        "storeInformations": {
            "_id": "65aba1c8d9ef109cc4e04015",
            "name": "Toko Ud Mudimah",
            "location": {
                "type": "Point",
                "coordinates": [
                    106.84042079992362,
                    -6.207840299179592
                ]
            },
            "photo": "https://res.cloudinary.com/do3tjux3f/image/upload/v1705723426/FP-Stores/Toko%20Ud%20Mudimah.jpg.jpg",
            "address": "Pasar Rumput, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12970",
            "joinDate": "2024-01-20T10:34:45.105Z",
            "ownerName": "Bu Haji Mudimah",
            "mobilePhone": "+6281234567881",
            "status": "verified",
            "createdAt": "2024-01-20T10:34:48.366Z",
            "updatedAt": "2024-01-20T10:34:48.366Z"
        },
        "userInformations": {
            "_id": "65a7b2713901c57dc7d6e148",
            "name": "Lionel Messi",
            "photo": "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
            "joinDate": "2024-01-17T10:56:49.197Z",
            "email": "messi@gmail.com",
            "mobilePhone": "081927380033",
            "address": "Argentina",
            "role": "sales",
            "createdAt": "2024-01-17T10:56:49.197Z",
            "updatedAt": "2024-01-17T10:56:49.197Z"
        }
    },
  ...,
]
```

#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```


### GET /schedules/myschedule

Get all data from schedules collection from user login

#### Request Header

```json
{
  "Authorization": "Bearer <token user/admin>"
}
```

#### Request Body

None

#### Response (200)

```json
[
    {
        "_id": "65acd1be8b47b3387e02b391",
        "time": "2024-01-29T11:21:24.667Z",
        "isCompleted": false,
        "createdAt": "2024-01-21T08:11:42.039Z",
        "updatedAt": "2024-01-21T10:43:30.774Z",
        "storeInformations": {
            "_id": "65ab45725e90712f7a16438e",
            "name": "Toko Kue Royal",
            "location": {
                "type": "Point",
                "coordinates": [
                    106.84226628050624,
                    -6.176041635309103
                ]
            },
            "photo": "https://res.cloudinary.com/do3tjux3f/image/upload/v1705723250/FP-Stores/Toko%20Kue%20Royal.jpg.jpg",
            "address": "Pasar senen, Jl. Senen raya , proyek senen blok 3 Lt. Semi basement CKS 48-49, RW.3, Senen, Kec. Senen, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10410",
            "joinDate": "2024-01-20T04:00:47.476Z",
            "ownerName": "Pak yahya",
            "mobilePhone": "+6281280313378",
            "status": "verified",
            "createdAt": "2024-01-20T04:00:50.123Z",
            "updatedAt": "2024-01-20T04:00:50.123Z"
        },
        "userInformations": {
            "_id": "65a7b2713901c57dc7d6e148",
            "name": "Lionel Messi",
            "photo": "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
            "joinDate": "2024-01-17T10:56:49.197Z",
            "email": "messi@gmail.com",
            "mobilePhone": "081927380033",
            "address": "Argentina",
            "role": "sales",
            "createdAt": "2024-01-17T10:56:49.197Z",
            "updatedAt": "2024-01-17T10:56:49.197Z"
        }
    },
    {
        "_id": "65acd1e78b47b3387e02b392",
        "time": "2024-01-30T11:21:24.667Z",
        "isCompleted": false,
        "createdAt": "2024-01-21T08:12:23.815Z",
        "updatedAt": "2024-01-21T08:12:23.815Z",
        "storeInformations": {
            "_id": "65aba1c8d9ef109cc4e04015",
            "name": "Toko Ud Mudimah",
            "location": {
                "type": "Point",
                "coordinates": [
                    106.84042079992362,
                    -6.207840299179592
                ]
            },
            "photo": "https://res.cloudinary.com/do3tjux3f/image/upload/v1705723426/FP-Stores/Toko%20Ud%20Mudimah.jpg.jpg",
            "address": "Pasar Rumput, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12970",
            "joinDate": "2024-01-20T10:34:45.105Z",
            "ownerName": "Bu Haji Mudimah",
            "mobilePhone": "+6281234567881",
            "status": "verified",
            "createdAt": "2024-01-20T10:34:48.366Z",
            "updatedAt": "2024-01-20T10:34:48.366Z"
        },
        "userInformations": {
            "_id": "65a7b2713901c57dc7d6e148",
            "name": "Lionel Messi",
            "photo": "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
            "joinDate": "2024-01-17T10:56:49.197Z",
            "email": "messi@gmail.com",
            "mobilePhone": "081927380033",
            "address": "Argentina",
            "role": "sales",
            "createdAt": "2024-01-17T10:56:49.197Z",
            "updatedAt": "2024-01-17T10:56:49.197Z"
        }
    }
]
```
#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```


### GET /schedules/:scheduleId

Get detailed data from a schedules

#### Request Header

```json
{
  "Authorization": "Bearer <token user/admin>"
}
```

#### Request Params
```json
scheduleId: req.params
```

#### Request Body

None

#### Response (200)

```json
{
    "_id": "65acd0d5bb7220c13cb8bced",
    "time": "2024-01-29T11:21:24.667Z",
    "isCompleted": false,
    "createdAt": "2024-01-21T08:07:49.164Z",
    "updatedAt": "2024-01-21T08:07:49.164Z",
    "storeInformations": {
        "_id": "65ab448f5e90712f7a164389",
        "name": "Toko Pasar Kue Subuh Senen",
        "location": {
            "type": "Point",
            "coordinates": [
                106.84318895631226,
                -6.1763379896884425
            ]
        },
        "photo": "https://res.cloudinary.com/do3tjux3f/image/upload/v1705723023/FP-Stores/Toko%20Pasar%20Kue%20Subuh%20Senen.jpg.jpg",
        "address": "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
        "joinDate": "2024-01-20T03:57:00.025Z",
        "ownerName": "Arif Setiawan",
        "mobilePhone": "+6281938002093",
        "status": "verified",
        "createdAt": "2024-01-20T03:57:03.075Z",
        "updatedAt": "2024-01-20T03:57:03.075Z"
    },
    "userInformations": {
        "_id": "65a7a0387948c4bb3153a8b0",
        "name": "Cristiano Ronaldo",
        "photo": "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
        "joinDate": "2024-01-17T09:39:04.304Z",
        "email": "ronaldo@gmail.com",
        "mobilePhone": "081927380033",
        "address": "Portugal",
        "role": "sales",
        "createdAt": "2024-01-17T09:39:04.304Z",
        "updatedAt": "2024-01-17T09:39:04.304Z"
    }
}
```

#### Response (400- Bad Request)

```json
{
  "message": "input must be a 24 character hex string, 12 byte Uint8Array, or an integer"
}
```

#### Response (404- Not Found)

```json
{
  "message": "No schedule found with this ID"
}
```

#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

### DELETE /schedules/:scheduleId

DELETE data from a schedules

#### Request Header

```json
{
  "Authorization": "Bearer <token admin>"
}
```

#### Request Params
```json
scheduleId: req.params
```


#### Request Body

None

#### Response (200)

```json
{
  "message": "Schedule with ID 65acd0d5bb7220c13cb8bced has been deleted"
}
```

#### Response (404- Not Found)

```json
{
  "message": "No schedule found with this ID"
}
```

#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

#### Response (403- Forbidden)

```json
{
  "message": "Forbidden Access. Admin only"
}
```

### POST /schedules

Create new schedules

#### Request Header

```json
{
  "Authorization": "Bearer <token admin>"
}
```

#### Request Body

```json
{
    "storeId": "65a660db743349cd8f43eda7",
    "userId": "65a65bd99c151b606d6286a6",
    "time": "2024-01-23"
}

```

#### Response (200)

```json
{
  "storeId": "65a660db743349cd8f43eda7",
    "userId": "65a65bd99c151b606d6286a6",
    "time": "2024-01-29T11:21:24.667Z",
    "isCompleted": false,
    "createdAt": "2024-01-21T08:07:49.164Z",
    "updatedAt": "2024-01-21T08:07:49.164Z",
}
```

#### Response (400- Bad Request - !Store)

```json
{
  "message": "Store ID is required"
}
```

#### Response (400- Bad Request - !userId)

```json
{
  "message": "User/Sales ID is required"
}
```

#### Response (400- Bad Request - !time)

```json
{
  "message": "Schedule time is required"
}
```

#### Response (400- Bad Request - !isStoreVerified)

```json
{
  "message": "Store with that ID has not been verified"
}
```

#### Response (400- Bad Request - existingSchedule)

```json
{
  "message": "Schedule already exists"
}
```

#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

#### Response (403- Forbidden)

```json
{
  "message": "Forbidden Access. Admin only"
}
```

#### Response (404- No store found)

```json
{
  "message": "No store found with this ID"
}
```

#### Response (404- No user found)

```json
{
  "message": "No user found with this ID"
}
```

### PUT /schedules/:scheduleId

Edit schedules

#### Request Header

```json
{
  "Authorization": "Bearer <token admin>"
}
```

#### Request Params
```json
scheduleId: req.params
```

#### Request Body

```json
{
    "storeId": "65a660db743349cd8f43eda7",
    "userId": "65a65bd99c151b606d6286a6",
    "time": "2024-01-29T11:21:24.667Z",
    "isCompleted": true,
    "updatedAt": "2024-01-21T08:07:49.164Z",
}
```

#### Response (200)

```json
{
   "storeId": "65a660db743349cd8f43eda7",
    "userId": "65a65bd99c151b606d6286a6",
    "time": "2024-01-29T11:21:24.667Z",
    "isCompleted": true,
    "updatedAt": "2024-01-21T08:07:49.164Z",
}
```

#### Response (400- Bad Request - !Store)

```json
{
  "message": "Store ID is required"
}
```

#### Response (400- Bad Request - !userId)

```json
{
  "message": "User/Sales ID is required"
}
```

#### Response (400- Bad Request - !time)

```json
{
  "message": "Schedule time is required"
}
```

#### Response (400- Bad Request - !isCompleted)

```json
{
  "message": "isCompleted is required"
}
```

#### Response (400- Bad Request - isCompleted must be boolean)

```json
{
  "message": "isCompleted must be boolean (true/false)"
}
```

#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

#### Response (403- Forbidden)

```json
{
  "message": "Forbidden Access. Admin only"
}
```

#### Response (404- No schedule found)

```json
{
  "message": "No schedule found with this ID"
}
```

### PUT /schedules/status/:scheduleId

Edit status schedules

#### Request Header

```json
{
  "Authorization": "Bearer <token user/admin>"
}
```

#### Request Params
```json
scheduleId: req.params
```

#### Request Body

```json
{
    "latitude": -6.188789464341358,
    "longitude": 106.82608477252883,
}
```

#### Response (200)

```json
{
   "message": "Status from schedule with ID 65acd0d5bb7220c13cb8bced has been updated"
}
```

#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

#### Response (404- No schedule found)

```json
{
  "message": "No schedule found with this ID"
}
```

#### Response (404- No store found)

```json
{
  "message": "No store found with this ID"
}
```

## GLOBAL ERROR

### Response (500 - Internal Server Error)

```json
{ "message": "Internal Server Error" }
```
