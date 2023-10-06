const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const TaggingController = require('../controllers/taggingController');

router.use(authenticate);
router.get('/getAllTagging', TaggingController.getAllTagging);
router.post('/addTagging', TaggingController.addTagging);

module.exports = router;