const { Router } = require('express');
const orderController = require('../controllers/orderController');
const router = Router();

router.get('/order/:id',orderController.get_orders);
router.post('/order/:id',orderController.checkout);
router.post('/list', orderController.list_items);
router.post('/create', orderController.create_item);
router.get('/delete/:id',orderController.delete_item);
router.get('/find/:id',orderController.find_item);

module.exports = router;