/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	//index actions
	
	index: function(req,res){
		return res.view();
	},

	sendingNotification: function(req,res){
		Notification.find({sendingUser: req.session.User.id}).exec(function(err,notifications){
			if(err) return res.negotiate(err);
			return res.view({
				notifications: notifications
			});
		})
		
	},

	recivingNotification: function(req,res){
		Notification.find({recivingUser: req.session.User.id}).exec(function(err,notifications){
			if(err) return res.negotiate(err);
			return res.view({
				notifications: notifications
			});
		})	
	},

	//create actions
	requestToBeProfesor: function(req,res){
		Subject.findOne(req.param('id')).exec(function(err,usr){
			if (err) return res.negotiate(err);
			
			notificationObject = {
				title: "El usuario " + req.session.User.name +" "+ req.session.User.lastname + " envio una solicitud para ser Profesor",
				sendingUser: req.session.User.id,
				recivingUser: usr.creator,
				method: "profesor/create/"+req.session.User.id,
				params: req.param('id')
			}

			Notification.create(notificationObject).exec(function(err,not){
				if (err) return res.negotiate(err);
				//return res.json(not);
				return res.redirect('student/home');
			})
		})
	},

	acceptRequest: function(req,res){
		
		notificationObject = {
			title: "El usuario " + req.session.User.name +" "+ req.session.User.lastname + "Acepto la solicitud. Ahora eres profesor.",
			sendingUser: req.session.User.id,
			recivingUser: req.param('sendingUser'),
			state: "approved"
		}
		notUpd= {
			state: "approved"
		}
		profesorObj= {
			user_id: req.param('sendingUser'),
			subject_in: req.param('subject_in'),
			title: "Arquitecto"
		}
		updateData = {
			teach: true,
			study: false
		}


		Notification.update({id: req.param('id')}, notUpd).exec(function(err, updated){
			if (err) return res.negotiate(err);
			console.log("actualizacion creada con exito: " + updated.state);
			Notification.create(notificationObject).exec(function(err,acp){
				if (err) return res.negotiate(err);
				console.log("notificacion creada con exito: " + acp);

				User.update({id: req.param('sendingUser')}, updateData).exec(function(err,user){
					if(err) res.negotiate(err);
					
					Profesor.create(profesorObj).exec(function(err,profesor){
						if (err) {
							return res.negotiate(err)
						} Student.destroy({subject_id: req.param('subject_in')}).where({user_id: req.param('sendingUser')}).exec(function(err,std){
		        			if (err) return res.negotiate(err);
					        if (!std) return res.redirect("/");
							console.log("Se elimino el estudiante");
							return res.json(profesor);
		    			});	
					});
				});
			})
		})
	},

	declineRequest: function(req,res){
		notificationObject = {
			title: "El usuario " + req.session.User.name +" "+ req.session.User.lastname + "Rechazo la solicitud",
			sendingUser: req.session.User.id,
			recivingUser: req.param('sendingUser'),
			state: "denied"
		}

		notUpd= {
			state: "denied"
		}

		Notification.update({id: req.param('id')}, notUpd).exec(function(err, updated){
			if (err) return res.negotiate(err);
			Notification.create(notificationObject).exec(function(err,acp){
				if (err) return res.negotiate(err);
				console.log("notificacion creada con exito: " + acp);
				return res.json(acp);
			})
		})
	}
	
};

