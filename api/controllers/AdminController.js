/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

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

	getStudents: function(req,res){
		Student.find({subject_id: req.session.subject}).populateAll().exec(function(err,std){
			if (err){
				return res.negotiate(err);
			}	console.log("students: " + std);
				return res.view({
					students: std
				})
		})
	},

	home: function(req,res){

		req.session.subject= req.param('id');
		Subject.findOne({id: req.param('id')}).exec(function(err, sbj){
			if (err){
				return res.negotiate(err);
			}	
		
		console.log("variable: " + req.session.subject); 
			return res.view({
				subject: sbj
			});
		})		
	},

	config: function(req,res){
		res.view();
	} 
	
};

