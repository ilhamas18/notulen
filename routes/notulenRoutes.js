const express = require("express");
const router = require("express").Router();
const NotulenController = require("../controllers/notulenController");
const authenticate = require("../middlewares/authenticate");
// const upload = require("../helpers/s3");
const upload = require('../helpers/upload');
const {
  authorize,
  authorizeUser,
  authorizeAdminOPD,
  authorizeVerifikator,
} = require("../middlewares/authorize");

router.get("/getFile", NotulenController.downloadFile);
router.get("/deleteFile", NotulenController.deleteFile);
router.use(authenticate);
router.get("/getNotulenDetail/:id", NotulenController.getOneNotulen);
router.get("/getAuthNotulen/:kode_opd/:nip/:bulan/:tahun", NotulenController.getAuthNotulen);
router.get("/getAllNotulens", NotulenController.getAllNotulen);
router.post("/addNotulen", NotulenController.addNotulen);
router.put("/addTagging/:id", authorizeAdminOPD, NotulenController.addTagging);
router.put("/editNotulen/:id", NotulenController.editNotulen);
router.put("/updateStatus/:id", authorizeVerifikator, NotulenController.updateStatus);
router.post('/syncSasaran', NotulenController.syncSasaran);
router.post('/addSasaran', NotulenController.addSasaran);
router.delete('/deleteSasaran', NotulenController.deleteSasaran);

module.exports = router;
