// no links exist for this, but redirect just in case
exports.getLogout = (req, res, next) => {
  res.redirect('/');
};

// POST request for logging out
exports.postLogout = (req, res, next) => {
  if (req.user) {
    req.logOut((err) => {
      if (err) {
        next(err);
      }
    });
  }
  res.redirect('/');
};
