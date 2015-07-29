$( ".men__btn-main--wh" ).click(function(event) {
	event.preventDefault();

	var SegmentID = analytics.user().id();

	if (SegmentID !== null && SegmentID.length > 0) {
	
	// exist, ok rmeove button
	$(this).addClass('hidden');
	
	// prepare loading...
	$('.loading').addClass('visible-ib');
	
	// push to segment
	analytics.identify(''+ SegmentID +'');
	console.log("id is");
	console.log(SegmentID);
	analytics.track('Registered for webinar', {
  	webinar_name: 'Test'
	});
	console.log("tracked");

	// wait for it...display success modal
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
		console.log("nope");
		console.log(SegmentID);
		
		// prepare loading...
		$('.loading').addClass('visible-ib');
		
		// wait for it...display error modal
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