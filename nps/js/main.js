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
		var anoID = analytics.user().anonymousId();
		window.augurAPI = "http://api.augur.io/v2/user?key=ikxxvks77804a1n8a37dn0pt088q00qf&email="+sEmail;
		$.getJSON(augurAPI).done(function(data){
			console.log("got data");
			console.log(data);
			console.log('begin identify 1');
			analytics.identify(''+ anoID +'', {
				email: sEmail
			});
			console.log('begin identify 2');
			properties = {
			  name: data.PRIVATE.name,
			  gender: data.DEMOGRAPHICS.gender,
			  city: data.GEOGRAPHICS.location_city,
			  country: data.GEOGRAPHICS.location_country,
			  twitter: data.PROFILES.twitter_handle,
			  bioTwitter: null,
			  linkedin: data.PROFILES.linkedin_handle
			};
			if (data.PRIVATE.bio !== undefined && data.PRIVATE.bio.length > 0) {
				properties.bioTwitter = data.PRIVATE.bio[0].value;
			}
			analytics.identify(''+ sEmail +'', properties);
			console.log('begin track');
			analytics.track('Registered for ebook', { 
				ebook: 'NPS'
			});	
			console.log('end');
		}).fail(function(){
			console.log('failed to get json from augur API');
		});
	});
});
