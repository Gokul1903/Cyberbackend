const express = require("express");
const router = express.Router();

const { addJob, viewJob } = require("../eatycontroller/creatingcontroller");
const{Admin_signin}=require("../eatycontroller/admincontroller")
const { AuthmiddlewareAdmin } = require("../authmiddleware/authmiddle");

router.post("/addJob", addJob);
router.get("/viewJob", viewJob);
router.get("/signup", Admin_signin);
module.exports = router;
