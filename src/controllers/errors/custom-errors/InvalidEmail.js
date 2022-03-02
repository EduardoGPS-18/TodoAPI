class InvalidEmail extends Error {
    constructor(msg) {
        super(`${msg}`);
    }
}

module.exports = {
    InvalidEmail
};