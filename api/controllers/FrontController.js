/**
 * FrontController
 *
 * @description :: Server-side logic for managing fronts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	homepage: function(req,res){
		if(req.session.authenticated) {
			if(req.session.User.admin){
				res.redirect('/admin/index');
			} else if(req.session.User.teach) {
				res.redirect('profesor/home');
			} else {
				res.redirect('student/home');
			}
		} else {
			res.redirect('session/new');
		}
	}



	

	
	
};

