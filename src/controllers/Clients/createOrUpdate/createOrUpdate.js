module.exports = ({ createOrUpdateUseCase }) =>
  async function (httpRequest) {
    return createOrUpdateUseCase(httpRequest);
  };
