module.exports = controller => (req, res) =>
  controller({
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  })
    .then(httpResponse =>
      res.status(httpResponse.statusCode).json(httpResponse)
    )
    .catch(err => res.status(500).json(err));
