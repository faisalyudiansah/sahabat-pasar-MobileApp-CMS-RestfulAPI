const OrdersController = require("../controllers/OrdersController");
const authentication = require("../middlewares.js/authentication");
const authorizationRoleAdmin = require("../middlewares.js/authorizationRoleAdmin");

const router = require("express").Router();

router.use(authentication);

router.get(`/`, authorizationRoleAdmin, OrdersController.getAll);
router.post(`/`, OrdersController.addOrders);
router.get(`/user`, OrdersController.getPerUser);
router.get(`/dashboard`, OrdersController.getThisMonthDashboard);
router.get(`/monthly/user`, OrdersController.getMonthlyPerUser);
router.put(`/:id`, OrdersController.editOrders);
router.delete(`/:id`, authorizationRoleAdmin, OrdersController.deleteOrders);
router.get(`/:id`, OrdersController.getDetail);

module.exports = router;
