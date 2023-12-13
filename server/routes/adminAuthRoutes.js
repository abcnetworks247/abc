const {
    signUp,
    signIn,
    userRecovery,
    userUpdatePassword,
    userVerifyPasswordReset,
    singleUser,
    currentUser,
    userUpdate,
    userSignOut,
    userDelete,
  } = require('../controllers/authControllers');
  
  const router = require('express').Router();
  const adminAuthChecker = require('../middlewares/AdminAuthChecker'); // Import your admin auth middleware
  const path = require('path');
  const multer = require('multer');
  
  const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  router.route('/signup').post(signUp);
  router.route('/signin').post(signIn);
  router.route('/recovery').post(userRecovery);
  router.route('/account/signout').delete(adminAuthChecker, userSignOut);
  
  router.route('/user/:id').get(singleUser);
  
  router.route('/account/updatepassword/:token').get(userVerifyPasswordReset);
  router.route('/account/updatepassword/').post(userUpdatePassword);
  router.route('/account').get(adminAuthChecker, currentUser); // Change authChecker to adminAuthChecker
  router.route('/account').patch(adminAuthChecker, upload.single('userphoto'), userUpdate); // Change authChecker to adminAuthChecker
  router.route('/account').delete(adminAuthChecker, userDelete); // Change authChecker to adminAuthChecker
  
  module.exports = router;
  