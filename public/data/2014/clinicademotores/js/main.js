function tamanho(){
	var altura = $(window).height();
	var largura = $(window).width();

	$('#overlay').css({
		'width': largura,
		'height': altura
	});
}

$(document).ready(function(){
	tamanho();

	$('.btn').click(function(e){
		e.preventDefault();
		$('#overlay').fadeIn();
	});

	$('#fechar').click(function(){
		$('#overlay').fadeOut();
	});

	$('#modal').click(function(){
		return false;
	});

	$('#overlay').click(function(){
		$(this).fadeOut();
	});

	$(document).keyup(function(e) { 
	    if(e.keyCode === 27){
	    	$('#overlay').fadeOut();
	    }
	});

});

$(window).resize(function(){
	tamanho();
});

// MENU
$('.menu-servicos').hover(function(){
	$('#submenu').stop(true, true).slideDown();
});

$('#submenu').mouseleave(function(){
	$('#submenu').stop(true, true).slideUp();
});

function tamanhoMarca(){
	var larguraMarca = $(window).width();

	$('#overlay-marca').css('width', larguraMarca);
}

$(document).ready(function(){
	tamanhoMarca();

	$('.abrir-marca').click(function(){
		$('#overlay-marca').fadeIn();
	});

	$('#fechar-marca').click(function(){
		$('#overlay-marca').fadeOut();
	});

	$('#overlay-marca').click(function(){
		$(this).fadeOut();
	});

	$(document).keyup(function(e) { 
	    if(e.keyCode === 27){
	    	$('#overlay-marca').fadeOut();
	    }
	}); 

});

$(window).resize(function(){
	tamanhoMarca();
});