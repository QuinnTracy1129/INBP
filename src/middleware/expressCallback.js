const ExpressCallback = controller => {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    controller(httpRequest)
      .then(httpResponse => res.json(httpResponse))
      .catch(err => res.status(500).json(err));
  };
};

module.exports = ExpressCallback;
