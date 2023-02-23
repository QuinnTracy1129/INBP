module.exports = ({ archiveUseCase }) =>
  async function (httpRequest) {
    return archiveUseCase(httpRequest);
  };
