module.exports = ({ loginUseCase }) =>
  async function (httpRequest) {
    return loginUseCase(httpRequest);
  };
