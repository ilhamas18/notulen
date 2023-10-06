const router = require('express').Router();
const OPDController = require('../controllers/opdController');

router.get('/getOneOPDWithPegawai/:kode_opd', OPDController.getOneOPDWithPegawai);

module.exports = router;