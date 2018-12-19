module.exports = function (req, res, ok) {
  
  // User is allowed, proceed to controller
  if (req.session.User && req.session.User.superuser) {
    return ok();
  }

  if (req.session.User && !req.session.User.superuser){
    return res.redirect('/');
  }

  // User is not allowed
  else {
  	var requireSuperuserError = [{name: 'requireSuperuserError', message: 'You must be an admin.'}]
		req.session.flash = {
			err: requireSuperuserError
		}
    res.redirect('/session/new');
    return;
  }
};