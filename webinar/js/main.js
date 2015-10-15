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

var date_webinar = getUrlParameter('date');
// var plaindate = getUrlParameter('plaindate');
// var google_timestamp = getUrlParameter('google_timestamp');
// var google_timestamp_e = getUrlParameter('google_timestamp_end');
var webinar_name = $("h1").text();
// var calendarLink = "https://www.google.com/calendar/event?action=TEMPLATE&text="+webinar_name+"&dates="+google_timestamp+"/"+google_timestamp_e;

$( "#form-webinar" ).submit(function(e) {
	e.preventDefault();

	// var SegmentID = analytics.user().id();
	var email = $('#form-webinar-email').val();
	$( ".overlay" ).addClass('overlay-is-visible');
	$( ".success" ).addClass('visible');

	// if (SegmentID !== null && SegmentID.length > 0) {
	// push to segment
	// analytics.identify(''+ SegmentID +'');
	console.log(email);
	webinarCreate(email);
});

function webinarCreate(email) {
$.ajax({
  url: 'https://zapier.com/hooks/catch/39ijg9/',
  type: 'POST',
  dataType: 'json',
  data: {email: email},
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