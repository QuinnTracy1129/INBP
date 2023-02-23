const findController = ({ findUseCase }) =>
  async function (httpRequest) {
    return findUseCase(httpRequest);
  };

module.exports = findController;
