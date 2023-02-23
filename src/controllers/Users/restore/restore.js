module.exports = ({ restoreUseCase }) =>
  async function (httpRequest) {
    return restoreUseCase(httpRequest);
  };
