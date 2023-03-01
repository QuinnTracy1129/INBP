module.exports = ({ ascendUseCase }) =>
  async function (httpRequest) {
    return ascendUseCase(httpRequest);
  };
