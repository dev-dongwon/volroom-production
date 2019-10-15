const express       = require('express'),
      router        = express.Router(),
      logController = require('../../controller/log');

/*
  @route   GET api/log
  @desc    Get log data
  @access  Private
*/
router.get('/', logController.getUserLog);

module.exports = router;
