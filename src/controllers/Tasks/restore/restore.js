const restoreController = ({ restoreUseCase }) =>
  async function (httpRequest) {
    return restoreUseCase(httpRequest);
  };

module.exports = restoreController;
