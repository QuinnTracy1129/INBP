module.exports = ({ registerUseCase }) =>
  async function (httpRequest) {
    return registerUseCase(httpRequest);
  };
