const router = require('express').Router();
const PesertaController = require('../controllers/pesertaController');
const authenticate = require('../middlewares/authenticate');

router.use(authenticate);
router.post('/addPeserta', PesertaController.addPeserta);

module.exports = router;