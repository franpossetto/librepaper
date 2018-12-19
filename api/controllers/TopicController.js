/**
 * TopicController
 *
 * @description :: Server-side logic for managing Topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new: function(req,res){
		res.view();
	},

	create: function(req,res){
		Topic.create({name: req.param('name')}).exec(function(err,topic){
			if(err){
				return res.negotiate(err);
			}	
			Topic.findOne({id: topic.id}).exec(function(err,tag){
				console.log("entro en topic");
				tag.subjects.add({id: req.session.subject});
				tag.save();
				return res.redirect('/topic');
			})
		})
	},

	index: function(req,res){
		Subject.findOne({id: req.session.subject}).populate('tag').exec(function (err, topics) {
			if (err) {
			    return res.serverError(err);
  			}
  			sails.log('Wow, :', topics.length, topics);
  			return res.view({
  				topics:topics
  			});
		});
	}
	
};

