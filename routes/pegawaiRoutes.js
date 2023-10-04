const router = require('express').Router();
const PegawaiController = require('../controllers/pegawaiController');
const authenticate = require('../middlewares/authenticate');

router.get('/getAllPegawai', PegawaiController.getAllPegawai);

module.exports = router;