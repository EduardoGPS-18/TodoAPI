const { InvalidEmail } = require('../custom-errors/InvalidEmail');
const { MinLengthError } = require('../custom-errors/MinLengthError');
const { MissingKeysInObjectError } = require('../custom-errors/MissingKeysInObjectError');

module.exports = {
    missingKeys(keys) {
        throw new MissingKeysInObjectError(keys);
    },
    invalidEmail(msg) {
        throw new InvalidEmail(msg);
    },
    minLengthError(msg) {
        throw new MinLengthError(msg);
    }
}