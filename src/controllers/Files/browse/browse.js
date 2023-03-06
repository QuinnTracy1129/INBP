module.exports = ({ browseUseCase }) =>
  async function (httpRequest) {
    return browseUseCase(httpRequest);
  };
