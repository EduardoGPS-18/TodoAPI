class MinLengthError extends Error {
    constructor(msg) {
        super(`${msg}`);
    }
}

module.exports = {
    MinLengthError
};