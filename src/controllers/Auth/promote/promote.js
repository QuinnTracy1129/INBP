module.exports = ({ promoteUseCase }) =>
  async function (httpRequest) {
    return promoteUseCase(httpRequest);
  };
