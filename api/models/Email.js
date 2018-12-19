/**
 * Email.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	email: {
  		type:'text'
  	},

  	writer: {
  		model: 'user'
  	},

  	subject_mail: {
  		model: 'subject'
  	},

  	content: {
  		type: 'string'
  	},

  	sub: {
  		type: 'string'
  	}

  }
};

