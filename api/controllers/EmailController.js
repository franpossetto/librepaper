/**
 * EmailController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



	index: function(req,res){
		//Traigo los emails que enviò la catedra.
		Email.find({subject_mail: req.session.subject}).sort('createdAt DESC').populateAll().exec(function(err,emails){
			if (err){
				return res.negotiate(err);
			}
		
			//Traigo los estudiantes que estan en la catedra
			Student.find({subject_id: req.session.subject}).populateAll().exec(function(err,std){
				if (err){
					return res.negotiate(err);
				}	
					return res.view({
						students: std,
						emails: emails
					})
			})
		})

	},

	send: function(req,res){
		var mailList = [{

				email: req.param('email'),
				sub: req.param('sub'),
				content: req.param('content'),
				writer: req.session.User.id,
				from: req.session.subject

			}];

		Email.create({name: "email"}).exec(function(err,email){
			if(err) return res.negotiate(err);

			mailList.forEach(function(email){
				Mailer.sendWelcomeMail(email);  // <= Here we using 
			})
			res.json(200, {element: mailList});
		})
		
	},


	sendMultipleEmail: function(req,res){
		var mailList = [{

				email: req.param('emailMultiple'),
				sub: req.param('sub'),
				content: req.param('content'),
				writer: req.session.User.id,
				subject_mail: req.session.subject

			}];

		Email.create(mailList).exec(function(err,email){
			if(err) return res.negotiate(err);

			mailList.forEach(function(email){
				Mailer.sendMultipleEmail(email);  // <= Here we using 
			})
			return res.json(email);
		})
		
	},

	sendToUser: function(req,res){
		var mailList = [{
				email: req.param('emailMultiple'),
				sub: req.param('sub'),
				content: req.param('content'),
				writer: req.session.User.id,
				from: req.session.subject

			}];

		Email.create({name: "email"}).exec(function(err,email){
			if(err) return res.negotiate(err);

			mailList.forEach(function(email){
				Mailer.sendToUser(email);  // <= Here we using 
			})
			res.json(200, {element: mailList});
		})
		
	}
	
};

