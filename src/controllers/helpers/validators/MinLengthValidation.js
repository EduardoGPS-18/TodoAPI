const { ControllerErrorsFactory } = require("../../errors/errors");

module.exports = (field, value, length) => {
    if(value.length < length) {
        const msgError = `Tamanho minimo do campo ${field} deve ser ${length} caracteres.`;
        ControllerErrorsFactory.minLengthError(msgError);
    }
}