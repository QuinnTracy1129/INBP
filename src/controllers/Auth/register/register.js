const registerController = ({ registerUseCase }) =>
  async function (httpRequest) {
    return registerUseCase(httpRequest);
  };

module.exports = registerController;
