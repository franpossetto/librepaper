/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {

  
  // User is allowed, proceed to controller
  if (req.session.User && req.session.User.teach) {
    return ok();
  }

  if (req.session.User && !req.session.User.teach){
    return res.redirect('/');
  }

  // User is not allowed
  else {
  	var requireTeachError = [{name: 'requireTeacherError', message: 'You must be an teacher.'}]
		req.session.flash = {
			err: requireTeachError
		}
    res.redirect('/session/new');
    return;
  }
};