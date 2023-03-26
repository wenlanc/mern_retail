const { Router } = require('express');
const customerController = require('../controllers/customerController');
const router = Router();

router.post('/list', customerController.list_items);
router.post('/create',customerController.create_item);
router.post('/update',customerController.update_item);
router.get('/delete/:id',customerController.delete_item);
router.get('/find/:id',customerController.find_item);
router.post('/update-status',customerController.update_status);

module.exports = router;