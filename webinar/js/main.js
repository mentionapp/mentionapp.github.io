$( ".men__btn-main--wh" ).click(function(event) {
	event.preventDefault();
	
	if (analytics !== null && analytics.length > 0) {
	SegmentID = analytics.user().id();
	// exist, ok
	$(this).addClass('hidden');
	// prepare loading...
	$('.loading').addClass('visible-ib');
	// push to segment
	analytics.identify(''+ SegmentID +'');
	analytics.track('Registered for webinar', {
  	webinar_name: 'Test'
	});
	// wait for it...
	setTimeout(
  	function() {
    $('.loading').removeClass('visible-ib');
   	$( ".overlay" ).addClass('overlay-is-visible');
    $( ".success" ).addClass('visible');
  	}, 2000);
	} 

	else {
		// does not exist, error message
		$(this).addClass('hidden');
		// prepare loading...
		$('.loading').addClass('visible-ib');
		setTimeout(
  		function() {
    	$('.loading').removeClass('visible-ib');
			$( ".overlay" ).addClass('overlay-is-visible');
			$( "body" ).addClass('ov-fixed');
    	$( ".error" ).addClass('visible');
  	}, 2000);
	}
});

$( ".closer" ).click(function(event) {
	event.preventDefault();
	$( ".overlay" ).removeClass('overlay-is-visible');
	$( "body" ).removeClass('ov-fixed');
	$( ".error, .success" ).removeClass('visible');
	$( ".men__btn-main--wh" ).removeClass('hidden');
});