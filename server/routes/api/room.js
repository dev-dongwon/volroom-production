const express        = require('express'),
      router         = express.Router(),
      roomController = require('../../controller/room');

// create room
router.post('/:namespace', roomController.createRoom);
// get room info
router.get('/:namespace/:roomId', roomController.getRoom);
// get All room Info
router.get('/', roomController.getAllRoom);
// get rooms by room type
router.get('/:type', roomController.getRoomsByType);
// remove room Info
router.delete('/:namespace/:roomId', roomController.removeRoom);

module.exports = router;
