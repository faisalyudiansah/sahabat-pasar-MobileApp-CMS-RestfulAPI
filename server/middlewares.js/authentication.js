const { verifyToken } = require("../helpers/jwt")
const { db } = require("../configs/mongodb")
const { ObjectId } = require("mongodb")
async function authentication(req, res, next) {
    try {
        let { authorization } = req.headers
        if (!authorization) {
            throw { name: "Invalid Token" }
        }
        let splittedToken = authorization.split(' ')
        if (splittedToken[0] !== 'Bearer') {
            throw { name: "Invalid Token" }
        }
        let verifyJwt = verifyToken(splittedToken[1])
        if (verifyJwt === "Invalid Token") {
            throw { name: "Invalid Token" }
        }
        let findUser = await db.collection("users").findOne(
            { _id: new ObjectId(verifyJwt._id) },
            {
                projection: { password: 0 }
            })
        req.user = findUser
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = authentication