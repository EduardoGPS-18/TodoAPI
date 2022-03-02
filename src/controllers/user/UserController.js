const { EmailValidation, MinLengthValidation } = require("../helpers/validators/validations");

const { DuplicatedDataError, InvalidUserError } = require('../../model/errors/errors');
const { ContainsKeyInObjectOrThrow } = require("../helpers/methods/ContainsKeyInObjectOrThrow");
const { MissingKeysInObjectError } = require("../errors/custom-errors/MissingKeysInObjectError");

const { UserView } = require("../../view/user/UserView");

const { InvalidEmail, MinLengthError } = require("../errors/errors");

const UserModel = require("../../model/user/UserModel");

module.exports = {
    async handleRegister(registerParams) {
        try {
            ContainsKeyInObjectOrThrow(registerParams, ['name', 'email', 'password']);
            const { email, password } = registerParams;
            EmailValidation(email);
            MinLengthValidation('password', password, 7);
            const user = await UserModel.register(registerParams);
            return UserView(user);
        } catch(err) {
            console.log(`LOGGER (USER CONTROLLER @REGISTER): ${err.message}`);
            if(err instanceof MissingKeysInObjectError || err instanceof DuplicatedDataError) {
                throw { status: 400, error: err.message };
            } else if(err instanceof InvalidEmail || err instanceof MinLengthError) {
                throw { status: 400, error: err.message };
            } else {
                throw { status: 500 };
            }
        }
    },

    async handleLogin(loginParams) {
        try {
            ContainsKeyInObjectOrThrow(loginParams, ['email', 'password']);
            const user = await UserModel.login(loginParams);
            return UserView(user);
        } catch(err) {
            console.log(`LOGGER (USER CONTROLLER @LOGIN): ${err.message}`);
            if(err instanceof MissingKeysInObjectError || err instanceof InvalidUserError) {
                throw { status: 400, error: err.message };
            } else {
                throw { status: 500 };
            }
        }
    },

    async handleVerifyAuthorization(verifyAuthorizationParams) {
        try {
            ContainsKeyInObjectOrThrow(verifyAuthorizationParams, ['authorization']);
            try {
                const token = verifyAuthorizationParams.authorization.split(' ')[1];
                return await UserModel.verifyAuth({ token });
            } catch(err) {
                throw Error();
            }
        } catch(err) {
            console.log(`LOGGER (USER CONTROLLER @HANDLE VERIFY AUTHORIZATION): ${err.message}`);
            throw { status: 401 };
        }
    },

}