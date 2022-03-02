const { ControllerErrorsFactory } = require("../../errors/errors");

module.exports = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!regex.test(email)) {
        ControllerErrorsFactory.invalidEmail('Email invalido!');
    }
}