const destroyController = ({ destroyUseCase }) =>
  async function (httpRequest) {
    return destroyUseCase(httpRequest);
  };

module.exports = destroyController;
