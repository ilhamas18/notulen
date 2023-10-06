const router = require('express').Router();
const OPDRouter = require('./opdController');
const PegawaiRouter = require('./pegawaiRoutes');
const NotulenRouter = require('./notulenRoutes');
const TaggingRouter = require('./taggingRoutes');

router.use('/opd', OPDRouter);
router.use('/pegawai', PegawaiRouter);
router.use('/notulen', NotulenRouter);
router.use('/tagging', TaggingRouter);

module.exports = router;