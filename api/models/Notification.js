/**
 * Notification.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	title: {
  		type: "string"
  	},

  	sendingUser: {
  		type: "string"
  	},

  	recivingUser: {
  		type: "string"
  	},

  	method: {
  		type: "string"
  	}, 

    params: {
      type: "string"
    },

    state: {
      type: 'string',
      enum: ['pending', 'approved', 'denied'],
      defaultsTo: 'pending'
    }

  }
};

