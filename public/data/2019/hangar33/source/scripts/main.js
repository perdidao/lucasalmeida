// Scroll to hook
$('[data-scrollto]').click(function(e){
	var elem = $(e.currentTarget),
		target = elem.attr('href');

	if(target.charAt(0) === '#'){
		$('html,body').animate({
			scrollTop: $(target).offset().top
		}, 2000);
		return false;
	}
});

// Styling nav on scroll
$(document).scroll(function(){
    position = $(this).scrollTop();
    
    if(position >= 20){
        $('.header').addClass('header-scrolled');
    } else {
        $('.header').removeClass('header-scrolled');
    }

});

// Fading sections on scroll
ScrollOut({
	threshold: 0.2,
	onShown: function(el) {
		var menuItem = $(el).attr('id');
		$('.header__nav').find('[href=#'+menuItem+']').addClass('active');
	},
	onHidden: function(el) {
		var menuItem = $(el).attr('id');
		$('.header__nav').find('[href=#'+menuItem+']').removeClass('active');
	}
});

// Stores interaction
function displayStore (key) {
	$('.stores__gallery, .stores__content').hide();

	var gallery = key + '-gallery',
		content = key + '-content',
		$gallery = $(gallery),
		$content = $(content),
		slicked = $(gallery).data('initialized'),
		options = {
			arrows: false,
			dots: true,
			draggable:false,
			pauseOnHover:false,
			autoplay:true,
			autoplaySpeed:4000
		};

	$content
		.fadeIn();
	
	if(slicked){
		$gallery
			.slick('unslick')	
	}
	
	$gallery
		.fadeIn()
		.slick(options)
		.data('initialized',true);
}

displayStore('#hangar33');

$('.stores__nav--link').on('click',function(e){
	e.preventDefault();
	var key = $(e.currentTarget).attr('href');

	$('.stores__nav--link').removeClass('active');
	$(e.currentTarget).addClass('active');

	displayStore(key)
});

// Gifts interaction
$('body').on('click','.gift__form--gift',function(e){
	var $elem = $(e.currentTarget);
	$('.gift__form--gift').removeClass('active');
	$elem.addClass('active');
});

console.info('lucasalmeida.dev');
