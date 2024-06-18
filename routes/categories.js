const { Router } = require('express');
const { check } = require('express-validator');
const { create, update, index, remove, show } = require('../controllers/category');
const { validateFields, 
    validateJWT, 
    hasRole 
} = require('../middlewares');
const { isValidCategory, duplicatedCategory } = require('../middlewares/validateCollections');

const router = Router();

router.get('/', index);

router.get('/:id', [
    check('id').isMongoId(),
], show);

router.post("/", [
    validateJWT,
    hasRole(['ADMIN_ROLE']),
    check("name").notEmpty(),
    check('name').custom(duplicatedCategory),
    validateFields
], create);


router.put("/:id", [
    validateJWT,
    hasRole(['ADMIN_ROLE']),
    check('id').isMongoId(),
    check('id').custom(isValidCategory),
    check('name').notEmpty(),
    check('name').custom(duplicatedCategory),
    validateFields
], update);

router.delete('/:id', [
    validateJWT,
    hasRole(['ADMIN_ROLE']),
    check('id').isMongoId(),
    check('id').custom(isValidCategory),
    validateFields
], remove)



module.exports = router;