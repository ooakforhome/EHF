const express = require('express');
const adminCtrl = require('../controllers/admin_ctrl');


const router = express.Router();

// API routes
router.route(`/api/admin/findall`)
  .get(adminCtrl.findAllAdmins);

router.route(`/api/admin/findbyemail`)
  .get(adminCtrl.findByEmail);

router.route(`/api/admin/findoneadmin`)
  .get(adminCtrl.findSingleAdmin);

router.route(`/api/admin/signup`)
  .post(adminCtrl.addAdmin);

router.route(`/api/admin/signin`)
  .post(adminCtrl.adminLogin);

router.route(`/api/admin/logout`)
  .get(adminCtrl.adminLogOut);

router.route(`/api/admin/verify`)
  .get(adminCtrl.adminVerify);

module.exports = router;
