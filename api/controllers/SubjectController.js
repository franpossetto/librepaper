/**
 * SubjectController
 *
 * @description :: Server-side logic for managing Subjects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	new: function(req,res){
		res.view();
	},

	create: function(req,res){

		var subjectObj = {
			name: req.param('name'),
			creator: req.session.User.id
		}

		Subject.create(subjectObj, function subjectCreated(err,sub){
			if (err) {
				return res.negotiate(err);
			} console.log("subject creada: " + sub);
    			return res.redirect('/admin/index');

		});
	},
	
	index: function(req,res){
		//Muestro los proyectos que el admin creò.
		Subject.find({creator: req.session.User.id}).exec(function(err,sub){
			if(err){
				return res.negotiate(err);
			} return res.view({
				subject:sub
			})

		})
	},

	search: function(req,res){
		//Muestro los proyectos que el admin creò.
		Subject.find().exec(function(err,sub){
			if(err){
				return res.negotiate(err);
			} return res.view({
				subject:sub
			})

		})
	},

	show: function(req, res, next) {
	    Subject.findOne({id: req.param('id')}).populateAll().exec(function(err,subject){
	        if (err) return next(err);
	        if (!subject) return next();
	        Student.find({subject_id: subject.id}).populate("user_id").exec(function(err,std){
				if (err){
					return res.negotiate(err);
				}	console.log("students: " + std);
		        return res.view({
								subject: subject,
								students: std	
		 					})
	        })
		 		       
	    });
  	},


	//Me uno a una catedra.
	join: function(req,res){
	 	Subject.findOne({id: req.param('id')}).exec(function(err,subject){
			if(err) return err;
			subject.students.add(req.session.User);
			subject.save();
			return res.ok();
		})
	},

	//Destruir tambien a los usuarios.
	destroy: function(req,res){
		Subject.findOne({id:req.param('id')}).populateAll().exec(function(err, sbj) {
      		if (err) return next(err);
		    if (!sbj) return next('Subject doesn\'t exist.');
	      	Subject.destroy(req.param('id'), function sbjDestroyed(err) {
	        	if (err) return next(err);
	      		res.redirect('/admin/index');
      		});
      	});	
	}
	
};

