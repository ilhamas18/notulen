const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const UndanganController = require('../controllers/undanganController');

router.use(authenticate);
router.get('/getAuthUndangan/:kode_opd/:bulan/:tahun', UndanganController.getAuthUndangan);
router.get('/getAllUndangans/:kode_opd', UndanganController.getAllUndangan);
router.post('/addUndangan', UndanganController.addUndangan);

module.exports = router;