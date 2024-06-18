/* Libraries */
const { Router } = require('express');
const { check } = require('express-validator');
/* Controllers */
const { index, create, update, remove } = require('../controllers/product');
/* middlewares */
const { validateFields, validateJWT, isValidCategory, isValidUser, isValidProduct } = require('../middlewares');

const router = Router();

router.get('/', index);

router.post('/', [
    validateJWT,
    check('user').isMongoId(),
    check('category').isMongoId(),
    check('name', 'Name is required').notEmpty(),
    check('price', 'Price is required').notEmpty(),
    check('stock', 'Stock is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('category').custom(isValidCategory),
    check('user').custom(isValidUser),
    validateFields
], create)

router.put('/:id', [
    validateJWT, 
    check('id', "ID is not a mongo id.").isMongoId(), 
    check('id').custom(isValidProduct),
    validateFields], update);

router.delete('/:id', [
    validateJWT, 
    check('id', "ID is not a mongo id.").isMongoId(),
    check('id').custom(isValidProduct),
    validateFields
], remove);


module.exports = router;