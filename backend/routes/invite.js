const { Router } = require('express');
const inviteController = require('../controllers/inviteController');
const router = Router();

router.post('/create', inviteController.create_item);

module.exports = router;