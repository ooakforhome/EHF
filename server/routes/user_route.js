const express = require('express');
const userCtrl = require('../controllers/user_ctrl');


const router = express.Router();

// API routes
router.route(`/api/user/findall`)
  .get(userCtrl.findAllUsers);

router.route(`/api/user/findoneuser`)
  .get(userCtrl.findSingleUser);

router.route(`/api/user/findbyemail`)
  .get(userCtrl.findUserByEmail);

router.route(`/api/user/userlimitedinfo`)
  .get(userCtrl.userLimitedInfo);

router.route(`/api/user/logout`)
  .get(userCtrl.userLogOut);

router.route(`/api/user/verify`)
  .get(userCtrl.userVerify);

router.route(`/api/user/findidbytoken`)
  .get(userCtrl.findUserIdByToken);

router.route(`/api/user/findbytoken`)
  .get(userCtrl.findUserByToken);

router.route(`/api/user/finduseraddress`)
  .get(userCtrl.userGetAddress);

router.route(`/api/user/useraddtocart`)
  .get(userCtrl.userShowAllItemsAdded);

// router.route(`/api/user/signup`)
//   .post(userCtrl.addUser);
router.route(`/api/member/signup`)
  .post(userCtrl.addMember);

router.route(`/api/user/userupdate`)
  .post(userCtrl.updateUser)

router.route(`/api/user/signin`)
  .post(userCtrl.userLogin);

router.route(`/api/user/userremoveitem`)
  .delete(userCtrl.userRemoveACartItem);

router.route(`/api/user/emptyusercart/`)
  .post(userCtrl.emptyUserCart);

router.route(`/api/user/paymentsuccessful/`)
  .put(userCtrl.userPaymentSuccessful);



module.exports = router;
