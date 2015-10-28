/*
This is the main JS file for the webinar page
Here we handle the :
- Registration
- The popup
- The tracking
*/

analytics.ready(function() {
	segmentID = analytics.user().id();
	if (segmentID !== null && segmentID.length > 0) {
		segmentID = analytics.user().id();
	} 
});

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

// Variables from query string
var name_webinar_inURL = getUrlParameter('webinar_name');

var author_webinar_inURL = getUrlParameter('author_name');
var author_position_webinar_inURL = getUrlParameter('author_position');
var author_img_webinar_inURL = getUrlParameter('author_img');

var guest_webinar_inURL = getUrlParameter('guest_name');
var guest_position_webinar_inURL = getUrlParameter('guest_position');
var guest_img_webinar_inURL = getUrlParameter('guest_img');


// Variables from API
var webinar_name;
var webinar_date;
var webinar_timezone;
var webinar_description;
var webinar_key;

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

	$( ".overlay" ).addClass('overlay-is-visible');
	$( ".success" ).addClass('visible');

	if (webinar_key) {
		registerWebinar(data_webinar);
	}
	
});

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
    analytics.track('Registered for webinar', {
  		webinar_name: webinar_name,
  		webinar_date: webinar_date, 
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
	$.ajax({
   	url: "https://mention.com/wp-content/themes/mention/scripts/wp-webinars.php",
   	type: "GET",
   	success: function(data) { 
   		console.log(data); 
   		var i;
			for (i = 0; i < data.length; ++i) {
				var webinarSubject = data[i].subject;
			  
			  if (data[i].subject === name_webinar_inURL) {
			  	upcomingWebinars = data[i];
			  	console.log("matched");
			  	webinar_name = webinarSubject;
			  	webinar_date = data[i].times[0].startTime;
			  	webinar_timezone = data[i].timeZone;
			  	webinar_description = data[i].description;
			  	webinar_key = data[i].webinarKey;
			  	console.log(webinar_key)
			  	$('.men__btn-big--ye').prop('disabled', false);
			  	parseWebinarInfo();
			  	console.log("done");
			  	console.log(upcomingWebinars);
			  	break
			  }
			  else { noWebinarUpcoming(); }
			}
   	},
   	error: function() { 
   		console.log('nope'); 
   		noWebinarUpcoming();
   	}
	});
});

/*
If it matches we launch a function that will replace the elements in the page.
Get the right timezone data, format the dates and parse the info.

If there's nothing then dislay error message and disable button.
*/

function parseWebinarInfo() {
	console.log("parsing");
	
	// timezone stuff
	var tz = moment.tz(webinar_date, webinar_timezone);
	var webinar_date_formatted = tz.format("dddd, MMMM Do - HH:mm");
	var tz_abrr = moment.tz(webinar_date, webinar_timezone).format("z");
	
	// parsing
	$('h1').text(webinar_name);
	$('.metas-item span').text(webinar_date_formatted + ' ' + tz_abrr);
	$('.men__btn-big--ye').text('Register to the webinar');
	$('.learn p').text(webinar_description);

	authorParsing();
	$('.men__btn-big--ye').css('background', '#FC0');

}

function authorParsing() {
	
	// detect author & parsing
	if (author_webinar_inURL && author_webinar_inURL.length > 0) {
		console.log("has author");
		if (/Vincent/.test(author_webinar_inURL)) {
			$("#author_name--main").text('Vincent Le Hénaff');
			$("#author_position--main").text('Business Developer');
			$("#author_img--main").attr('src', 'https://avatars.slack-edge.com/2014-07-22/2478420834_192.jpg');
		} else if (/Matt/.test(author_webinar_inURL)) {
			$("#author_name--main").text('Matt Golia');
			$("#author_position--main").text('Account Manager');
			$("#author_img--main").attr('src', 'https://avatars.slack-edge.com/2015-05-15/4900888766_915d7be691f8ad89b4f7_192.jpg');
		} else {
			$("#author_name--main").text(author_webinar_inURL);
			$("#author_position--main").text(author_position_webinar_inURL);
			$("#author_img--main").attr('src', author_img_webinar_inURL);
		}
	}

	// detect if there's a guest
	if (guest_webinar_inURL && guest_webinar_inURL.length > 0) {
		console.log("has guest");
		$(".card--guest").removeClass('hidden');
		
		$("#author_name--guest").text(guest_webinar_inURL);
		$("#author_position--guest").text(guest_position_webinar_inURL);
		$("#author_img--guest").attr('src', guest_img_webinar_inURL);
	}
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