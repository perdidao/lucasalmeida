console.log('Desenvolvido por lucasalmeida.cc');

// -- Scrolling functions
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
	if(top >= wheight){
		$('.header').addClass('scrolled');
	} else if(top < wheight){
		$('.header').removeClass('scrolled');
	}

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
	
	goto(elem);

    return false;
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