class InexistentDataError extends Error {
    constructor(message) {
        super(message);
    }
}
module.exports = {
    InexistentDataError
};