# Backend API Documentation

## /users/register Endpoint

**Description**  
Formally creates a new user account using the submitted information.

**HTTP Method**  
POST

**Request Body**  
JSON format with:
- `fullname` (object):  
    - `firstname` (string, required): At least 3 characters.  
    - `lastname` (string, optional): At least 3 characters.
- `email` (string, required): Valid email address.
- `password` (string, required): At least 6 characters.

**Example Response**
```json
{
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "token": "JWT Token"
    }
}
```

## /users/login Endpoint

**Description**  
Authenticates an existing user by email and password, returning a valid JWT token.

**HTTP Method**  
POST

**Request Body**  
JSON format with:
- `email` (string, required): Valid email address.
- `password` (string, required): At least 6 characters.

**Example Response**
```json
{
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "token": "JWT Token"
    }
}
```

## /users/profile Endpoint

**Description**  
Retrieves details for the currently authenticated user.

**HTTP Method**  
GET

**Authentication**  
Requires a valid JWT in the `Authorization` header: `Bearer <token>`

**Example Response**
```json
{
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
```

## /users/logout Endpoint

**Description**  
Logs out the current user, invalidating the associated token.

**HTTP Method**  
GET

**Authentication**  
Requires a valid JWT in the header or cookie.

**Example Response**
```json
{
    "message": "Logout successfully."
}
```

## /captains/register Endpoint

**Description**  
Formally creates a new captain account using the submitted information.

**HTTP Method**  
POST

**Request Body**  
JSON format with:
- `fullname` (object):  
    - `firstname` (string, required): At least 3 characters.  
    - `lastname` (string, optional): At least 3 characters.
- `email` (string, required): Valid email address.
- `password` (string, required): At least 6 characters.
- `vehicle` (object):
    - `color` (string, required): Minimum 3 characters.
    - `plate` (string, required): Minimum 3 characters.
    - `capacity` (number, required): At least 1.
    - `vehicleType` (string, required): Must be one of 'car', 'motorcycle', or 'auto'.

**Example Response**
```json
{
    "captain": {
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "XYZ123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "token": "JWT Token"
    }
}
```

## /captains/login Endpoint

**Description**  
Authenticates an existing captain by email and password, returning a valid JWT token.

**HTTP Method**  
POST

**Request Body**  
JSON format with:
- `email` (string, required): Valid email address.
- `password` (string, required): At least 6 characters.

**Example Response**
```json
{
    "captain": {
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "XYZ123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "token": "JWT Token"
    }
}
```

## /captains/profile Endpoint

**Description**  
Retrieves details for the currently authenticated captain.

**HTTP Method**  
GET

**Authentication**  
Requires a valid JWT in the `Authorization` header: `Bearer <token>`

**Example Response**
```json
{
    "captain": {
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "XYZ123",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

## /captains/logout Endpoint

**Description**  
Logs out the current captain, invalidating the associated token.

**HTTP Method**  
GET

**Authentication**  
Requires a valid JWT in the header or cookie.

**Example Response**
```json
{
    "message": "Logout successfully."
}
```

## /maps/get-coordinates Endpoint

**Description**  
Obtains latitude and longitude for a specified address.

**HTTP Method**  
GET

**Request Parameters**  
- `address` (string, required): The address to geocode.

**Example Request**
```
GET /maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
```

**Example Response**
```json
{
    "ltd": 37.4224764,
    "lng": -122.0842499
}
```

**Error Response**
- 400 Bad Request: Missing or invalid address parameter.
- 404 Not Found: Coordinates could not be located.
```json
{
    "message": "Coordinates not found"
}
```

## /maps/get-distance-time Endpoint

**Description**  
Retrieves travel distance and estimated duration between two locations.

**HTTP Method**  
GET

**Request Parameters**  
- `origin` (string, required): Starting address.
- `destination` (string, required): Destination address.

**Example Request**
```
GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
```

**Example Response**
```json
{
    "distance": {
        "text": "2,789 miles",
        "value": 4486540
    },
    "duration": {
        "text": "1 day 18 hours",
        "value": 154800
    }
}
```

**Error Response**
- 400 Bad Request: Missing or invalid origin/destination.
- 404 Not Found: No routes identified.
```json
{
    "message": "No routes found"
}
```

## /maps/get-suggestions Endpoint

**Description**  
Returns suggested location completions for a given input string.

**HTTP Method**  
GET

**Request Parameters**  
- `input` (string, required): The partial address query.

**Example Request**
```
GET /maps/get-suggestions?input=1600+Amphitheatre
```

**Example Response**
```json
[
    "1600 Amphitheatre Parkway, Mountain View, CA, USA",
    "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
```

**Error Response**
- 400 Bad Request: Missing or invalid input.
- 500 Internal Server Error: Failed to retrieve suggestions.
```json
{
    "message": "Unable to fetch suggestions"
}
```

## /rides/create Endpoint

**Description**  
Creates a new ride based on the provided details.

**HTTP Method**  
POST

**Authentication**  
Requires a valid JWT in the `Authorization` header: `Bearer <token>`

**Request Body**  
JSON format with:
- `pickup` (string, required): Pickup address with at least 3 characters.
- `destination` (string, required): Destination address with at least 3 characters.
- `vehicleType` (string, required): One of 'auto', 'car', or 'moto'.

**Example Response**
```json
{
    "ride": {
        "user": "User ID",
        "pickup": "Pickup address",
        "destination": "Destination address",
        "fare": 50.0,
        "status": "Ride status",
        "duration": 154800,
        "distance": 4486540,
        "otp": "OTP for the ride"
    }
}
```

**Error Response**
- 400 Bad Request: Missing or invalid fields.
- 500 Internal Server Error: Failed to create ride.
```json
{
    "message": "Error message"
}
```

## /rides/get-fare Endpoint

**Description**  
Provides a fare estimate based on pickup and destination addresses.

**HTTP Method**  
GET

**Authentication**  
Requires a valid JWT in the `Authorization` header: `Bearer <token>`

**Request Parameters**  
- `pickup` (string, required): At least 3 characters.
- `destination` (string, required): At least 3 characters.

**Example Request**
```
GET /rides/get-fare?pickup=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
```

**Example Response**
```json
{
    "auto": 50.0,
    "car": 75.0,
    "moto": 40.0
}
```

**Error Response**
- 400 Bad Request: Missing or invalid parameters.
- 500 Internal Server Error: Unable to calculate fare.
```json
{
    "message": "Error message"
}
```