
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: "cF/yYAOEa75KjN3jbJafWOLr5BRoMhaw7yjANesi",
  accessKeyId: "AKIAVQUA66HOXF6YA4GJ",
  region: "ap-southeast-1",

});
const BUCKET = "basarnas-bucket"
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET,
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname)
    }
  })
})

module.exports = upload;