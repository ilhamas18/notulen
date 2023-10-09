const router = require('express').Router();
const PegawaiController = require('../controllers/pegawaiController');
const authenticate = require('../middlewares/authenticate');

router.post('/login', PegawaiController.login);
router.post('/syncDataPegawai', PegawaiController.syncDataPegawai);
router.use(authenticate);
router.get('/getAllPegawai', PegawaiController.getAllPegawai);
router.get('/getProfile', PegawaiController.getProfile);
router.get('/getPegawai/:nip', PegawaiController.getOnePegawai);

module.exports = router;