$(document).ready(function(){

	// Validate
	// http://bassistance.de/jquery-plugins/jquery-plugin-validation/
	// http://docs.jquery.com/Plugins/Validation/
	// http://docs.jquery.com/Plugins/Validation/validate#toptions

		$('#sign-up-form').validate({
	    rules: {

	      email: {
	        required: true,
	        email: true
	      },
	      password: {
	      	minlength: 6,
	        required: true
	      },
	      confirmation: {
	      	minlength: 6,
	      	equalTo: "#password"
	      },
	       name: {
	        required: true
	      },
	      lastname: {
	        required: true
	      }
	    },
			//success: function(element) {
			//	element
			//	.text('OK!').addClass('valid')
			//}
	  });

});