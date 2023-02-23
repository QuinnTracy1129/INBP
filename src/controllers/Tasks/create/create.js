const createController = ({ createUseCase }) =>
  async function (httpRequest) {
    return createUseCase(httpRequest);
  };

module.exports = createController;
