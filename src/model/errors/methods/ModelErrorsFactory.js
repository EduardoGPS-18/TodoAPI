const { DuplicatedDataError } = require('../custom-errors/DuplicatedDataError');
const { InexistentDataError }= require('../custom-errors/InexistentDataError');
const { InvalidUserError } = require('../custom-errors/InvalidUserError');

module.exports = {
    duplicatedData(msg) {
        throw new DuplicatedDataError(msg);
    },
    invalidUser(msg) {
        throw new InvalidUserError(msg);
    },
    inexistentDataError(msg) {
        throw new InexistentDataError(msg);
    }
}