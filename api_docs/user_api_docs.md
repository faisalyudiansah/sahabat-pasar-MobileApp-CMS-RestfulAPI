# API DOCS : Users (Sahabat Pasar)

## Endpoints :

List of endpoints for public :
- `POST /users/register`
- `POST /users/login`
- `GET /users/userprofile`
- `PUT /users/:idUser`

List of endpoints for admin only :
- `GET /users`
    - search by name of users : `GET /users?name=<string>`
    - search by role of users : `GET /users?role=<string admin / sales>`
    - search by role and name of users : `GET /users?role=<string admin / sales>&name=<string>`
- `DELETE /users/:idUser`
- `GET /users/finduser-email`
- `GET /users/finduser/:idUser`

&nbsp;

## POST /users/register
Description:
- Add user / register. Default value for role : 'Sales'

Request:
- Body:
```json
{
  "name": string (require),
  "email": string (require),
  "password": string (require),
  "mobilePhone": string (require),
  "address": string (require)
}
```

_Response (201 - Created)_
```json
{
  "message": "Register Successfully",
  "name": string,
  "email": string,
  "mobilePhone": string,
  "address": string,
  "role": "sales"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Missing required fields"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Mobile Phone is required"
}
OR
{
  "message": "Address is required"
}
OR
{
  "message": "Name must be at least 4 characters"
}
OR
{
  "message": "Email is invalid"
}
OR
{
  "message": "Mobile Phone is invalid"
}
OR
{
  "message": "This email has already been registered"
}
```

&nbsp;

## POST /users/login
Description:
- Login user

Request:
- Body:
```json
{
  "email": string (require),
  "password": string (require),
}
```

_Response (200 - OK)_
```json
{
  "access_token": string
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## GET /users/userprofile
Description:
- View the profile of the currently logged in user

Request:
- headers: 
```json
{
    "access_token": "Bearer <string>" 
}
```

_Response (200 - OK)_
```json
{
  "_id": "65a7d5dee935cf773008868a",
  "name": "Admin",
  "photo": "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
  "joinDate": "2024-01-17T13:27:58.398Z",
  "email": "admin@gmail.com",
  "mobilePhone": "081927380033",
  "address": "Indonesia",
  "role": "admin",
  "createdAt": "2024-01-17T13:27:58.398Z",
  "updatedAt": "2024-01-17T13:27:58.398Z"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "No user found"
}
```

&nbsp;

## PUT /users/:idUser
Description:
- Update user account

Request:
- headers: 
```json
{
  "access_token": "Bearer <string>" 
}
```

- Body : Content-Type: multipart/form-data:
```json
{
  "name" (text): string,
  "email" (text): string,
  "mobilePhone" (text): string,
  "address" (text): string,
  "photo" (file): <upload image>
}
```

_Response (200 - OK)_
```json
{
  "message": "Update Successfully",
  "_id": "65aa5cbdc83422f844718e5c",
  "name": "Akun Tumbal",
  "photo": "https://res.cloudinary.com/do3tjux3f/image/upload/v1705771861/users/Akun%20Tumbal-photo.jpg",
  "email": "tumbal@gmail.com",
  "mobilePhone": "081927380033",
  "address": "Indonesia"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Missing required fields"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Mobile Phone is required"
}
OR
{
  "message": "Address is required"
}
OR
{
  "message": "Name must be at least 4 characters"
}
OR
{
  "message": "Email is invalid"
}
OR
{
  "message": "Mobile Phone is invalid"
}
OR
{
  "message": "This email has already been registered"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "No user found with this ID"
}
```

&nbsp;

## GET /users
- search by name of users : `GET /users?name=<string>`
- search by role of users : `GET /users?role=<string admin / sales>`
- search by role and name of users : `GET /users?role=<string admin / sales>&name=<string>`

Description:
- Get a list of user accounts. Can be based on name/role or get all registered users

Request:
- headers: 
```json
{
  "access_token": "Bearer <string>" 
}
```

- query:
```json
{
    "role": "admin" / "sales"
}
OR
{
    "name": string
}
```

_Response (200 - OK)_
```json
[
  {
    "_id": "65a7818f64e52af4a8c7027b",
    "name": "Muhammad Faisal Yudiansah",
    "photo": "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
    "joinDate": "2024-01-17T07:28:15.877Z",
    "email": "faisal@gmail.com",
    "mobilePhone": "081927380033",
    "address": "Jakarta Timur",
    "role": "admin",
    "createdAt": "2024-01-17T07:28:15.877Z",
    "updatedAt": "2024-01-17T07:28:15.877Z"
  },
  {
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
  },
  ...,
]
```

_Response (400 - Bad Request)_
```json
{
  "message": "Role is invalid" 
}
```

&nbsp;

## DELETE /users/:idUser
Description:
- Delete user account

Request:
- headers: 
```json
{
  "access_token": "Bearer <string>" 
}
```

- params:
```json
{
  "idUser": ID user (required)
}
```

_Response (200 - OK)_
```json
{
  "message": "<name of account user> has been deleted"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "No user found with this ID"
}
```

&nbsp;

## GET /users/finduser-email
Description:
- Find user account with email

Request:
- headers: 
```json
{
  "access_token": "Bearer <string>" 
}
```

- Body:
```json
{
  "email": string (required)
}
```

_Response (200 - OK)_
```json
{
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
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email is required" 
}
OR
{
  "message": "Email is invalid" 
}
```

_Response (404 - Not Found)_
```json
{
  "message": "No user found with this ID"
}
```

&nbsp;

## GET /users/finduser/:idUser
Description:
- Find user account with ID account

Request:
- headers: 
```json
{
  "access_token": "Bearer <string>" 
}
```

- params:
```json
{
  "idUser": ID user (required)
}
```

_Response (200 - OK)_
```json
{
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
```

_Response (400 - Bad Request)_
```json
{
  "message": "input must be a 24 character hex string, 12 byte Uint8Array, or an integer" 
}
```

_Response (404 - Not Found)_
```json
{
  "message": "No user found with this ID"
}
```

&nbsp;

## Global Error
_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```