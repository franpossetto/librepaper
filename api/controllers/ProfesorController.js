/**
 * ProfesorController
 *
 * @description :: Server-side logic for managing Profesors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	home: function(req,res){
		//Muestro las a las que el user pertenece
		Profesor.find({user_id: req.session.User.id }).populateAll().exec(function(err,sub){
			if(err){
				return res.negotiate(err);
			} 
			return res.view({
				subject:sub
				})

		})
	},


	index: function(req,res){
		Profesor.find({subject_in: req.session.subject}).populateAll().exec(function(err,profesor){
	        if (err) return next(err);
	        if (!profesor) return next();
	        return res.view({
							profesor: profesor	
	 					})
		 		       
	    });
	},

	new: function (req,res){
		Student.find({subject_id: req.session.subject}).populateAll().exec(function(err,std){
	        if (err) return res.negotiate(err);
	        if (!std) return res.redirect("/");
	        return res.view({
				student: std	
				})
	    });	
	},

	create: function(req,res){

		profesorObj={
			user_id: req.param("id"),
			subject_in: req.session.subject,
			title: "Arquitecto"
		}

		updateData = {
			teach: true,
			study: false
		}

		User.update({id: req.param("id")}, updateData).exec(function(err,user){
			if(err) res.negotiate(err);
			Profesor.create(profesorObj).exec(function(err,profesor){
				if (err) {
					return res.negotiate(err)
				} 	
				Student.destroy({subject_id: req.session.subject}).where({user_id: req.param("id")}).exec(function(err,std){
        			if (err) return res.negotiate(err);
			        if (!std) return res.redirect("/");
					console.log("Se elimino el estudiante");
					return res.json(profesor);
    			});	

			});
		});
	},
	
	destroy: function(req,res){
		Profesor.findOne(req.param('id'), function profesorUser(err, profesor) {
	      if (err) return next(err);
	      if (!profesor) return next('User doesn\'t exist.');
	      Profesor.destroy(req.param('id'), function profesorDestroyed(err) {
	        if (err) return next(err);
	      	res.redirect('/profesor');
	      });
	    });	
	},

	change: function(req,res){
		updateData = {
			teach: false,
			study: true
		}

		User.update({id: req.session.User.id}, updateData).exec(function(err,user){
			if(err) res.negotiate(err);				
			return res.json(user);
		});
	}
};

