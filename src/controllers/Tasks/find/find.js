module.exports = ({ findUseCase }) =>
  async function (httpRequest) {
    return findUseCase(httpRequest);
  };
