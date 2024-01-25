# END POINTS

## ORDERS

### GET /orders

Get all data from orders collection with order value

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
[
  {
    "_id": "65a666b4ef33f639c273f75f",
    "status": "pending",
    "createdAt": "2024-01-16T11:21:24.667Z",
    "updatedAt": "2024-01-16T11:21:24.667Z",
    "store": {
      "_id": "65a6661db4fe8ae80cec2a19",
      "name": "Toko Plastik Morodadi"
    },
    "user": {
      "_id": "65a7a0387948c4bb3153a8b0",
      "name": "Cristiano Ronaldo"
    },
    "productOrder": [
      {
        "productId": "65a7ee0845ca2a04fba0a032",
        "qtySold": 9,
        "price": 32000,
        "name": "Citra",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "billPerItem": 288000
      }
    ],
    "totalBill": 288000
  },
  {
    "_id": "65ab5e24d0ccb45b1e2f3f85",
    "status": "confirmed",
    "createdAt": "2024-01-16T11:21:24.667Z",
    "updatedAt": "2024-01-16T11:21:24.667Z",
    "store": {
      "_id": "65a6661db4fe8ae80cec2a19",
      "name": "Toko Plastik Morodadi"
    },
    "user": {
      "_id": "65a7a0387948c4bb3153a8b0",
      "name": "Cristiano Ronaldo"
    },
    "productOrder": [
      {
        "productId": "65a7ee0845ca2a04fba0a033",
        "qtySold": 9,
        "price": 32000,
        "name": "Citra",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "billPerItem": 288000
      },
      {
        "productId": "65a7ee0845ca2a04fba0a032",
        "qtySold": 9,
        "price": 41000,
        "name": "Clear",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/9ae857a0c457f83d68373a7eba720928f89d7905-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "billPerItem": 369000
      }
    ],
    "totalBill": 657000
  },
  {
    "_id": "65ab5e8ed0ccb45b1e2f3f86",
    "status": "confirmed",
    "createdAt": "2024-01-16T11:21:24.667Z",
    "updatedAt": "2024-01-16T11:21:24.667Z",
    "store": {
      "_id": "65aa29a837de349042882c2f",
      "name": "Toko Sehat"
    },
    "user": {
      "_id": "65a7a0387948c4bb3153a8b0",
      "name": "Cristiano Ronaldo"
    },
    "productOrder": [
      {
        "productId": "65a7ee0845ca2a04fba0a035",
        "qtySold": 9,
        "price": 32000,
        "name": "Citra",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "billPerItem": 288000
      },
      {
        "productId": "65a7ee0845ca2a04fba0a032",
        "qtySold": 9,
        "price": 23000,
        "name": "Sunsilk",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/6a452ea6283ed10c84efe822b24271d5f4f801df-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "billPerItem": 207000
      }
    ],
    "totalBill": 495000
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

#### Response (403- Forbidden)

```json
{
  "message": "Forbidden Access. Admin only"
}
```

### GET /orders/user

Get all data from one User orders collection with order value

#### Request Header

```json
{
  "Authorization": "Token"
}
```

#### Request Body

None

#### Response (200)

```json
{
  "count": 3,
  "confirmedValue": 1152000,
  "data": [
    {
      "_id": "65a666b4ef33f639c273f75f",
      "status": "pending",
      "createdAt": "2024-01-16T11:21:24.667Z",
      "updatedAt": "2024-01-21T09:36:41.122Z",
      "store": {
        "_id": "65ab44db5e90712f7a16438a",
        "name": "Toko Kue Bikang Peneleh"
      },
      "user": {
        "_id": "65a7a0387948c4bb3153a8b0",
        "name": "Cristiano Ronaldo"
      },
      "productOrder": [
        {
          "productId": "65a7ee0845ca2a04fba0a035",
          "qtySold": 2,
          "finalPrice": 23000,
          "name": "Sunsilk",
          "image": "https://cdn.sanity.io/images/92ui5egz/production/6a452ea6283ed10c84efe822b24271d5f4f801df-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
          "category": "Beauty & Wellbeing",
          "price": 23000,
          "billPerItem": 46000,
          "discPerItem": 0
        },
        {
          "productId": "65a7ee0845ca2a04fba0a036",
          "qtySold": 9,
          "finalPrice": 13000,
          "name": "Pepsodent",
          "image": "https://cdn.sanity.io/images/92ui5egz/production/65b22ce8975ef008d451ed65fadb333bf65c29bf-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
          "category": "Beauty & Wellbeing",
          "price": 13000,
          "billPerItem": 117000,
          "discPerItem": 0
        }
      ],
      "totalBill": 163000,
      "discountValue": 0
    },
    {
      "_id": "65ab5e24d0ccb45b1e2f3f85",
      "status": "confirmed",
      "createdAt": "2024-01-16T11:21:24.667Z",
      "updatedAt": "2024-01-16T11:21:24.667Z",
      "store": {
        "_id": "65a6661db4fe8ae80cec2a19",
        "name": "Toko Plastik Morodadi"
      },
      "user": {
        "_id": "65a7a0387948c4bb3153a8b0",
        "name": "Cristiano Ronaldo"
      },
      "productOrder": [
        {
          "productId": "65a7ee0845ca2a04fba0a033",
          "qtySold": 9,
          "finalPrice": 41000,
          "name": "Citra",
          "image": "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
          "category": "Beauty & Wellbeing",
          "price": 32000,
          "billPerItem": 369000,
          "discPerItem": -81000
        },
        {
          "productId": "65a7ee0845ca2a04fba0a032",
          "qtySold": 9,
          "finalPrice": 32000,
          "name": "Clear",
          "image": "https://cdn.sanity.io/images/92ui5egz/production/9ae857a0c457f83d68373a7eba720928f89d7905-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
          "category": "Beauty & Wellbeing",
          "price": 41000,
          "billPerItem": 288000,
          "discPerItem": 81000
        }
      ],
      "totalBill": 657000,
      "discountValue": 0
    },
    {
      "_id": "65ab5e8ed0ccb45b1e2f3f86",
      "status": "confirmed",
      "createdAt": "2024-01-16T11:21:24.667Z",
      "updatedAt": "2024-01-16T11:21:24.667Z",
      "store": {
        "_id": "65aa29a837de349042882c2f",
        "name": "Toko Sehat"
      },
      "user": {
        "_id": "65a7a0387948c4bb3153a8b0",
        "name": "Cristiano Ronaldo"
      },
      "productOrder": [
        {
          "productId": "65a7ee0845ca2a04fba0a035",
          "qtySold": 9,
          "finalPrice": 23000,
          "name": "Citra",
          "image": "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
          "category": "Beauty & Wellbeing",
          "price": 32000,
          "billPerItem": 207000,
          "discPerItem": 81000
        },
        {
          "productId": "65a7ee0845ca2a04fba0a032",
          "qtySold": 9,
          "finalPrice": 32000,
          "name": "Sunsilk",
          "image": "https://cdn.sanity.io/images/92ui5egz/production/6a452ea6283ed10c84efe822b24271d5f4f801df-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
          "category": "Beauty & Wellbeing",
          "price": 23000,
          "billPerItem": 288000,
          "discPerItem": -81000
        }
      ],
      "totalBill": 495000,
      "discountValue": 0
    }
  ]
}
```

#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

### GET /orders/dashboard

Get all data from this month orders collection with order value

#### Request Header

```json
{
  "Authorization": "Token"
}
```

#### Request Body

None

#### Response (200)

```json
{
  "_id": {
    "year": 2024,
    "month": 1
  },
  "count": 3,
  "totalConfirmedValue": 1378000
}
```

#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

### GET /orders/monthly/user

Get all data from one User orders collection with order value grouped by month

#### Request Header

```json
{
  "Authorization": "Token"
}
```

#### Request Body

None

#### Response (200)

```json
{
  "2024": {
    "1": {
      "count": 2,
      "totalConfirmedValue": 1152000
    },
    "2": {
      "count": 1,
      "totalConfirmedValue": 163000
    },
    "3": {
      "count": 1,
      "totalConfirmedValue": 46000
    },
    "4": {
      "count": 1,
      "totalConfirmedValue": 46000
    },
    "5": {
      "count": 1,
      "totalConfirmedValue": 163000
    },
    "6": {
      "count": 1,
      "totalConfirmedValue": 163000
    },
    "7": {
      "count": 1,
      "totalConfirmedValue": 163000
    },
    "8": {
      "count": 1,
      "totalConfirmedValue": 163000
    },
    "9": {
      "count": 1,
      "totalConfirmedValue": 163000
    },
    "10": {
      "count": 1,
      "totalConfirmedValue": 163000
    },
    "11": {
      "count": 1,
      "totalConfirmedValue": 46000
    },
    "12": {
      "count": 0,
      "totalConfirmedValue": 0
    }
  }
}
```

#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

### GET /orders/:id

Get detailed data from orders collection with order value

#### Request Header

```json
{
  "Authorization": "Admin Token || Author Token"
}
```

#### Request Body

None

#### Response (200)

```json
{
  "_id": "65ab5e24d0ccb45b1e2f3f85",
  "status": "confirmed",
  "createdAt": "2024-01-16T11:21:24.667Z",
  "updatedAt": "2024-01-16T11:21:24.667Z",
  "store": {
    "_id": "65a6661db4fe8ae80cec2a19",
    "name": "Toko Plastik Morodadi"
  },
  "user": {
    "_id": "65a7a0387948c4bb3153a8b0",
    "name": "Cristiano Ronaldo"
  },
  "productOrder": [
    {
      "productId": "65a7ee0845ca2a04fba0a033",
      "qtySold": 9,
      "price": 32000,
      "name": "Citra",
      "image": "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
      "category": "Beauty & Wellbeing",
      "billPerItem": 288000
    },
    {
      "productId": "65a7ee0845ca2a04fba0a032",
      "qtySold": 9,
      "price": 41000,
      "name": "Clear",
      "image": "https://cdn.sanity.io/images/92ui5egz/production/9ae857a0c457f83d68373a7eba720928f89d7905-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
      "category": "Beauty & Wellbeing",
      "billPerItem": 369000
    }
  ],
  "totalBill": 657000
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
  "message": "Forbidden Access. Admin && related Sales only"
}
```

#### Response (404- Not Found)

```json
{
  "message": "No order found with this ID"
}
```

### POST /orders

Create Orders

#### Request Header

```json
{
  "Authorization": "Admin Token || Author Token"
}
```

#### Request Body

//field ID harus string atau benar- benar ObjectId(`65a6661db4fe8ae80cec2a19`), jangan string "ObjectId(`65a6661db4fe8ae80cec2a19`)"

```json
{
  "storeId": "65a6661db4fe8ae80cec2a19",
  "productOrder": [
    {
      "productId": "65a7ee0845ca2a04fba0a035",
      "qtySold": 7,
      "price": 23000
    },
    {
      "productId": "65a7ee0845ca2a04fba0a036",
      "qtySold": 5,
      "price": 13000
    }
  ]
}
```

#### Response (201)

```json
{
  "message": "Create Orders With ID 65acccf2d069db871ebdfbda Successful"
}
```

#### Response (400- Bad Request - !storeId)

```json
{
  "message": "Store id is required"
}
```

#### Response (400- Bad Request - !productOrder)

```json
{
  "message": "Product order is required"
}
```

#### Response (400- Bad Request - productOrder is not Array)

```json
{
  "message": "Product order must be an Array"
}
```

#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

#### Response (404- Not Found - unregistered Store)

```json
{
  "message": "No store found with this ID"
}
```

### PUT /orders/:id

Update Orders, For Admin && Author Only, Can't update confirmed orders

#### Request Header

```json
{
  "Authorization": "Admin Token || Author Token"
}
```

#### Request Body

//field ID harus string atau benar- benar ObjectId(`65a6661db4fe8ae80cec2a19`), jangan string "ObjectId(`65a6661db4fe8ae80cec2a19`)"
//kalau untuk di Mobile bisa dimatikan saja update statusnya.. Biar hanya WEB (admin) yg update status..

```json
{
  "status": "confirmed", <optional>
  "productOrder": [
    {
      "productId": "65a7ee0845ca2a04fba0a035",
      "qtySold": 2,
      "price": 23000
    },
    {
      "productId": "65a7ee0845ca2a04fba0a036",
      "qtySold": 9,
      "price": 13000
    }
  ]
}
```

#### Response (200)

```json
{
  "message": "Update Orders With ID 65a666b4ef33f639c273f75f Successful"
}
```

#### Response (400- Bad Request - !productOrder)

```json
{
  "message": "Product order is required"
}
```

#### Response (400- Bad Request - productOrder is not Array)

```json
{
  "message": "Product order must be an Array"
}
```

#### Response (400- Bad Request - order already confirmed)

```json
{
  "message": "Unable to update confirmed Order"
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
  "message": "Forbidden Access. Admin && related Sales only"
}
```

#### Response (404- Not Found - unregistered Order)

```json
{
  "message": "No order found with this ID"
}
```

### DELETE /orders/:id

Delete Orders, For Admin Only, Can't delete confirmed orders

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
  "message": "Delete Orders With ID 65acec2d7dd9323adb420411 Successful"
}
```

#### Response (400- Bad Request - order already confirmed)

```json
{
  "message": "Unable to delete confirmed Order"
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

#### Response (404- Not Found - unregistered Order)

```json
{
  "message": "No order found with this ID"
}
```

## GLOBAL ERROR

### Response (500 - Internal Server Error)

```json
{ "message": "Internal Server Error" }
```
