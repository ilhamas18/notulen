const router = require('express').Router();
const PegawaiController = require('../controllers/pegawaiController');
const authenticate = require('../middlewares/authenticate');

router.post('/login', PegawaiController.login);
router.use(authenticate);
router.get('/getAllPegawai', PegawaiController.getAllPegawai);
router.get('/getProfile', PegawaiController.getProfile);
router.get('/getPegawai/:id', PegawaiController.getOnePegawai);
router.post('/syncDataPegawai', PegawaiController.syncDataPegawai);

module.exports = router;