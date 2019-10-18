const redisClient = require("./redis-connect");

class RedisStore {
  constructor() {
    this.redisClient = redisClient;
  }

  async createRoom(
    namespace,
    { roomId, hostId, roomName, privateFlag, password, topic }
  ) {
    const data = {
      roomId,
      hostId,
      roomName,
      privateFlag,
      password,
      topic,
      numberOfPerson : 0
    };

    const result = await this.redisClient.set(
      `${namespace}:${roomId}`,
      JSON.stringify(data)
    );
    return result;
  }

  async getRoom(key) {
    const result = JSON.parse(await this.redisClient.get(key));
    return result;
  }

  async getAllRoom() {
    const roomListKey = await this.redisClient.keys("*");
    const result = [];
    for (const key of roomListKey) {
      const room = JSON.parse(await this.redisClient.get(key));
      const { roomId, hostId, roomName, topic, privateFlag, numberOfPerson } = room;
      result.push({ roomId, hostId, roomName, topic, privateFlag, numberOfPerson });
    }
    return result;
  }

  async getRoomsByType(type) {
    let roomListKey;
    switch (type) {
      case "all":
        roomListKey = await this.redisClient.keys("*");
        break;
      case "talk":
        roomListKey = await this.redisClient.keys("talk:*");
        break;
      case "jam":
        roomListKey = await this.redisClient.keys("jam:*");
        break;
    }

    const result = [];
    for (const key of roomListKey) {
      const room = JSON.parse(await this.redisClient.get(key));
      const { roomId, hostId, roomName, topic, privateFlag, numberOfPerson } = room;
      result.push({ roomId, hostId, roomName, topic, privateFlag, numberOfPerson });
    }
    return result;
  }

  async removeRoom(key) {
    const result = await this.redisClient.del(key);
    return result;
  }

  updateRoomByNumberOfPerson(roomObj, data) {
    if (data === "enter") {
      roomObj.numberOfPerson += 1;
      return roomObj;
    }

    if (data === "leave") {
      roomObj.numberOfPerson -= 1;
      return roomObj;
    }
  }

  async updateRoom(namespace, roomId, key, dataObj) {
    const { name, data } = dataObj;
    const room = JSON.parse(await this.redisClient.get(key));

    if (name === "numberOfPerson") {
      this.updateRoomByNumberOfPerson(room, data);
    } else {
      room[name] = data;
    }

    const result = await this.redisClient.set(
      `${namespace}:${roomId}`,
      JSON.stringify(room)
    );

    return result;
  }
}

const redisStore = new RedisStore();

module.exports = redisStore;
