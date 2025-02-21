const userRoutes = require('./users');
const partnershipRoutes = require('./partnerships');

const express = require('express');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/partnerships', partnershipRoutes);

module.exports = router;