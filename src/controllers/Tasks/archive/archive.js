const archiveController = ({ archiveUseCase }) =>
  async function (httpRequest) {
    return archiveUseCase(httpRequest);
  };

module.exports = archiveController;
