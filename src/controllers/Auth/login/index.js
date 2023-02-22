const loginUseCase = require("../../../use-cases/Auth/login");

module.exports = require("./login")({ loginUseCase });
