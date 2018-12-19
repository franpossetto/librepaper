/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	name: {
  		type: "string"
  	},

    //tabla relacion muchos a muchos con topic
  	topics: {
  		collection: "topic",
  		via: "projects"
  	},

    profesor: {
      collection: 'profesor',
      via:'project_in'
    },

    creator: {
      type: 'string' 
    },

    //tabla relacion muchos a muchos con user
  	members: {
  		collection: "user",
      via: "projects"
  	},

    //tabla relacion muchos a muchos con content
  	content: {
  		collection: "content",
  		via: "projectData"
  	},

    //tabla relacion a a muchos con subject
    subject_id: {
      model: 'subject'
    }

  }
};

