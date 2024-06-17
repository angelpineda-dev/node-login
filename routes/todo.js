const { Router } = require('express');
const { check } = require('express-validator');
const { create, update, index, remove } = require('../controllers/todo');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();


router.post("/create", [check("description").notEmpty(), validateFields], create);

router.get('/index', index);

router.put("/update/:id", [
    check('id').isMongoId(),
    check('description').notEmpty(),
    validateFields
], update);

router.delete('/delete/:id', [
    check('id').isMongoId(),
    validateFields
], remove)



module.exports = router;