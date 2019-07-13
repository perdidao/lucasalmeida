console.log('Desenvolvido por Lucas Almeida');

// -- Scrolling functions
var blocks = $('.block'),
	blocksPos = [],
	padding = $(window).innerHeight()/2,
	updatedWho = false,
	updatedWhat = false,
	updatedWhom = false,
	updatedHow = false;

$.each(blocks,function(b,block){
	var blockPos = {
		'offset': $(block).offset().top - padding,
		'el': $(block).attr('id')
	}
	blocksPos.push(blockPos);
});

function updateItems(section){
	var current = $('#'+section),
	elem = current.find('[data-animate]');

	$.each(elem,function(e,el){
		setTimeout(function(){
			$(el).addClass('animated fadeInUp');
		},e*200);
	});
}

$(document).on('scroll',function(e){
	
	var top = $(this).scrollTop();

	if(top >= blocksPos[0].offset && top < blocksPos[1].offset){
		if(updatedWho != true){
			updateItems(blocksPos[0].el);
		}
		updatedWho = true;
	} else if(top >= blocksPos[1].offset && top < blocksPos[2].offset){
		if(updatedWhat != true){
			updateItems(blocksPos[1].el);
		}
		updatedWhat = true;
	} else if(top >= blocksPos[2].offset && top < blocksPos[3].offset){
		if(updatedWhom != true){
			updateItems(blocksPos[2].el);
		}
		updatedWhom = true;
	} else {
		if(updatedHow != true){
			updateItems(blocksPos[3].el);
		}
		updatedHow = true;
	}

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