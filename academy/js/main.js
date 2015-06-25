$(document).ready(function() {

var referrer = document.referrer;
var tw_referrer =  "twitter";
	
	// particlesJS.load(@dom-id, @path-json, @callback (optional)); */
	particlesJS.load('particles-js', '../academy/js/particles.json', function() {
	  console.log('callback - particles.js config loaded');
	});
	
	// Change input variable if mobile or desktop
	if ($('#ac__input-default').is(":visible")) {
		var input = $('#ac__input-default');
		console.log('ok def');
	} else if ($('#ac__input-mobile').is(":visible")) {
		var input = $('#ac__input-mobile');
		console.log('ok mob');
	}

	// Change form if Twitter referrer
	if (referrer.indexOf(tw_referrer) > -1) {
		$('#ac__input-default').attr("type", "text");
		$('#ac__input-default').attr("placeholder", "Your Twitter handle without @");
	}

	// Toggle form success
	$('.ac__form').submit(function(e){
	    e.preventDefault();
	    $('.ac__form-success').removeClass('hidden');
	    $('.ac__form-success').addClass('visible');
	    $('.ac__form').addClass('hidden');
	});

	// Segment + Augur Hack
	$('.ac__input').focusout(function() {
		if ( input.val().length > 0) {
			var form = $('.ac__form');
			var anoID = analytics.user().anonymousId();
			console.log(anoID);
			
			// Hack if ref is twitter && input !== empty
			if (referrer.indexOf(tw_referrer) > -1) {
				console.log('twitter, get augur for twitter');
				if ( input.val() !== "") {
					var twitter = input.val();
				} 
				window.augurAPI = "http://api.augur.io/v2/user?key=ikxxvks77804a1n8a37dn0pt088q00qf&twitter_handle="+twitter;
				$.getJSON(augurAPI).done(function(data){
					console.log("got twitter data");
					console.log('begin identify 1');
					analytics.identify(''+ anoID +'', {
						twitter: twitter
					});
					console.log('begin identify 2');
					properties = {
						email: null,
						name: null,
						gender: null,
						location: null,
						linkedin: null,
						title: null
					};
					
					// check if property exists in Augur
					if (data.DEMOGRAPHICS.gender !== undefined && data.DEMOGRAPHICS.gender.length > 0) {
						properties.gender = data.DEMOGRAPHICS.gender.name[0].value;
					}
					if (data.PRIVATE.name !== undefined && data.PRIVATE.name.length > 0) {
						properties.name = data.PRIVATE.name[0].value;
					}
					if (data.PRIVATE.email !== undefined && data.PRIVATE.email.length > 0) {
						properties.email = data.PRIVATE.email[0].value;
					}
					if (data.GEOGRAPHICS.location !== undefined && data.GEOGRAPHICS.location.length > 0) {
						properties.location = data.GEOGRAPHICS.location[0].value;
					}
					if (data.PROFILES.linkedin_handle !== undefined && data.PROFILES.linkedin_handle.length > 0) {
						properties.linkedin = data.PROFILES.linkedin_handle[0].value;
					}
					if (data.PRIVATE.description !== undefined && data.PRIVATE.description.length > 0) {
						properties.title = data.PRIVATE.description[0].value;
					}

					// identify
					analytics.identify(''+ twitter +'', properties);
					console.log('begin track');
					analytics.track('Registered for academy');	
					console.log('end');
				}).fail(function(){
					console.log('failed to get json from augur API');
				});
			
			// Hack if ref is everything else && input !== empty
			} else {
				console.log('no-ref, get augur for email');
				if ( input.val() !== "") {
					var mail = input.val();
				} 
				window.augurAPI = "http://api.augur.io/v2/user?key=ikxxvks77804a1n8a37dn0pt088q00qf&email="+mail;
				$.getJSON(augurAPI).done(function(data){
					console.log("got mail data");
					console.log('begin identify 1');
					analytics.identify(''+ anoID +'', {
						email: mail
					});
					console.log('begin identify 2');
					properties = {
						email: mail,
						name: null,
						gender: null,
						location: null,
						twitter: null,
						linkedin: null,
						title: null
					};
					
					// check if property exists in Augur
					if (data.DEMOGRAPHICS.gender !== undefined && data.DEMOGRAPHICS.gender.length > 0) {
						properties.gender = data.DEMOGRAPHICS.gender[0].value;
					}
					if (data.PRIVATE.name !== undefined && data.PRIVATE.name.length > 0) {
						properties.name = data.PRIVATE.name[0].value;
					}
					if (data.PROFILES.twitter_handle !== undefined && data.PROFILES.twitter_handle.length > 0) {
						properties.twitter = data.PROFILES.twitter_handle[0].value;
					}
					if (data.GEOGRAPHICS.location !== undefined && data.GEOGRAPHICS.location.length > 0) {
						properties.location = data.GEOGRAPHICS.location[0].value;
					}
					if (data.PROFILES.linkedin_handle !== undefined && data.PROFILES.linkedin_handle.length > 0) {
						properties.linkedin = data.PROFILES.linkedin_handle[0].value;
					}
					if (data.PRIVATE.description !== undefined && data.PRIVATE.description.length > 0) {
						properties.title = data.PRIVATE.description[0].value;
					}

					// identify
					analytics.identify(''+ mail +'', properties);
					console.log('begin track');
					analytics.track('Registered for academy');	
					console.log('end');
				}).fail(function(){
					console.log('failed to get json from augur API');
				});
			}
		}
	});

});


