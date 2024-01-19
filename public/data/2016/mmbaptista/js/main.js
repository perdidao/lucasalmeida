// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Menu +
$(document).scroll(function(){
	var dist = $(this).scrollTop();

	if(dist > 40){
		$('.topo').addClass('active');
		$('#banners').addClass('active');
	} else if(dist <= 40){
		$('.topo').removeClass('active');
		$('#banners').removeClass('active');
	}

});

// Link do logo
$('#logo').click(function(){
	var anc = $(this).attr('href');
	var dis = $(anc).offset().top;
    $('html, body').animate({
        scrollTop: dis
    }, 1000);
    return false;
});

// Clique do menu
var item = $('#nav a');

item.click(function(){
	var ancora = $(this).attr('href');
	var distancia = $(ancora).offset().top - 40;
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});

// Banner
$('#banners').owlCarousel({
	items:1,
	singleItems:true,
	nav:true,
	loop:true,
	autoplay:true,
	autoplayTimeout:6000
});

// Instagram
var userID = '4726081';
var token = '4726081.1677ed0.077d263bd3b4453884b89e6637715600';

$.ajax({
	url: 'https://api.instagram.com/v1/users/'+userID+'/media/recent/?access_token='+token,
	contentType: 'application/json; charset=utf-8',
	dataType: 'jsonp',
	async: true,
	success:function(r){

		var fotos = '';

		$.each(r.data,function(f,foto){

			fotos+='<li>'+
						'<a href="'+foto.link+'" target="_blank" title="'+foto.caption.text+'">'+
							'<img src="'+foto.images.low_resolution.url+'" alt="'+foto.caption.text+'">'+
						'</a>'+
					'</li>';

			if(f >= 7){ return false; }

		});

		$('#lista-fotos').html(fotos);

	}
});

// Link voltar
$('#voltar').click(function(){
	var an = $(this).attr('href');
	var di = $(an).offset().top;
    $('html, body').animate({
        scrollTop: di
    }, 1000);
    return false;
});

// Parallax
$('#parallax1').parallax('50%',-0.2);
$('#equipe').parallax('50%',-0.2);
$('#arquitetas').parallax('50%',-0.2);