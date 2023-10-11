const router = require('express').Router();
const UploadFileController = require('../controllers/uploadFileController');
const upload = require('../helpers/upload');

router.post('/undangan', upload.single("undangan"), UploadFileController.uploadSuratUndangan);
router.post('/daftarhadir', upload.single("file"), UploadFileController.uploadDaftarHadir);
router.post('/spj', upload.single("file"), UploadFileController.uploadSPJ);
router.post('/foto', upload.single("file"), UploadFileController.uploadFoto);
router.post('/pendukung', upload.single("file"), UploadFileController.uploadPendukung);

module.exports = router;