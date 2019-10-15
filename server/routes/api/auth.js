const express                         = require('express'),
      router                          = express.Router(),
      authController                  = require('../../controller/auth'),
      userController                  = require('../../controller/user'),
      { validator, checkValidation }  = require('../../middlewares/validator'),
      authUser                        = require('../../middlewares/auth-user');
      loginLogger                     = require('../../middlewares/logging');

/*
  @route   GET api/auth
  @desc    Get logged in user
  @access  Private
*/
router.get('/', authUser, authController.getUser);

/*
  @route   POST api/auth
  @desc    Auth user & Get token
  @access  Public
*/
router.post('/', validator.auth, checkValidation, loginLogger, authController.login);
module.exports = router;
