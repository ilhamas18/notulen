const router = require('express').Router();
const TaggingController = require('../controllers/taggingController');

router.get('/getAllTagging', TaggingController.getAllTagging);
router.post('/addTagging', TaggingController.addTagging);

module.exports = router;