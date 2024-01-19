// Sudações
console.log('Desenvolvido por Uniware');

$('#btn-menu').click(function(e){
  e.preventDefault();

  $(this).toggleClass('active');
  $('.menu').slideToggle();

});

if(window.matchMedia("(min-width: 821px)").matches){
  $('#container.servicos .anchor').mouseover(function(){

    var item = '#' + $(this).attr('data-tipo');

    $('#container.servicos .hover').hide();
    $(item).show();

  });
};

// Interação d'o que fazemos
$('.areas li a').mouseover(function(){

  $('.subareas').hide();

  var item = '#a-'+$(this).attr('class');
  $(item).stop(true,true).fadeIn();

  $('.subareas li a').mouseover(function(){

    $('.subareas li p').hide();

    var subitem = $(this).parent().find('p');
    $(subitem).stop(true,true).fadeIn();

  });

});

// Carrossel de experiência
$('.carrossel-exp').owlCarousel({
  items:3,
  center:true,
  dots:true,
  autoplay:true,
  autoplayTimeout:5000,
  loop:true
});
