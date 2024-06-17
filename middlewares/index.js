const validateJWT = require('./validate-jwt');
const validateFields = require('./validateFields');
const validateRol = require('./validateRol');

module.exports = {
    ...validateJWT,
    ...validateFields,
    ...validateRol
}