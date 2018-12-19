/**
 * Profesor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //Cambiar a un campo relacionado con User.
  	user_id: {
  		model: "user"
  	},

  	subject_in: {
  		model: 'subject'
  	},

    project_in: {
      model: 'project'
    },

  	title: {
  		type: 'string'
  	}


  }
};

