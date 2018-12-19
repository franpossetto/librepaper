/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {

  
  // User is allowed, proceed to controller
  if (req.session.User && req.session.User.study) {
    return ok();
  }

  if (req.session.User && !req.session.User.study){
    return res.redirect('/');
  }

  // User is not allowed
  else {
  	
    res.redirect('/session/new');
    return;
  }
};