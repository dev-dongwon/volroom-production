const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require("sequelize-test-helpers");

const UserModel = require("../../../server/db/models/User");

describe("user Model", () => {
  const Model = UserModel(sequelize, dataTypes);
  const instance = new Model();

  // user model을 가지고 있는가?
  checkModelName(Model)("User");

  // User properties를 모두 가지고 있는가?
  [
    "id",
    "name",
    "email",
    "password",
    "google_auth",
    "position",
    "photo",
    "introduction"
  ].forEach(checkPropertyExists(instance));
});
