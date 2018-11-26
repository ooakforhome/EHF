const express = require('express');
const adminCtrl = require('../controllers/admin_ctrl');


const router = express.Router();

// API routes
router.route(`/api/findall`)
  .get(adminCtrl.findAllUsers);

router.route(`/api/findoneadmin`)
  .get(adminCtrl.findSingleUsers);

router.route(`/api/signup`)
  .post(adminCtrl.addUser);

router.route(`/api/signin`)
  .post(adminCtrl.adminLogin);

router.route(`/api/logout`)
  .get(adminCtrl.adminLogOut);

router.route(`/api/verify`)
  .get(adminCtrl.adminVerify);

module.exports = router;
