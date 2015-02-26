$(document).ready(function() {
	$('.men-form-btn').click(function(e) {
    var sEmail = $('.men-form-input').val();
    if ($.trim(sEmail).length === 0) {
      alert('Please enter valid email address');
      e.preventDefault();
    }
    if (validateEmail(sEmail)) {
    	e.preventDefault();
    	$('.men-form').addClass('hidden');
    	$('.men-form-success').removeClass('hidden');
    	$('.men-form-success').addClass('visible');
    }
    else {
      alert('Invalid Email Address');
      e.preventDefault();
    }
	});
  function validateEmail(sEmail) {
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if (filter.test(sEmail)) {
	    return true;
	  } else {
	    return false;
	  }
	}​
	$('.men-form-input').focusout(function() {
		var form = $('.men-form');
		var sEmail = $('.men-form-input').val();
		window.augurAPI = "http://api.augur.io/v2/user?key=ikxxvks77804a1n8a37dn0pt088q00qf&email="+sEmail;
		$.getJSON(augurAPI).done(function(data){
			console.log("success: we have to parse data");
			console.log(data);
			var anoID = analytics.user().anonymousId();
			analytics.identify(''+ anoID +'', {
				email: sEmail
			});
			analytics.identify(''+ sEmail +'', {
			  name: data.PRIVATE.name,
			  gender: data.DEMOGRAPHICS.gender,
			  city: data.GEOGRAPHICS.location_city,
			  country: data.GEOGRAPHICS.location_country,
			  twitter: data.PROFILES.twitter_handle,
			  bioTwitter: data.PRIVATE.bio[0].value,
			  linkedin: data.PROFILES.linkedin_handle
			});
		}).fail(function(){
			console.log('failed to get json from augur API');
		});
		analytics.track('Registered for ebook', {
  			ebook: 'NPS'
			}, {
  			anonymousId: ''+ anoID +''
		});	
	});
});
