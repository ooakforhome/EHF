const express = require('express');
const userCtrl = require('../controllers/user_ctrl');


const router = express.Router();

// API routes
router.route(`/api/findall`)
  .get(userCtrl.findAllUsers);

router.route(`/api/findoneuser`)
  .get(userCtrl.findSingleUsers);

router.route(`/api/signup`)
  .post(userCtrl.addUser);

router.route(`/api/signin`)
  .post(userCtrl.userLogin);

router.route(`/api/logout`)
  .get(userCtrl.userLogOut);

router.route(`/api/verify`)
  .get(userCtrl.userVerify);

module.exports = router;
