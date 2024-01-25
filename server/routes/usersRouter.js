const UsersController = require("../controllers/UsersController")
const authentication = require("../middlewares.js/authentication")
const authorizationRoleAdmin = require("../middlewares.js/authorizationRoleAdmin")

const router = require(`express`).Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post(`/register`, UsersController.register)
router.post(`/login`, UsersController.login)

router.use(authentication)

router.get(`/`, authorizationRoleAdmin, UsersController.getAllUser)
router.get(`/userprofile`, UsersController.getUserWhoIsLogin) // sales can see their profile
router.put(`/:idUser`, upload.fields([
    { name: 'name', maxCount: 1 },
    { name: 'email', maxCount: 1 },
    { name: 'mobilePhone', maxCount: 1 },
    { name: 'address', maxCount: 1 },
    { name: 'photo', maxCount: 1 }
]), UsersController.updateUser) // sales can update their own account
router.delete(`/:idUser`, authorizationRoleAdmin, UsersController.deleteUser)
router.get(`/finduser-email`, authorizationRoleAdmin, UsersController.getUserByEmail)
router.get(`/finduser/:idUser`, authorizationRoleAdmin, UsersController.getUserByIdParams)
router.get(`/dashboard`, authorizationRoleAdmin, UsersController.getUserForDashboard)
router.get(`/select`, authorizationRoleAdmin, UsersController.getSelectUsers)

module.exports = router
