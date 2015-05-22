$(function() {
    
    onresize();

    $(window).on('resize', onresize );

    $("#readmore").on('click', function(){
		var page = $(this).attr('href'); // Page cible
		var speed = 500; // Durée de l'animation (en ms)
		$('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
		return false;
	});
});

function onresize(){
	$('.head-page').css({
        'position' : 'absolute',
        'left' : '50%',
        'top' : '50%',
        'margin-left' : -$('.head-page').outerWidth()/2,
        'margin-top' : -$('.head-page').outerHeight()/2
    });
}

