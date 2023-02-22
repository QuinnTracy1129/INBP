const loginController = ({ loginUseCase }) =>
  async function (httpRequest) {
    return loginUseCase(httpRequest);
  };

module.exports = loginController;
