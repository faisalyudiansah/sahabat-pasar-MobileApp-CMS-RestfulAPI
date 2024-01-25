const StoresController = require("../controllers/StoresController");

const router = require(`express`).Router();
const multer = require("multer");
const authorizationRoleAdmin = require("../middlewares.js/authorizationRoleAdmin");
const authentication = require("../middlewares.js/authentication");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get(`/`, StoresController.getAll);
router.post(`/`, upload.single(`photo`), StoresController.addStore);
router.get(`/count`, StoresController.getCount);
router.get(`/simple`, StoresController.getSimpleList);
router.get(`/mobile`, StoresController.getMobileList);
router.get(`/:id`, StoresController.getDetailById);
router.use(authentication);
router.delete(`/:id`, authorizationRoleAdmin, StoresController.deleteById);
router.put(`/:id`, authorizationRoleAdmin, StoresController.editById);
router.patch(
  `/:id`,
  authorizationRoleAdmin,
  upload.single(`photo`),
  StoresController.patchImageById
);

module.exports = router;
