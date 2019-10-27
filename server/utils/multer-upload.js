const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
};

AWS.config.update(config);
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "volroom-profile-photo",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, file.originalname);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = upload;
