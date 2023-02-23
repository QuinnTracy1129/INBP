const updateController = ({ updateUseCase }) =>
  async function (httpRequest) {
    return updateUseCase(httpRequest);
  };

module.exports = updateController;
