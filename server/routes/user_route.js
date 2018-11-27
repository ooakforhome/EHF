const express = require('express');
const userCtrl = require('../controllers/user_ctrl');


const router = express.Router();

// API routes
router.route(`/api/user/findall`)
  .get(userCtrl.findAllUsers);

router.route(`/api/user/findoneuser`)
  .get(userCtrl.findSingleUsers);

router.route(`/api/user/signup`)
  .post(userCtrl.addUser);

router.route(`/api/user/signin`)
  .post(userCtrl.userLogin);

router.route(`/api/user/logout`)
  .get(userCtrl.userLogOut);

router.route(`/api/user/verify`)
  .get(userCtrl.userVerify);

module.exports = router;
 
