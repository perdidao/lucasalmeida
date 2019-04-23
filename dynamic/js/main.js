console.log('Desenvolvido por Lucas Almeida');

// -- Scrolling functions
if(window.matchMedia('screen and (min-width:769px)').matches){
	$.getScript('./static/js/scrollify.js',function(){
		$.scrollify({
			section:'.block',
			easing:'linear',
			scrollSpeed:600,
			updateHash:false,
			setHeight:false,
			touchScroll:false,
			before:function(i,sections){
				var current = $(sections[i].context),
				elem = current.find('[data-animate]');

				$.each(elem,function(e,el){
					$(el).removeClass('animated fadeInUp');
				});
				
			},
			after:function(i,sections){
				var current = $(sections[i].context),
				elem = current.find('[data-animate]');

				$.each(elem,function(e,el){
					setTimeout(function(){
						$(el).addClass('animated fadeInUp');
					},e*200);
				});

			},
		});
	});
};

var blocks = $('.block'),
	blocksPos = [];

$.each(blocks,function(b,block){
	var blockPos = $(block).offset().top - 10;
	blocksPos.push(blockPos);
});

$(document).on('scroll',function(e){
	
	var wheight = $(window).innerHeight();
	var top = $(this).scrollTop();
	
	// -- Navigation scroll transition
	// if(top >= wheight){
	// 	$('.header').addClass('scrolled');
	// } else if(top < wheight){
	// 	$('.header').removeClass('scrolled');
	// }

	// -- Scroll position detection
	$('.header__nav a').removeClass('active');
	if(top >= blocksPos[0] && top < blocksPos[1]){
		$('.header__nav a').eq(0).addClass('active');
	} else if(top >= blocksPos[1] && top < blocksPos[2]){
		$('.header__nav a').eq(1).addClass('active');
	} else if(top >= blocksPos[2] && top < blocksPos[3]){
		$('.header__nav a').eq(2).addClass('active');
	} else if(top >= blocksPos[3]){
		$('.header__nav a').eq(3).addClass('active');
	}

});

// -- Navigation scroll function
function goto(elem){
	element = $(elem);

	var distance = element.offset().top;
	
    $('html, body').animate({
        scrollTop: distance
	}, 1000);
}

$('.header__nav a').on('click', function(e){
	var elem = $(this).attr('href');
	
	// goto(elem);

    return false;
});

// -- Parallax
var elem, elemTop, scrolled, newPos, speed;

elem = $('.parallax-item');

$(document).scroll(function(){
	scrolled = $(window).scrollTop();

	$.each(elem, function(e, el){
		speed = el.dataset.speed;
		newPos = scrolled/speed + 'px';

		$(el).css('transform','translatey('+newPos+')');
	});
});

// -- Face interaction
var face = $('#face');

$(document).on('mousemove','.top-container',function(e){

	var ax = -($(window).innerWidth()/1.2 - e.pageX)/40;
	var ay = ($(window).innerHeight()/2 - e.pageY)/40;

	// Moves the face around
	face.removeClass('paused').addClass('moving').attr('style', 'transform: rotateY('+ax+'deg) rotateX('+ay+'deg);');

});

$(document).on('mouseleave','.top-container',function(e){

	// Moves the face back to initial state
	face.removeClass('moving').addClass('paused').attr('style', 'transform:rotateY(0deg) rotateX(0deg);');
});