/**
 * ProjectController
 *
 * @description :: Server-side logic for managing Projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	new: function(req,res){
		Student.find({user_id: req.session.User.id}).populateAll().exec(function (err, students) {
			if (err) {
			    return res.serverError(err);
  			} return res.view({
						student:students
					})
		})
	},

	index: function(req,res){

		if(!req.session.User.admin){
			console.log("soyusuarioComun");
		var sql_query = 'select p.name, p.id from project p INNER JOIN  project_members__user_projects pmup ON p.id = pmup.project_members INNER JOIN "user" u ON u.id = pmup.user_projects where u.id = ' + req.session.User.id;
		
		Project.query(sql_query, function(err, prj){
			if (err) res.negotiate(err);
			res.view({
				project: prj.rows
			});
		})
		} else {
			console.log("soy admin")
			Project.find().populateAll().exec(function(err,prj){
			if (err) res.negotiate(err);
		 		console.log(prj);
		 		res.view({
	 				project: prj
				});
	 		})

		}
	},

	 show: function(req, res, next) {
      Project.findOne({id: req.param('id')}).populateAll().exec(function prjFound(err, prj){
      if (err) return next(err);
      if (!prj) return next();
      console.log(prj);
      res.view({
          project: prj
      });
    });

  },

  edit: function(req, res, next) {

    // Find the user from the id passed in via params
    Project.findOne({id: req.param('id')}).populateAll().exec(function prFound(err, pr) {
      if (err) return next(err);
      if (!pr) return next('Project doesn\'t exist.');

      res.view({
        project: pr
      });
    });
  },

    // process the info from edit view
  update: function(req, res, next) {

    Project.update(req.param('id'), req.params.all(), function prUpdated(err) {
      if (err) {
        return res.redirect('/project/edit/' + req.param('id'));
      }

      return res.redirect('/project/show/' + req.param('id'));
    });
  },


  destroy: function(req, res, next) {

    Project.findOne({id: req.param('id')}).exec(function foundPr(err, pr) {
      if (err) return next(err);
      if (!pr) return next('Project doesn\'t exist.');

      Project.destroy({id: req.param('id')}).exec(function ProjectDestroyed(err) {
        if (err) return next(err);

      res.redirect('/project');

    	});
    });
  },
	

	join: function(req,res,next){
		Project.findOne({id: 1}).exec(function(err,project){
			if(err) return err;
			project.members.add(req.session.User);
			project.save();
			return res.ok();
		})

	},

	create: function(req,res){
	
		projectObj = {
			name: req.param('name'),
			creator: req.session.User.name,
			creator_id: req.session.User.id,
			members: req.session.User.id,
			subject_id: req.param('subjectSelected')
		}

		Project.create( projectObj, function projectCreated(err,project){
			if(err) {
				console.log(err);
				req.session.flash = {
					err: err
				}
				return res.redirect('project/new');
			}   return res.redirect('/project/step2/' + project.id);
			
		})	
	},

	//Cargo los datos que faltan.
	step2: function(req,res){
		Project.findOne({id: req.param('id')}).exec(function(err,prj){
			if (err){
				return res.negotiate(err)
			}	

			Subject.findOne({id: prj.subject_id}).populateAll().exec(function(err,subject){
				if (err){
					return res.negotiate(err)
				} 	
				if (!subject){
					return res.redirect("/");
				}
					Profesor.find({subject_in: prj.subject_id}).populateAll().exec(function(err,profesor){
						if (err){
							return res.negotiate(err)
						} return res.view({
							project: prj,
							subject: subject,
							profesor: profesor
					});
				})
			
			})
		})
	},

	//Actualizo los datos. Termino de crear el objeto.
	step3: function(req,res){
		console.log("project.id: "+ req.param('id'));
		console.log('primero if');

		if(!req.param('profesor') && !req.param('topic')){
			return res.redirect('/');
		} 

		if(!req.param('profesor') && req.param('topic')){
			console.log('segundo if');
			Project.update(req.param('id'), {topics: req.param('topic')}, function projectCreated(err) {
	      		if (err) {
	      			console.log(err);
	        		return res.redirect('/project/step2/'+req.param('id'));
	      		}
	      		res.redirect('/project');
	    	});
		}

		if(!req.param('topic') && req.param('profesor')){
			console.log('tercer if');
			Project.update(req.param('id'), {profesor: req.param('profesor')}, function projectCreated(err) {
	      		if (err) {
	      			console.log(err);
	        		return res.redirect('/project/step2/'+req.param('id'));
	      		}
	      		res.redirect('/project');
	    	});
		}	

	},

	destroy: function(req, res, next) {
	    Profesor.findOne(req.param('id'), function foundProfesor(err, profesor) {
	      if (err) return next(err);

	      if (!profesor) return next('Profesor doesn\'t exist.');

	      Profesor.destroy(req.param('id'), function ProfesorDestroyed(err) {
	        if (err) return next(err);

	      res.redirect('/profesor');

	    	});
	    });
	}



	
};

