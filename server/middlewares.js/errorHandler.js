function errorHandler(error, req, res, next) {
    //   console.log(error);
    let statusCode = 500;
    let message = `Internal Server Error`;

    switch (error.name) {
        case "Name is required":
            statusCode = 400;
            message = error.name;
            break;
        case "Email is required":
            statusCode = 400;
            message = error.name;
            break;
        case "Password is required":
            statusCode = 400;
            message = error.name;
            break;
        case "Mobile Phone is required":
            statusCode = 400;
            message = error.name;
            break;
        case "Address is required":
            statusCode = 400;
            message = error.name;
            break;
        case 'Category is required':
            statusCode = 400
            message = error.name
            break
        case 'Stock is required':
            statusCode = 400
            message = error.name
            break
        case 'Price is required':
            statusCode = 400
            message = error.name
            break
        case 'DiscQty is required':
            statusCode = 400
            message = error.name
            break
        case 'DiscPercent is required':
            statusCode = 400
            message = error.name
            break
        case 'IsAvailable is required':
            statusCode = 400
            message = error.name
            break
        case "Name must be at least 4 characters":
            statusCode = 400;
            message = error.name;
            break;
        case "Email is invalid":
            statusCode = 400;
            message = error.name;
            break;
        case "Mobile Phone is invalid":
            statusCode = 400;
            message = error.name;
            break;
        case "This email has already been registered":
            statusCode = 400;
            message = error.name;
            break;
        case "Missing required fields":
            statusCode = 400;
            message = error.name;
            break;
        case "Role is invalid":
            statusCode = 400;
            message = error.name;
            break;
        case "Invalid email/password":
            statusCode = 401;
            message = error.name;
            break;
        case "Invalid Token":
            statusCode = 401;
            message = error.name;
            break;
        case "Forbidden Access. Admin only":
            statusCode = 403;
            message = error.name;
            break;
        case "Forbidden Access. Admin && related Sales only":
            statusCode = 403;
            message = error.name;
            break;
        case "No user found with this email":
            statusCode = 404;
            message = error.name;
            break;
        case "No user found with this ID":
            statusCode = 404;
            message = error.name;
            break;
        case "Product Not Found":
            statusCode = 404;
            message = error.name;
            break;
        case "No store found with this ID":
            statusCode = 404;
            message = error.name;
            break;
        case "Photo is required":
            statusCode = 400;
            message = error.name;
            break;
        case "Store name is already registered":
            statusCode = 400;
            message = error.name;
            break;
        case "Store name is required":
            statusCode = 400;
            message = error.name;
            break;
        case "You are not yet at the location":
            statusCode = 400;
            message = error.name;
            break;
        case "Store address is required":
            statusCode = 400;
            message = error.name;
            break;
        case "Store longitude & latitude is required":
            statusCode = 400;
            message = error.name;
            break;
        case "Store owner's name is required":
            statusCode = 400;
            message = error.name;
            break;
        case "Store mobile phone is required":
            statusCode = 400;
            message = error.name;
            break;
        case "isCompleted is required":
            statusCode = 400;
            message = error.name;
            break;
        case "isCompleted must be boolean (true/false)":
            statusCode = 400;
            message = error.name;
            break;
        case "Store ID is required":
            statusCode = 400;
            message = error.name;
            break;
        case "User/Sales ID is required":
            statusCode = 400;
            message = error.name;
            break;
        case "Schedule time is required":
            statusCode = 400;
            message = error.name;
            break;
        case "Schedule already exists":
            statusCode = 400;
            message = error.name;
            break;
        case "No schedule found with this ID":
            statusCode = 404;
            message = error.name;
            break;
        case "Store with that ID has not been verified":
            statusCode = 400;
            message = error.name;
            break;
        case "No user found":
            statusCode = 404;
            message = error.name;
            break;
        case "No order found with this ID":
            statusCode = 404;
            message = error.name;
            break;
        case "Store id is required":
            statusCode = 400;
            message = error.name;
            break;
        case "Product order is required":
            statusCode = 400;
            message = error.name;
            break;
        case "Product order must be an Array":
            statusCode = 400;
            message = error.name;
            break;
        case "Unable to update confirmed Order":
            statusCode = 400;
            message = error.name;
            break;
        case "Unable to delete confirmed Order":
            statusCode = 400;
            message = error.name;
            break;
        case "BSONError":
            statusCode = 400;
            message = error.message;
            break;
    }


    res.status(statusCode).json({ message: message });
}

module.exports = { errorHandler };
