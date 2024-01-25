const ProductsController = require("../controllers/ProductsController");

const router = require(`express`).Router();
const multer = require("multer");
const authentication = require("../middlewares.js/authentication");
const authorizationRoleAdmin = require("../middlewares.js/authorizationRoleAdmin");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(authentication);

router.get(`/`, ProductsController.getAll);
router.get(`/dashboard`, ProductsController.listWebDash);
router.get(`/:id`, ProductsController.getDetailProduct);
router.post(
  `/`,
  authorizationRoleAdmin,
  upload.single("image"),
  ProductsController.addProduct
);
router.put(
  `/:id`,
  authorizationRoleAdmin,
  upload.single("image"),
  ProductsController.updateProduct
);
router.delete(`/:id`, authorizationRoleAdmin, ProductsController.removeProduct);

module.exports = router;
