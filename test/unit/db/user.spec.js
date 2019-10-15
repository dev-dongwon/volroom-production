const { readUserData } = require('../../../server/db/instructions/user');

describe("user CRUD", () => {
  describe("user get mothod", () => {
    test("해당하는 유저 정보가 없으면 null을 반환", async () => {
      await expect(readUserData(null)).resolves.toBe(null);
    });
    test("id가 undefined일 경우 throw", async () => {
      await expect(readUserData(undefined)).rejects.toThrow('WHERE parameter "id" has invalid "undefined" value');
    });
  });
});
