const router = require('express').Router();
const NotulenController = require('../controllers/notulenController');
const authenticate = require('../middlewares/authenticate');

router.use(authenticate);
router.get('/getNotulenDetail/:id', NotulenController.getOneNotulen);
router.post('/getAuthNotulen', NotulenController.getAuthNotulen);
router.get('/getAllNotulens', NotulenController.getAllNotulen);
router.post('/addNotulen', NotulenController.addNotulen);

module.exports = router;