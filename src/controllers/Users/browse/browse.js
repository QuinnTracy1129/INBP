const browseController = ({ browseUseCase }) =>
  async function (httpRequest) {
    return browseUseCase(httpRequest);
  };

module.exports = browseController;
