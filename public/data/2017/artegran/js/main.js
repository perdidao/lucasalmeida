// Saudações
console.log('feito com ♥ pelo estudioffw.com');

$('#banners ul').owlCarousel({
	items:1,
	singleItem:true,
	autoplay:true,
	autoplayTimeout:5000,
	dots:true,
	loop:true
});

// Lista de obras
$(document).ready(function() {
  //Init the carousel
  initSlider();

  function initSlider() {
    $('#lista-obras').owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      onInitialized: startProgressBar,
      onTranslate: resetProgressBar,
      onTranslated: startProgressBar
    });
  }

  function startProgressBar() {
    // apply keyframe animation 
    $('.slide-progress').css({
      'width': '100%',
      'transition': 'width 5000ms'
    });
  }

  function resetProgressBar() {
    $('.slide-progress').css({
      'width': 0,
      'transition': 'width 0s'
    });
  }
});

// Menu
$('#btn-menu').click(function(e){
	e.preventDefault();

	$('#menu').fadeToggle();
	$(this).toggleClass('active');

});

// Lista de cortes
$('#lista-cortes').owlCarousel({
  items:1,
  singleItem:true,
  autoplay:true,
  autoplayTimeout:5000,
  dots:true,
  loop:true
});