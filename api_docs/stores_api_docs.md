# END POINTS

## STORE

### GET /stores

Get all data from stores collection and total confirmed order value

#### Request Header

None

#### Request Body

None

#### Response (200)

```json
[
  {
    "_id": "65a6661db4fe8ae80cec2a19",
    "name": "Toko Plastik Morodadi",
    "photo": "https://lh3.googleusercontent.com/p/AF1QipOE83L2OliXcZV7nczQvFhooFJc7qxtLGb7kYCT=s1360-w1360-h1020",
    "joinDate": "2024-01-16T11:18:53.205Z",
    "confirmedOrderValue": 3510000
  },
  {
    "_id": "65aa29a837de349042882c2f",
    "name": "Toko Sehat",
    "photo": "https://res.cloudinary.com/do3tjux3f/image/upload/v1705650397/FP-Stores/Toko%20Sehat.jpg.jpg",
    "joinDate": "2024-01-16T11:18:53.205Z",
    "confirmedOrderValue": 3510000
  },
  {
    "_id": "65ab448f5e90712f7a164389",
    "name": "Toko Pasar Kue Subuh Senen",
    "photo": "https://res.cloudinary.com/do3tjux3f/image/upload/v1705723023/FP-Stores/Toko%20Pasar%20Kue%20Subuh%20Senen.jpg.jpg",
    "joinDate": "2024-01-20T03:57:00.025Z",
    "confirmedOrderValue": 0
  },
  ...,
]
```

### GET /stores/simple

Get all simplified data from stores collection

#### Request Header

None

#### Request Body

None

#### Response (200)

```json
[
  {
    "_id": "65ab45b85e90712f7a164390",
    "name": "Toko Haji Abdullah",
    "location": {
      "type": "Point",
      "coordinates": [
        106.87160371358618,
        -6.185072644706806
      ]
    },
    "address": "Pasar Rawasari, Jl. Rawasari Barat No.1, RT.2/RW.1, Kampung Rawa, Kec. Cemp. Putih, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10510"
  },
  {
    "_id": "65ab45db5e90712f7a164391",
    "name": "Toko Khomaini",
    "location": {
      "type": "Point",
      "coordinates": [
        106.79593648070963,
        -6.190223033710549
      ]
    },
    "address": "Pasar Slipi. Jl. Anggrek Garuda D/I, RT.4/RW.2, Kemanggisan, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11480"
  },
...,
]
```

### GET /stores/mobile

Get all simplified data from stores collection with ability to search name ?search=<string>

#### Request Header

None

#### Request Query

```json
{ "search": <storeName> }
```

#### Response (200)

```json
[
  {
    "_id": "65ab45b85e90712f7a164390",
    "name": "Toko Haji Abdullah",
    "photo": "https://res.cloudinary.com/do3tjux3f/image/upload/v1705723320/FP-Stores/Toko%20Haji%20Abdullah.jpg.jpg",
    "address": "Pasar Rawasari, Jl. Rawasari Barat No.1, RT.2/RW.1, Kampung Rawa, Kec. Cemp. Putih, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10510",
    "ownerName": "Pak Abdullah",
    "mobilePhone": "+6281234567815",
    "status": "verified"
  },
  {
    "_id": "65ab45db5e90712f7a164391",
    "name": "Toko Khomaini",
    "photo": "https://res.cloudinary.com/do3tjux3f/image/upload/v1705723355/FP-Stores/Toko%20Khomaini.jpg.jpg",
    "address": "Pasar Slipi. Jl. Anggrek Garuda D/I, RT.4/RW.2, Kemanggisan, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11480",
    "ownerName": "Khomaini Atun",
    "mobilePhone": "+6281233220988",
    "status": "verified"
  },
...,
]
```

#### Response (200 - unmatch name search with any store in DV)

```json
[]
```

### GET /stores/count

Get total number of stores from DB

#### Request Header

None

#### Request Body

None

#### Response (200)

```json
{
  "count": 12
}
```

### GET /stores/:id

Get detailed data from a stores

#### Request Header

None

#### Request Body

None

#### Response (200)

