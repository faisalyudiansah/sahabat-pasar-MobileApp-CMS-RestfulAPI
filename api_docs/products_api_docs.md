# END POINTS

## PRODUCTS

### GET /products

Get all data from products collection

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
        "_id": "65a7ee0845ca2a04fba0a032",
        "name": "Citra",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "stock": 10000,
        "price": 32000,
        "discQty": 10,
        "discPercent": 5,
        "isAvailable": true,
        "createdAt": "2023-12-15T15:32:06.350Z",
        "updatedAt": "2024-03-18T14:47:12.101Z"
    },
    {
        "_id": "65a7ee0845ca2a04fba0a033",
        "name": "Clear",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/9ae857a0c457f83d68373a7eba720928f89d7905-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "stock": 10000,
        "price": 41000,
        "discQty": 10,
        "discPercent": 5,
        "isAvailable": true,
        "createdAt": "2023-12-15T15:32:06.350Z",
        "updatedAt": "2024-03-18T14:47:12.101Z"
    },
    {
        "_id": "65a7ee0845ca2a04fba0a034",
        "name": "Clear Men",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/558320bfc0afd97d87c2364c52172bece8ee9b46-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "stock": 10000,
        "price": 45000,
        "discQty": 10,
        "discPercent": 5,
        "isAvailable": true,
        "createdAt": "2023-12-15T15:32:06.350Z",
        "updatedAt": "2024-03-18T14:47:12.101Z"
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

### GET /products/?available=true

Get all data from products collection with query available status

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
        "_id": "65a7ee0845ca2a04fba0a032",
        "name": "Citra",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "stock": 10000,
        "price": 32000,
        "discQty": 10,
        "discPercent": 5,
        "isAvailable": true,
        "createdAt": "2023-12-15T15:32:06.350Z",
        "updatedAt": "2024-03-18T14:47:12.101Z"
    },
    {
        "_id": "65a7ee0845ca2a04fba0a033",
        "name": "Clear",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/9ae857a0c457f83d68373a7eba720928f89d7905-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "stock": 10000,
        "price": 41000,
        "discQty": 10,
        "discPercent": 5,
        "isAvailable": true,
        "createdAt": "2023-12-15T15:32:06.350Z",
        "updatedAt": "2024-03-18T14:47:12.101Z"
    },
    {
        "_id": "65a7ee0845ca2a04fba0a034",
        "name": "Clear Men",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/558320bfc0afd97d87c2364c52172bece8ee9b46-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "stock": 10000,
        "price": 45000,
        "discQty": 10,
        "discPercent": 5,
        "isAvailable": true,
        "createdAt": "2023-12-15T15:32:06.350Z",
        "updatedAt": "2024-03-18T14:47:12.101Z"
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

### GET /products/:id

Get detailed data from a products

#### Request Header

```json
{
  "Authorization": "Bearer <token user/admin>"
}
```

#### Request Params

```json
id: req.params
```

#### Request Body

None

#### Response (200)

```json
{
  "_id": "65a7ee0845ca2a04fba0a034",
  "name": "Clear Men",
  "image": "https://cdn.sanity.io/images/92ui5egz/production/558320bfc0afd97d87c2364c52172bece8ee9b46-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
  "category": "Beauty & Wellbeing",
  "stock": 10000,
  "price": 45000,
  "discQty": 10,
  "discPercent": 5,
  "isAvailable": true,
  "createdAt": "2023-12-15T15:32:06.350Z",
  "updatedAt": "2024-03-18T14:47:12.101Z"
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
  "message": "Product Not Found"
}
```

#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

### DELETE /products/:id

DELETE data from a products

#### Request Header

```json
{
  "Authorization": "Bearer <token admin>"
}
```

#### Request Params

```json
id: req.params
```

#### Request Body

None

#### Response (200)

```json
{
  "message": "Delete Product With ID 65aba1c8d9ef109cc4e04015 Successfull"
}
```

#### Response (404- Not Found)

```json
{
  "message": "Product Not Found"
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

### POST /products

Create new products

#### Request Header

```json
{
  "Authorization": "Bearer <token admin>"
}
```

#### Request Body

```json
{
  "name": "Citra",
  "category": "Beauty & Wellbeing",
  "stock": 10000,
  "price": 32000,
  "discQty": 10,
  "discPercent": 5,
  "isAvailable": true
}
```

#### Request File

```json
{
  "image": <upload>
}
```

#### Response (200)

```json
{
  "message": "Create Product With ID 65aa3386b11c806f2a3e0900 Successfull"
}
```

#### Response (400- Bad Request - !Name)

```json
{
  "message": "Name is required"
}
```

#### Response (400- Bad Request - !Category)

```json
{
  "message": "Category is required"
}
```

#### Response (400- Bad Request - !Stock)

```json
{
  "message": "Stock is required"
}
```

#### Response (400- Bad Request - !Price)

```json
{
  "message": "Price is required"
}
```

#### Response (400- Bad Request - !DiscQty)

```json
{
  "message": "DiscQty is required"
}
```

#### Response (400- Bad Request - !DiscPercent)

```json
{
  "message": "DiscPercent is required"
}
```

#### Response (400- Bad Request - !IsAvailable)

```json
{
  "message": "IsAvailable is required"
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

### PUT /products/:id

Edit products

#### Request Header

```json
{
  "Authorization": "Bearer <token admin>"
}
```

#### Request Params

```json
id: req.params
```

#### Request Body

```json
{
  "name": "Citra",
  "category": "Beauty & Wellbeing",
  "stock": 10000,
  "price": 32000,
  "discQty": 10,
  "discPercent": 5,
  "isAvailable": true
}
```

#### Request File

```json
{
  "image": <upload>
}
```

#### Response (200)

```json
{
  "message": "Update Product With ID 65aa3386b11c806f2a3e0900 Successfull"
}
```

#### Response (400- Bad Request - !Name)

```json
{
  "message": "Name is required"
}
```

#### Response (400- Bad Request - !Category)

```json
{
  "message": "Category is required"
}
```

#### Response (400- Bad Request - !Stock)

```json
{
  "message": "Stock is required"
}
```

#### Response (400- Bad Request - !Price)

```json
{
  "message": "Price is required"
}
```

#### Response (400- Bad Request - !DiscQty)

```json
{
  "message": "DiscQty is required"
}
```

#### Response (400- Bad Request - !DiscPercent)

```json
{
  "message": "DiscPercent is required"
}
```

#### Response (400- Bad Request - !IsAvailable)

```json
{
  "message": "IsAvailable is required"
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

#### Response (404- Not Found)

```json
{
  "message": "Product Not Found"
}
```

### GET /products/dashboard

Get all data from orders collection with order value

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
[
  {
    "_id": "65a7ee0845ca2a04fba0a032",
    "name": "Citra",
    "image": "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
    "category": "Beauty & Wellbeing",
    "stock": 10000,
    "price": 32000,
    "discQty": 10,
    "discPercent": 5,
    "isAvailable": true,
    "createdAt": "2023-12-15T15:32:06.350Z",
    "updatedAt": "2024-03-18T14:47:12.101Z",
    "confirmedOrderValue": 1152000,
    "confirmedOrderQty": 36
  },
  {
    "_id": "65a7ee0845ca2a04fba0a035",
    "name": "Sunsilk",
    "image": "https://cdn.sanity.io/images/92ui5egz/production/6a452ea6283ed10c84efe822b24271d5f4f801df-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
    "category": "Beauty & Wellbeing",
    "stock": 10000,
    "price": 23000,
    "discQty": 10,
    "discPercent": 5,
    "isAvailable": true,
    "createdAt": "2023-12-15T15:32:06.350Z",
    "updatedAt": "2024-03-18T14:47:12.101Z",
    "confirmedOrderValue": 721000,
    "confirmedOrderQty": 30
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

## GLOBAL ERROR

### Response (500 - Internal Server Error)

```json
{ "message": "Internal Server Error" }
```
