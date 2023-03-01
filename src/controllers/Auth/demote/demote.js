module.exports = ({ demoteUseCase }) =>
  async function (httpRequest) {
    return demoteUseCase(httpRequest);
  };
