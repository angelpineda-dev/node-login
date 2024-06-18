const validateJWT = require('./validate-jwt');
const validateFields = require('./validateFields');
const validateRol = require('./validateRol');
const validateCollections = require('./validateCollections');

module.exports = {
    ...validateJWT,
    ...validateFields,
    ...validateRol,
    ...validateCollections
}