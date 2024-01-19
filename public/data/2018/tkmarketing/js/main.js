// Sudações
console.log('Desenvolvido com ♥ por lucasalmeida.cc');

// Botão do menu
$('#menu-button').click(function(e){
	e.preventDefault();
  
	$(this).toggleClass('active');
	$('#menu').stop(true,true).slideToggle();
  
});

// Parallax dos meteoritos
var elem, scrolled, newPos, speed;

elem = $('.meteorito');

$(document).scroll(function(){
	scrolled = $(window).scrollTop();

  $.each(elem, function(e, el){
		speed = el.dataset.speed;
    newPos = scrolled/speed + 'px';
    
    $(el).css('transform','translatey('+newPos+')');

  });
});

// Ajuste do menu de acordo com o scroll
var clientes = $('#clientes').offset().top - 1000;

var position = 0;
$(document).scroll(function(){

	position = $(this).scrollTop();

	console.log(clientes,position);

	if(position >= 20){
		$('#header').addClass('scrolled');
	} else {
		$('#header').removeClass('scrolled');
	}

	if(position >= clientes){
		$('#rocket').addClass('active');
	} else {
		$('#rocket').removeClass('active');
	}

});

// Galeria de servicos
$('#servicos').owlCarousel({
	items:5,
	autoplay:true,
	autoplayTimeout:6000,
	loop:true,
	dots:false,
	nav:true,
	margin:30,
	responsive:{
    0:{
        items:1,
				nav:false
    },
    480:{
				items:2,
				nav:false
    },
    768:{
        items:4
    }
	}
});

// Galeria de frames
$('.framed-animation').owlCarousel({
	items:1,
	singleItem:true,
	autoplay:true,
	autoplayTimeout:6000,
	loop:true
	
});

// Interação do Funil
$('#funil a').click(function(e){
	e.preventDefault();

	$('#funil a').removeClass('active');
	$(this).addClass('active');

	var item = $(this).attr('href');
	$('.inbound-info').hide();
	$(item).fadeIn();

});

// Galeria de imagens do case
$('#case-galeria').owlCarousel({
	items:1,
	singleItem:true,
	autoplay:true,
	autoplayTimeout:6000,
	loop:true,
	dots:true
});

// Interação de serviços
if (window.matchMedia("(min-width: 1024px)").matches) {
	$('#servicos li .top').click(function(e){
		e.preventDefault();

		$('#servicos li .bottom').slideUp();
		$('#servicos li .top .plus').removeClass('active');

		$(this).parent().find('.bottom').slideDown();
		$(this).find('.plus').addClass('active');

	});
};

// Botões com gradiente
if(document.querySelector('.btn.gradient') != null){
	document.querySelector('.btn.gradient').onmousemove = (e) => {

		const x = e.pageX - e.target.offsetLeft;
		const y = e.pageY - e.target.offsetTop;

		e.target.style.setProperty('--x', `${ x }px`);
		e.target.style.setProperty('--y', `${ y }px`);
		
	}
}