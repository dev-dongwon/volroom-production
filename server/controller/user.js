const {
    readUserData,
    createUser,
    isDupleUser,
    updateUser
  } = require("../db/instructions/user"),
  encryptPassword = require("../utils/encrypt"),
  generateJwtToken = require("../utils/generate-jwt");

const controller = {
  // 유저 가져오기
  getUser: async (req, res, next) => {
    try {
      const user = await readUserData(req.params.id || req.user.id);
      return res.json({ user });
    } catch (error) {
      next(error);
    }
  },
  // 유저 생성하기
  createUser: async (req, res, next) => {
    try {
      let { name, email, password } = req.body;

      // 유저 중복 체크
      if (await isDupleUser(email)) {
        return res
          .status(400)
          .json({ msg: "동일한 이메일이나 이름의 유저가 존재합니다" });
      }

      password = await encryptPassword(password);
      const user = await createUser({ name, email, password });

      const token = await generateJwtToken(user);
      return res.json({ token });
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    // 미들웨어에서 획득한 user와 요청 user id가 동일한지 비교
    if (Number(req.user.id) !== Number(req.params.id)) {
      return res.status(400).json({ msg: "권한이 없습니다" });
    }

    try {
      const userObj = req.body;
      let imageLocation = null;

      if (req.file) {
        imageLocation = req.file.location;
        userObj.photo = imageLocation;
      }

      await updateUser(req.params.id, userObj);
      const user = await readUserData(req.params.id);

      // 업데이트 후 새로 토큰 발급
      const token = await generateJwtToken(user.dataValues);
      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = controller;
