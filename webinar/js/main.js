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

analytics.ready(function() {
	segmentID = analytics.user().id();
	if (segmentID !== null && segmentID.length > 0) {
		segmentID = analytics.user().id();
	} 
});
var date_webinar = getUrlParameter('date');
// var google_timestamp = getUrlParameter('google_timestamp');
// var google_timestamp_e = getUrlParameter('google_timestamp_end');
var webinar_name = $("h1").text();
// var calendarLink = "https://www.google.com/calendar/event?action=TEMPLATE&text="+webinar_name+"&dates="+google_timestamp+"/"+google_timestamp_e;

$(document).ready(function() {
	var firstName_email = getUrlParameter('firstName');
	var lastName_email = getUrlParameter('lastName');
	var email_email = getUrlParameter('email');
	$('#form-webinar-email').val(email_email);
	$('#form-webinar-first').val(firstName_email);
	$('#form-webinar-last').val(lastName_email);
});

$( "#form-webinar" ).submit(function(e) {
	e.preventDefault();

	// var SegmentID = analytics.user().id();
	var email = $('#form-webinar-email').val();
	var first = $('#form-webinar-first').val();
	var last = $('#form-webinar-last').val();
	var data_webinar = {
		Email: email,
		firstName: first,
		lastName: last
	}
	$( ".overlay" ).addClass('overlay-is-visible');
	$( ".success" ).addClass('visible');

	// if (SegmentID !== null && SegmentID.length > 0) {
	// push to segment
	// analytics.identify(''+ SegmentID +'');
	console.log(email);
	webinarCreate(data_webinar);
});

function webinarCreate(data_webinar) {
$.ajax({
  url: 'https://zapier.com/hooks/catch/39ijg9/',
  type: 'POST',
  dataType: 'json',
  data: data_webinar,
  success: function() {
    console.log('Success call');
    analytics.track('Registered for webinar', {
  		webinar_name: webinar_name,
  		webinar_date: date_webinar, 
		});
		console.log("tracked");
   },
   error: function() {
    console.log('Error call');
   }
 });
}

$( ".closer" ).click(function(event) {
	event.preventDefault();
	$( ".overlay" ).removeClass('overlay-is-visible');
	$( "body" ).removeClass('ov-fixed');
	$( ".error, .success" ).removeClass('visible');
	$( ".men__btn-main--wh" ).removeClass('hidden');
});

$(document).mouseup(function(event) {
  var container = $(".modal");
  if (!container.is(event.target) && container.has(event.target).length === 0) {
	  $( ".overlay" ).removeClass('overlay-is-visible');
		$( "body" ).removeClass('ov-fixed');
		$( ".error, .success" ).removeClass('visible');
  }
});