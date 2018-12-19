module.exports.sendWelcomeMail = function(obj) {
 sails.hooks.email.send("welcomeEmail", 
 	{ Name: "req.session.User.name", 
	  content: obj.content
 	},
 	{ to: obj.email,
	  subject: obj.subject
 	},
 	function(err) {
 		console.log(err || "Mail Sent!"); 
 		console.log("obj.email: " + obj);}
 )
},

module.exports.sendToUser = function(obj) {
 sails.hooks.email.send("sendToUser", 
 	{ Name: "req.session.User.name", 
	  content: obj.content
 	},
 	{ to: obj.email,
	  subject: obj.subject
 	},
 	function(err) {
 		console.log(err || "Mail Sent!"); 
 		console.log("obj.email: " + obj);}
 )
}

,

module.exports.sendMultipleEmail = function(obj) {
 sails.hooks.email.send("sendMultipleEmail", 
 	{ Name: "req.session.User.name", 
	  content: obj.content
 	},
 	{ to: obj.email,
	  subject: obj.sub
 	},
 	function(err) {
 		console.log(err || "Mail Sent!"); 
 		console.log("obj.email: " + obj);}
 )
}
