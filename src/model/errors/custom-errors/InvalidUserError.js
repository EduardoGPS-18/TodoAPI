class InvalidUserError extends Error {
    constructor(message) {
        super(message);
    }
}
module.exports = {
    InvalidUserError
};