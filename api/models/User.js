/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    emailsTo: {
      collection: 'email',
      via: 'writer'
    },

    subjects: {
      collection: 'subject',
      via: 'students'
    },

    projects: {
      collection:"project",
      via: "members",
      dominant: true
    },

  	email: {
    	type: 'email',
    	required: true,
    	unique: true
    },

    mat: {
      type: 'integer',
      required: true,
      unique: true
    },

    name: {
    	type: 'string',
    	required: true,
    },

    lastname: {
    	type: 'string',
    	required: true,
    },

    superuser: {
      type: 'boolean'
    },
    //aca estaba el eror mostro

    admin: {
      type: 'boolean'
    },

    //relation with profesor
    profesor: {
      collection: 'profesor',
      via: "user_id"
    },
    //write policies
    study: {
      type: 'boolean',
      defaultsTo: true
    },

    teach: {
        type: 'boolean'
    },

    student: {
      collection: "student",
      via: "user_id"
    },

    encryptedPassword: {
    	type: 'string'
    },

     toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.encryptedPassword;
      delete obj.confirmation;
      delete obj._csrf;
      return obj;
    }

  },

  
  beforeValidate: function (values, next) {



    if (typeof values.superuser !== 'undefined') {
      if (values.superuser === 'unchecked') {
        values.superuser = false;
      } else if (values.superuser[1] === 'on') {
        values.superuser = true;
      }
      else if (values.superuser === 'on') {
        values.superuser = true;
      }
    }


    if (typeof values.admin === 'undefined') {
      values.admin = false;
    } else if (values.admin === 'unchecked') {
        values.admin = false;
    } else if (values.admin[1] === 'on') {
        values.admin = true;
    } else if (values.admin === 'on') {
        values.admin = true;
    }

    if (typeof values.teach === 'undefined') {
      values.teach = false;
    } else if (values.teach === 'unchecked') {
        values.teach = false;
    } else if (values.teach[1] === 'on') {
        values.teach = true;
        
    } else if (values.teach === 'on') {
        values.teach = true;
    }
     next();
  },

  beforeCreate: function (values, next) {

    User.count().exec(function countCB(error, found) {
      if (found == 0) {
      values.superuser = true;
      }
   });

    // This checks to make sure the password and password confirmation match before creating record
    if (!values.password || values.password != values.confirmation) {
      return next({err: ["Password doesn't match password confirmation."]});
    }

    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      // values.online= true;
      next();
    });
  }

};

