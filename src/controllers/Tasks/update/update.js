module.exports = ({ updateUseCase }) =>
  async function (httpRequest) {
    return updateUseCase(httpRequest);
  };
