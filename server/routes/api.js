const express    = require('express'),
      router     = express.Router(),
      userRouter = require('./api/user'),
      authRouter = require('./api/auth'),
      roomRouter = require('./api/room');
      logRouter  = require('./api/log');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/rooms', roomRouter);
router.use('/logs', logRouter);

module.exports = router;