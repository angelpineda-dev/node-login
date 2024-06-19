const { Router } = require('express');
const { check } = require('express-validator');

const { create, update, show, updateCloudinary } = require('../controllers/upload');
const { validCollections } = require('../helpers/db-validators');
const { validateFile, validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/', [
    validateFile,
    validateFields
], create);

router.get('/:collection/:id', [
    check('id').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    validateFields,
], show)

router.put('/:collection/:id', [
    check('id').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    validateFile,
    validateFields,
 ], updateCloudinary)

module.exports = router;