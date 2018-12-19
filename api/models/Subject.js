/**
 * Subject.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	name: {
  		type: "string"
  	},

    creator: {
      type: 'string' 
    },

    //tabla relacion muchos a muchos con topic
    tag: {
      collection: "topic",
      via: "subjects"
    },

    //tabla relacion muchos a muchos con user
  	users: {
  	  collection: "user",
      via: "subjects"
  	},

    //tabla relacion uno a muchos con profesor
    profesors: {
      collection: 'profesor',
      via: "subject_in"
    },
    
    //tabla relacion uno a muchos con project
	  projects: {
		  collection: "project",
		  via: "subject_id"
  	},  

    students: {
      collection: 'student',
      via: 'subject_id'  
    },

    emails: {
      collection: 'email',
      via: 'subject_mail'
    }

  }
};

