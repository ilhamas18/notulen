const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const TaggingController = require('../controllers/taggingController');
const { authorizeAdmin } = require('../middlewares/authorize');

router.use(authenticate);
router.get('/getAllTagging', TaggingController.getAllTagging);
router.post('/addTagging', authorizeAdmin, TaggingController.addTagging);

module.exports = router;