const express = require('express');
const { multipleUpload } = require('../utils/upload');
const { createNewPartnership, getUserPartnerships, getPartnershipById, updateUserPartnership, deleteUserPartnership } = require('../controllers/partnershipControllers');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getUserPartnerships);
router.get('/:id', getPartnershipById);
router.post('/', multipleUpload, createNewPartnership);
router.put('/:id', updateUserPartnership);
router.delete('/:id', deleteUserPartnership);

module.exports = router;