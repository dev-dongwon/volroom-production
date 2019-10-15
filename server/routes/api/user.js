const express        = require('express'),
      router         = express.Router(),
      userController = require('../../controller/user'),
      { validator, checkValidation }  = require('../../middlewares/validator');

// read user info
router.get('/:id', userController.getUser);
// create user
router.post('/', validator.user, checkValidation, userController.createUser);

module.exports = router;
