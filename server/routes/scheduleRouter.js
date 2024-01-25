const SchedulesController = require("../controllers/SchedulesController");
const authentication = require("../middlewares.js/authentication");
const authorizationRoleAdmin = require("../middlewares.js/authorizationRoleAdmin");

const router = require(`express`).Router();

router.use(authentication)

router.get(`/`, authorizationRoleAdmin, SchedulesController.getAllschedules);
router.post(`/`, authorizationRoleAdmin, SchedulesController.createSchedules);
router.get(`/myschedule`, SchedulesController.getScheduleUserLogin);
router.get(`/:scheduleId`, SchedulesController.getScheduleById); // admin and sales
router.delete(`/:scheduleId`, authorizationRoleAdmin, SchedulesController.deleteSchedule); 
router.put(`/:scheduleId`, authorizationRoleAdmin, SchedulesController.updateSchedule); 
router.put(`/status/:scheduleId`, SchedulesController.updateStatusSchedule); // admin and sales

module.exports = router;
