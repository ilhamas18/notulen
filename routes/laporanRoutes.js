const router = require("express").Router();
const LaporanController = require("../controllers/laporanController");
const authenticate = require("../middlewares/authenticate");

router.use(authenticate);
router.get("/getAuthLaporan/:kode_opd/:bulan/:tahun", LaporanController.getAllLaporan);

module.exports = router;