```json
{
  "_id": "65a6661db4fe8ae80cec2a19",
  "name": "Toko Plastik Morodadi",
  "location": {
    "type": "Point",
    "coordinates": [112.63070356923028, -7.986860420618447]
  },
  "photo": "https://lh3.googleusercontent.com/p/AF1QipOE83L2OliXcZV7nczQvFhooFJc7qxtLGb7kYCT=s1360-w1360-h1020",
  "joinDate": "2024-01-16T11:18:53.205Z",
  "address": "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
  "ownerName": "Bambang",
  "mobilePhone": "082222222222",
  "status": "confirmed",
  "createdAt": "2024-01-16T11:18:53.205Z",
  "updatedAt": "2024-01-16T11:18:53.205Z"
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
  "message": "No store found with this ID"
}
```

### DELETE /stores/:id

DELETE data from a stores

#### Request Header

```json
{
  "Authorization": "Admin Token"
}
```

#### Request Body

None

#### Response (200)

```json
{
  "message": "Delete Store With ID 65aba1c8d9ef109cc4e04015 Successfull"
}
```

#### Response (404- Not Found)

```json
{
  "message": "No store found with this ID"
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

### POST /stores

Create new stores

#### Request Header

None

#### Request Body

```json
{
  "name": "Toko Sehat", <unique>
  "longitude":112.63070356923028,
  "latitude": -7.986860420618447,
  "address": "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
  "joinDate": "2024-01-16T11:18:53.205+00:00", <default new Date()>
  "ownerName": "Sehat",
  "mobilePhone": "083333333333",
  "status ": "verified" <default 'unverified'>
}
```

#### Request File

```json
{
  "photo": <upload>
}
```

#### Response (200)

```json
{
  "message": "Create Store With ID 65aa3386b11c806f2a3e0900 Successfull"
}
```

#### Response (400- Bad Request - !Name)

```json
{
  "message": "Store name is required"
}
```

#### Response (400- Bad Request - non unique Name)

```json
{
  "message": "Store name is already registered"
}
```

#### Response (400- Bad Request - !longitude || !latitude)

```json
{
  "message": "Store longitude & latitude is required"
}
```

#### Response (400- Bad Request - !address)

```json
{
  "message": "Store address is required"
}
```

#### Response (400- Bad Request - !ownerName)

```json
{
  "message": "Store owner's name is required"
}
```

#### Response (400- Bad Request - !mobilePhone)

```json
{
  "message": "Store mobile phone is required"
}
```

### PUT /stores/:id

Edit stores

#### Request Header

```json
{
  "Authorization": "Admin Token"
}
```

#### Request Body

```json
{
  "name": "Toko Sehat", <unique>
  "longitude":112.63070356923028,
  "latitude": -7.986860420618447,
  "address": "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
  "ownerName": "Sehat",
  "mobilePhone": "083333333333",
  "status ": "verified"
}
```

#### Response (200)

```json
{
  "message": "Update Store With ID 65aa3386b11c806f2a3e0900 Successfull"
}
```

#### Response (400- Bad Request - !Name)

```json
{
  "message": "Store name is required"
}
```

#### Response (400- Bad Request - non unique Name)

```json
{
  "message": "Store name is already registered"
}
```

#### Response (400- Bad Request - !longitude || !latitude)

```json
{
  "message": "Store longitude & latitude is required"
}
```

#### Response (400- Bad Request - !address)

```json
{
  "message": "Store address is required"
}
```

#### Response (400- Bad Request - !ownerName)

```json
{
  "message": "Store owner's name is required"
}
```

#### Response (400- Bad Request - !mobilePhone)

```json
{
  "message": "Store mobile phone is required"
}
```

#### Response (404- Not Found)

```json
{
  "message": "No store found with this ID"
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

### PATCH /stores/:id

Edit stores photo

#### Request Header

```json
{
  "Authorization": "Admin Token"
}
```

#### Request File

```json
{
  "photo": <upload>
}
```

#### Response (200)

```json
{
  "message": "Update Store Photo With ID 65aba1c8d9ef109cc4e04015 Successfull"
}
```

#### Response (400- Bad Request - !photo)

```json
{
  "message": "Photo is required"
}
```

#### Response (404- Not Found)

```json
{
  "message": "No store found with this ID"
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

## GLOBAL ERROR

### Response (500 - Internal Server Error)

```json
{ "message": "Internal Server Error" }
```
