class MissingKeysInObjectError extends Error {
    constructor(msg) {
        super(`${msg}`);
    }
}

module.exports = {
    MissingKeysInObjectError
};