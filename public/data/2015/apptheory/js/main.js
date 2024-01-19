var width = $(window).width();

if(width >= 1024){
	
	// START THE ROTATOR
	$('#project-list').royalSlider({
		autoScaleSlider:false,
		arrowsNav:false,
		slidesOrientation:'vertical',
		autoPlay: {
    		enabled: true,
    		pauseOnHover: false,
    		delay:5000
    	}
	});

} else {
	// DO NOTHING! :)
}

var slider = $('#project-list').data('royalSlider');

slider.ev.on('rsBeforeAnimStart', function(event) {
	$('.about').hide();
});

slider.ev.on('rsDragStart', function(event) {
	$('.about').hide();
});

slider.ev.on('rsAfterSlideChange', function(event) {
	$('.about').fadeIn();
});