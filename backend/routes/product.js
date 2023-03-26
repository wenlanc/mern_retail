const { Router } = require('express');
const productController = require('../controllers/productController');
const router = Router();

router.post('/list', productController.list_items);
router.post('/create',productController.create_item);
router.post('/update',productController.update_item);
router.get('/delete/:id',productController.delete_item);
router.get('/find/:id',productController.find_item);

module.exports = router;