$(document).ready(function() {

	// Check email
	$('.ac__cta--main').click(function(e) {
    var mail = $('.ac__mail--main').val();
    if ($.trim(mail).length === 0) {
      alert('Please enter valid email address');
      $('.ac__mail--main').addClass('border-is-red');
      e.preventDefault();
    }
    if (validateEmail(mail)) {
    	e.preventDefault();
    	$('.ac__form--success .ac__form').toggleClass('hidden');
    }
    else {
      alert('Invalid Email Address');
      $('.ac__mail--main').addClass('border-is-red');
      e.preventDefault();
    }
	});
	 function validateEmail(mail) {
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if (filter.test(mail)) {
	    return true;
	  } else {
	    return false;
	  }
	}​


	// Segment + Augur Hack
	$('.ac__mail--main').focusout(function() {
		var form = $('.ac__form');
		var mail = $('.ac__mail--main').val();
		var anoID = analytics.user().anonymousId();
		window.augurAPI = "http://api.augur.io/v2/user?key=ikxxvks77804a1n8a37dn0pt088q00qf&email="+mail;
		$.getJSON(augurAPI).done(function(data){
			console.log("got data");
			console.log(data.DEMOGRAPHICS.gender[0].score);
			console.log('begin identify 1');
			analytics.identify(''+ anoID +'', {
				email: mail
			});
			console.log('begin identify 2');
			properties = {
				email: mail,
				name: data.PRIVATE.name[0].value,
				gender: data.DEMOGRAPHICS.gender[0].value,
				location: data.GEOGRAPHICS.location[0].value,
				twitter: data.PROFILES.twitter_handle[0].value,
				linkedin: data.PROFILES.linkedin_handle[0].value
			};
			if (data.PRIVATE.bio !== undefined && data.PRIVATE.bio.length > 0) {
				properties.bioTwitter = data.PRIVATE.bio[0].value;
			}
			analytics.identify(''+ mail +'', properties);
			console.log('begin track');
			analytics.track('Registered for academy');	
			console.log('end');
		}).fail(function(){
			console.log('failed to get json from augur API');
		});
	});

	
	// Sticky form
	function sticky_relocate() {
	    var window_top = $(window).scrollTop();
	    var div_top = $('.ac__ctas-anchor').offset().top;
	    if (window_top > div_top) {
	        $('.ac__first-cta').addClass('stick');
	    } else {
	        $('.ac__first-cta').removeClass('stick');
	    }
	}
	$(function () {
	    $(window).scroll(sticky_relocate);
	    sticky_relocate();
	});

	// Get referrer and display different form
	window.onload = function () {
		console.log('test');
		function ref_adapt() {
			var referrer = document.referrer;
			var tw_referrer =  "twitter";
			var ggl_referrer =  "google";
			var fb_referrer =  "facebook";
			console.log('entered');
			console.log(referrer);
			if (referrer.indexOf(tw_referrer) > -1) {
				console.log('twitter');
			} else if (referrer.indexOf(ggl_referrer) > -1) {
				console.log('google');
			} else if (referrer.indexOf(fb_referrer) > -1) {
				console.log('facebook');
			} else {
				console.log('no-ref')
			}
		}
	}

});


