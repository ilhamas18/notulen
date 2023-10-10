const router = require('express').Router();
const PegawaiController = require('../controllers/pegawaiController');
const authenticate = require('../middlewares/authenticate');
const { authorizeAdminOrAdminOPD } = require('../middlewares/authorize');

router.post('/login', PegawaiController.login);
router.use(authenticate);
router.get('/syncDataPegawai/:kode_opd', PegawaiController.syncDataPegawai);
router.get('/getAllPegawai/:kode_opd', PegawaiController.getAllPegawai);
router.get('/getPelapor/:kode_opd/:tipe', PegawaiController.getAllPelapor);
router.post('/addPegawai', PegawaiController.addPegawai);
router.get('/getProfile', PegawaiController.getProfile);
router.get('/getPegawai/:nip', PegawaiController.getOnePegawai);

module.exports = router;