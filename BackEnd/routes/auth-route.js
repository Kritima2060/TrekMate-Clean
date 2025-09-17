const express= require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const validate = require("../middlewares/validate-middleware");
    const {signupSchema,loginSchema} = require("../validators/auth-validator");

router.route("/").get(authControllers.home);

router.route("/register"). post(validate(signupSchema),authControllers.registration);
// router.route("/register").post(authControllers.registration); 
router.route("/login").post(validate(loginSchema),authControllers.login);  
// router.route("/review").post(authControllers.review);                        

 
module.exports = router;