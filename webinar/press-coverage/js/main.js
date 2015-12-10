/*
This is the main JS file for the webinar page
Here we handle the :
- Registration
- The popup
- The tracking
*/

/*
Here we will set the SegmentID and add the demo select
*/

var isAnonymous;
var segmentID;

analytics.ready(function() {
	segmentID = analytics.user().id();
	if (segmentID !== null && segmentID.length > 0) {
		segmentID = analytics.user().id();
		analytics.identify(segmentID, {});
		isAnonymous = false;
		addDemoSelect();
	} else {
		segmentID = analytics.user().anonymousId();
		analytics.identify(segmentID, {});
		isAnonymous = true;
		addDemoSelect();
	}
});

function addDemoSelect() {
	if (/_/.test(segmentID) === false) {
		console.log('add demo select');
		var formDemo = $('#form-webinar-demo');
		formDemo.removeClass('hidden').addClass('visible');
		formDemo.attr("required", "true");
	}
}

/*
Here we catch every parameter on URL
Fill the fields in the form and create the proper variables
*/

// Catch query string
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    	sURLVariables = sPageURL.split('&'),
    	sParameterName,
    	i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

// Prefill form
$(document).ready(function() {
	var firstName_email = getUrlParameter('firstName');
	var lastName_email = getUrlParameter('lastName');
	var email_email = getUrlParameter('email');
	$('#form-webinar-email').val(email_email);
	$('#form-webinar-first').val(firstName_email);
	$('#form-webinar-last').val(lastName_email);
});

/*
When the form is submitted
It creates an object with the data
Display the popup
Trigger the RegisterWebinar function (see below)
*/

$( "#form-webinar" ).submit(function(e) {
	e.preventDefault();

	var email = $('#form-webinar-email').val();
	var first = $('#form-webinar-first').val();
	var last = $('#form-webinar-last').val();
	
	var data_webinar = {
		email: email,
		firstName: first,
		lastName: last,
		webinar: webinar_key
	};

	var data_webinar_demo = {
		email: email,
		firstName: first,
		lastName: last,
		webinar: webinar_name
	};

	$( ".overlay" ).addClass('overlay-is-visible');
	$( ".success" ).addClass('visible');

	if (webinar_key) {
		registerWebinar(data_webinar);
		checkDemoRequest(data_webinar_demo);
	}
	
});

/*
This part take care of checking if the user asked for a demo. If yes then push
the demo request to Zapier and Pipedrive.
*/

function checkDemoRequest(data_webinar_demo) {
	var demoForm = $('#form-webinar-demo');
	if (demoForm.hasClass('visible') && demoForm.val() === "Yes") {
		pushDemoRequest(data_webinar_demo);
	}
}

function pushDemoRequest(data_webinar_demo) {
	$.ajax({
		url: 'https://zapier.com/hooks/catch/3zt23g/',
		type: 'POST',
		dataType: 'json',
		data: data_webinar_demo,
	})
	.done(function() {
		console.log("sent to zapier");
		analytics.track('Submitted demo request', {
  		demo_request_source: "Webinar form",
  		email: data_webinar_demo.email, 
		});
		console.log("demo tracked");
	})
	.fail(function() {
		console.log("error");
	});
}

/*
This is the key function that will register the user in the webinar
It makes a post call with the data from the form to a zapier webhook 
and Zapier handles the webinar creation
*/

function registerWebinar(data_webinar) {
$.ajax({
  url: 'https://zapier.com/hooks/catch/39ijg9/',
  type: 'POST',
  dataType: 'json',
  data: data_webinar,
  success: function() {
    console.log('Success call');
    var webinar_date_unix = moment.tz(webinar_date, "ddd, MMM Do, YYYY h:mm A", webinar_tz).format();
    analytics.track('Registered for webinar', {
  		webinar_name: webinar_name,
  		webinar_date: webinar_date_unix
		});
		console.log("tracked");
   },
   error: function() {
    console.log('Error call');
   }
 });
}

