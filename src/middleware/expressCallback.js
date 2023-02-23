module.exports = controller => (req, res) =>
  controller({
    body: req.body,
    params: req.params,
    query: req.query,
  })
    .then(httpResponse => {
      if (httpResponse.statusCode) {
        res.status(httpResponse.statusCode).json(httpResponse);
      } else {
        res.json(httpResponse);
      }
    })
    .catch(err => res.status(500).json(err));
