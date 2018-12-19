module.exports = function (req, res, ok) {

  // User is allowed, proceed to controller
  if (req.session.User) {
    return ok();
  }

  // User is not allowed
  else {
  	var requireAdminError = [{name: 'requireAdminError', message: 'You must be log in.'}]
		req.session.flash = {
			err: requireAdminError
		}
    res.redirect('/session/new');
    return;
  }
};