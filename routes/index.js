const router = require('express').Router();
const PegawaiRouter = require('./pegawaiRoutes');
const NotulenRouter = require('./notulenRoutes');
const TaggingRouter = require('./taggingRoutes');

router.use('/pegawai', PegawaiRouter);
router.use('/notulen', NotulenRouter);
router.use('/tagging', TaggingRouter);

module.exports = router;