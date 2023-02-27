module.exports = ({ submitUseCase }) =>
  async function (httpRequest) {
    return submitUseCase(httpRequest);
  };
