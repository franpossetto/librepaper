/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nestedPop = require('nested-pop');

module.exports = {

	new: function(req,res){
		res.view();
	},

	create: function(req,res){
   
		User.create( req.params.all(), function userCreated(err,user){
			if(err) {
				console.log(err);
				req.session.flash = {
					err: err
				}
				return res.redirect('user/new');
			}

      req.session.authenticated=true;
      req.session.User=user;

      
			//return res.json(user);
			//return res.redirect('/user/show/'+user.id);
      return res.redirect('/');
		})
	},

  show: function(req, res, next) {
       User.findOne({id: req.session.User.id}).populateAll().exec(function prjFound(err, user){
        if (err) return next(err);
        if (!user) return next();
        console.log(user);
        req.session.User = user;
        res.view({
            user: user
        });
    });
  },


  index: function(req, res, next) {

    // Get an array of all users in the User collection(e.g. table)
    User.find(function foundUsers(err, users) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        users: users
      });
    });
  },

   // render the edit view (e.g. /views/edit.ejs)
  edit: function(req, res, next) {
    // Find the user from the id passed in via params
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next('User doesn\'t exist.');

      res.view({
        user: user
      });
    });
  },

    // process the info from edit view
  update: function(req, res, next) {

    User.update(req.param('id'), req.params.all(), function userUpdated(err) {
      if (err) {
        return res.redirect('/user/edit/' + req.param('id'));
      }
        res.redirect('/user/show/' + req.param('id'));
    });

  },

  destroy: function(req, res, next) {

    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);

      if (!user) return next('User doesn\'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return next(err);

      res.redirect('/user');

    	});
    });
  }
	


};

