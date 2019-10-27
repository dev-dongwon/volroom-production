const express        = require('express'),
      router         = express.Router(),
      userController = require('../../controller/user'),
      authUser       = require('../../middlewares/auth-user'),
      multerUpload   = require('../../utils/multer-upload'),
      { validator, checkValidation }  = require('../../middlewares/validator');

// read user info
router.get('/:id', userController.getUser);
// create user
router.post('/', validator.user, checkValidation, userController.createUser);
// update user
router.patch('/:id', authUser, multerUpload.single('profile'), userController.updateUser);
// delete user
module.exports = router;
