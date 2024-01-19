// Sudações
console.log('Desenvolvido com ♥ por estudioalamo.com.br');

// Action dos produtos
$(document).ready(function(){

  // Posição atual do scroll
  var posAtual;

  // Elemento a ser modificado (base da localização)
  var el = $('.linha-produto');

  // Posições de cada seção
  var positions = [];

  // Preenchendo o array com as posições
  $.each(el, function(e){

    var item = $(this);
    positions[e] = $(item).offset().top - 250;

  });

  // Executa no scroll
  $(document).scroll(function(){

    // Registra a posição atual
    posAtual = $(document).scrollTop();

    // Percorre o array e marca o item no menu
    for(i = 0; i < positions.length; i++){

      if(posAtual >= positions[i]){
        $('.linha-produto').eq(i).find('.info').addClass('active');
      }

    }

  });

});

// Produtos
$('.modal-open').click(function(e){
  e.preventDefault();

  $('.overlay').fadeIn();
  $(this).parent().find('.top-overlay').fadeIn();

});

$('.fechar').click(function(e){
  e.preventDefault();

  $('.overlay').fadeOut();
  $('.top-overlay').fadeOut();

});

// Botão do menu
$('#btn-menu').click(function(){
    $(this).toggleClass('active');
    $('#menu').slideToggle();
});

// Galeria de fotos da Empresa
$('#carousel-sobre').owlCarousel({
  items:1,
  singleItems:true,
  autoplay:true,
  autoplayTimeout:6000,
  loop:true
});

// Banners da marca
$('.banners').owlCarousel({
  items:1,
  singleItems:true,
  autoplay:true,
  autoplayTimeout:6000,
  loop:true
});
