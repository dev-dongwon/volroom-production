const redisStore = require("../redis/RedisStore");

const controller = {
  // 방 만들기
  createRoom: async (req, res, next) => {
    try {
      const { namespace } = req.params;
      const roomObj = req.body;
      const flag = await redisStore.createRoom(namespace, roomObj);

      let result = false;

      if (flag === "OK") {
        result = await redisStore.getRoom(`${namespace}:${roomObj.roomId}`);
      }
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },
  // 특정 room 가져오기
  getRoom: async (req, res, next) => {
    try {
      const { namespace, roomId } = req.params;
      const result = await redisStore.getRoom(`${namespace}:${roomId}`);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },
  // 모든 room 정보 가져오기
  getAllRoom: async (req, res, next) => {
    try {
      const result = await redisStore.getAllRoom();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },
  // 특정 room 삭제하기
  removeRoom: async (req, res, next) => {
    try {
      const { namespace, roomId } = req.params;
      const result = await redisStore.removeRoom(`${namespace}:${roomId}`);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  // 특정 type rooms 가져오기
  getRoomsByType: async (req, res, next) => {
    try {
      const { type } = req.params;
      const result = await redisStore.getRoomsByType(type);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = controller;
