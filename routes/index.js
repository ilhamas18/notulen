const router = require('express').Router();
const OPDRouter = require('./opdController');
const PegawaiRouter = require('./pegawaiRoutes');
const NotulenRouter = require('./notulenRoutes');
const TaggingRouter = require('./taggingRoutes');
const UploadRouter = require('./uploadRoutes');

router.use('/opd', OPDRouter);
router.use('/pegawai', PegawaiRouter);
router.use('/notulen', NotulenRouter);
router.use('/tagging', TaggingRouter);
router.use('/upload', UploadRouter);

module.exports = router;