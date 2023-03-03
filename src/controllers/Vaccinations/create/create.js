module.exports = ({ createUseCase }) =>
  async function (httpRequest) {
    return createUseCase(httpRequest);
  };
