const ModelErrorsFactory = require('./methods/ModelErrorsFactory');

const { DuplicatedDataError } = require('./custom-errors/DuplicatedDataError');
const { InexistentDataError }= require('./custom-errors/InexistentDataError');
const { InvalidUserError } = require('./custom-errors/InvalidUserError');

module.exports = {
    ModelErrorsFactory,
    
    DuplicatedDataError,
    InexistentDataError,
    InvalidUserError,
}