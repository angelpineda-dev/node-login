/* packages */
const { Router } = require('express');
const { check } = require('express-validator');
/* controller */
const { register, login, me } = require('../controllers/auth');
/* helpers */
const { validateFields } = require('../middlewares/validateFields');
const { validateEmail, validatePassword } = require('../helpers/db-validators');

/* variables */
const router = Router();

router.post('/login',[
    check("email").notEmpty(),
    check("password").notEmpty(),
    validateFields
], login);

router.post('/register',[
    check("name").notEmpty(),
    check("password").notEmpty(),
    check("email").custom(validateEmail),
    check("password").custom(validatePassword),
    validateFields
], register);


router.get('/me', me)

module.exports = router;