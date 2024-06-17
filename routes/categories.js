const { Router } = require('express');
const { check } = require('express-validator');
const { create, update, index, remove, show } = require('../controllers/category');
const { validateFields, 
    validateJWT, 
    hasRole 
} = require('../middlewares');
const { isCategory } = require('../middlewares/validateCollections');

const router = Router();

router.get('/', index);

router.get('/:id', [
    check('id').isMongoId(),
], show);

router.post("/", [
    validateJWT,
    hasRole(['ADMIN_ROLE']),
    check("name").notEmpty(),
    validateFields
], create);


router.put("/:id", [
    validateJWT,
    hasRole(['ADMIN_ROLE']),
    check('id').isMongoId(),
    check('id').custom(isCategory),
    check('name').notEmpty(),
    validateFields
], update);

router.delete('/:id', [
    validateJWT,
    hasRole(['ADMIN_ROLE']),
    check('id').isMongoId(),
    check('id').custom(isCategory),
    validateFields
], remove)



module.exports = router;