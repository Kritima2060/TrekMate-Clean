const express= require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
// const signupSchema = require("../validators/auth-validation");
// const validate = require("../middlewares/validate-middleware");

router.route("/").get(authControllers.home);

// router.route("/register"). post(validate(signupSchema),authControllers.registration);
router.route("/register").post(authControllers.registration); 
router.route("/login").post(authControllers.login);                            

 
module.exports = router;