const { ObjectId } = require('mongodb')
const { db } = require('../configs/mongodb')

async function authorizationRoleAdmin(req, res, next) {
    try {
        let findUser = await db.collection("users").findOne(
            { _id: new ObjectId(req.user._id) },
            { projection: { password: 0 } }
        )
        if (findUser.role !== "admin") {
            throw { name: 'Forbidden Access. Admin only' }
        }
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = authorizationRoleAdmin