/* 
This is where we fetch all the upcoming webinars data
on load we get all upcoming webinars and set an object with their name

if the names in object matches the name in the query string
If it does then we trigger a function that will get the data from it.
*/ 

var upcomingWebinars;

$(window).load(function() {
	console.log("loading...");
	if (webinar_name) {
		parseWebinarInfo();
	} else {
		noWebinarUpcoming();
	}
});

/*
If it matches we launch a function that will replace the elements in the page.
Get the right timezone data, format the dates and parse the info.

If there's nothing then dislay error message and disable button.
*/

function authorParsing() {
	// detect author & parsing
	if (author_webinar && author_webinar.length > 0) {
		console.log("has author");
		if (/Vincent/.test(author_webinar)) {
			$("#author_name--main").text('Vincent Le Hénaff');
			$("#author_position--main").text('Business Developer');
			$("#author_img--main").attr('src', 'https://avatars.slack-edge.com/2014-07-22/2478420834_192.jpg');
		} else if (/Golia/.test(author_webinar)) {
			$("#author_name--main").text('Matt Golia');
			$("#author_position--main").text('Account Manager');
			$("#author_img--main").attr('src', 'https://avatars.slack-edge.com/2015-05-15/4900888766_915d7be691f8ad89b4f7_192.jpg');
		} else {
			$("#author_name--main").text(author_webinar);
			$("#author_position--main").text(author_position_webinar);
			$("#author_img--main").attr('src', author_img_webinar);
		}
	}

	// detect if there's a guest
	if (guest_webinar && guest_webinar.length > 0) {
		console.log("has guest");
		$(".card--guest").removeClass('hidden');
		
		$("#author_name--guest").text(guest_webinar);
		$("#author_position--guest").text(guest_position_webinar);
		$("#author_img--guest").attr('src', guest_img_webinar);
	}

	// detect if there's a 2nd guest
	if (guest2_webinar && guest2_webinar.length > 0) {
		console.log("has guest");
		$(".card--guest2").removeClass('hidden');
		
		$("#author_name--guest2").text(guest2_webinar);
		$("#author_position--guest2").text(guest2_position_webinar);
		$("#author_img--guest2").attr('src', guest2_img_webinar);
	}
}

function parseWebinarInfo() {
	console.log("parsing");
	
	// get my tz
	var my_tz = jstz.determine().name(); 

	// inform the date
	var webinar_current_tz = moment.tz(webinar_date, "ddd, MMM Do, YYYY h:mm A", webinar_tz); 
	console.log(webinar_current_tz);
	
	// reformat for the right TZ
	var webinar_date_formatted = webinar_current_tz.tz(my_tz).format("dddd, MMMM Do - HH:mm");

	// get new TZ
	var tz_abrr = moment.tz(my_tz).format("z"); // Get the right abbreviation for the timezone

	// parsing
	$('h1').text(webinar_name);
	$('.metas-item span').text(webinar_date_formatted + ' ' + tz_abrr);
	$('.men__btn-big--ye').text('Register to the webinar');
	$('.learn p').html(webinar_description);

	authorParsing();
	$('.men__btn-big--ye').css('background', '#FC0');
}

function noWebinarUpcoming() {
	$('h1').text('No upcoming webinar. Stay tuned.');
	$('.metas-item span').text('No date available');
	$('.men__btn-big--ye').prop('disabled', true);
	$('.men__btn-big--ye').text('Button disabled');
}

/*
Those are the closing functions for the modal
First closes on click on the cross
Second closes on click outside the container
*/

$( ".closer" ).click(function(e) {
	e.preventDefault();
	$( ".overlay, body" ).removeClass('overlay-is-visible ov-fixed');
	$( ".error, .success" ).removeClass('visible');
	$( ".men__btn-main--wh" ).removeClass('hidden');
});

$(document).mouseup(function(e) {
  var container = $(".modal");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
	  $( ".overlay" ).removeClass('overlay-is-visible');
		$( "body" ).removeClass('ov-fixed');
		$( ".error, .success" ).removeClass('visible');
  }
});