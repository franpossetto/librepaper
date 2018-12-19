/**
 * SuperuserController
 *
 * @description :: Server-side logic for managing superusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req,res){
		User.findOne(req.param('id')).exec(function(err, user){
			if(err) {
				return res.negotiate(err);
			}
			if(!user){
				return res.redirect("/");
			}
			User.update(req.param('id'), req.params.all(), function userUpdated(err) {
		      if (err) {
		        return res.redirect('/user/edit/' + req.param('id'));
		      } res.redirect('/user/show/' + req.param('id'));	    
		    });
		});
	},

	newUser: function(req,res){
		res.view();
	},

	createUser: function(req,res){
		userObj = {
			mat: req.param('mat'),
			name: req.param('name'),
			lastname: req.param('lastname'),
			email: req.param('name')+"@"+req.param('mat')+".com",
			password: "libre.2017",
			confirmation: "libre.2017"
		}

		User.create(userObj, function usrCreated (err, usr){
			if(err) return res.negotiate(err);
			console.log("Usuario creado con los siguientes datos: " + usr);
			return res.redirect('/');
		})
	},

	
};

