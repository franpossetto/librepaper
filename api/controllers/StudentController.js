/**
 * StudentController
 *
 * @description :: Server-side logic for managing Students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	home: function(req,res){
	//Muestro las a las que el user pertenece
		Student.find({user_id: req.session.User.id }).populateAll().exec(function(err,sub){
			if(err){
				return res.negotiate(err);
			} 
			return res.view({
				subject:sub
				})
		})
	},


	create: function(req,res){
	
		var studentObj={
			user_id: req.session.User.id,
			subject_id: req.param('id')
		}

		Student.findOne(studentObj).exec(function(err,exist){
			if(err){
				console.log("Error");
				return res.negotiate(err);
			}
			if(!exist){
				console.log("No existe el usuario, entonces lo creo");
				Student.create(studentObj).exec(function(err,student){
					if(err){
						return res.negotiate(err);
					}	console.log("Se creo perfecto ;)");

				})

			}
			console.log("Existe, asi que vallase al home");
			return res.redirect('/admin/search');			
		})

	},


	destroy: function(req,res){
		Student.findOne(req.param('id'), function studentUser(err, student) {
	      if (err) return next(err);
	      if (!student) return next('User doesn\'t exist.');
	      Student.destroy(req.param('id'), function studentDestroyed(err) {
	        if (err) return next(err);
	      	res.redirect('/admin/getStudents');
	      });
	    });	
	}
		
};

