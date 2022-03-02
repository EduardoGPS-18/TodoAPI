const { ControllerErrorsFactory } = require('../../errors/errors');

module.exports = {
    ContainsKeyInObjectOrThrow(object, values = []) {
        const missingKeys = [];
        for(const key of values) {
        if(Object.keys(object).includes(key)) {
                continue;
            }
            missingKeys.push(`${key}`);   
        }
        if(missingKeys.length > 0) {
            throw ControllerErrorsFactory.missingKeys(
                `Está faltando parâmetros: [${missingKeys.join(', ')}]`,
            );
        }
    }
}