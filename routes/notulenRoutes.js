const express = require("express");
const router = require("express").Router();
const NotulenController = require("../controllers/notulenController");
const authenticate = require("../middlewares/authenticate");
const upload = require("../helpers/s3");
const {
  authorize,
  authorizeUser,
  authorizeAdminOPD,
  authorizeVerifikator,
} = require("../middlewares/authorize");

router.delete("/deleteFile/:filename", NotulenController.deleteFile);
router.get("/getFile/:filename", NotulenController.downloadFile);
router.use(authenticate);
router.get("/getNotulenDetail/:id", NotulenController.getOneNotulen);
router.get("/getAuthNotulen/:kode_opd/:nip/:bulan/:tahun", NotulenController.getAuthNotulen);
router.get("/getAllNotulens", NotulenController.getAllNotulen);
router.post("/uploadFile", upload.single("file"), NotulenController.uploadFile);
router.post("/addNotulen", authorizeUser, NotulenController.addNotulen);
router.put("/addTagging/:id", authorizeAdminOPD, NotulenController.addTagging);
router.put("/editNotulen/:id", NotulenController.editNotulen);
router.put("/updateStatus/:id", authorizeVerifikator, NotulenController.updateStatus);
router.post('/syncSasaran', NotulenController.syncSasaran);

module.exports = router;
