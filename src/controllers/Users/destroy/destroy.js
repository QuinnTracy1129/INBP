module.exports = ({ destroyUseCase }) =>
  async function (httpRequest) {
    return destroyUseCase(httpRequest);
  };
