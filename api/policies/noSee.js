/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {

  // User is allowed, proceed to controller
  if (req.session.authenticated) {
	return res.redirect('/');  }

};