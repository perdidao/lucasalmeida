// Sudações
console.log('Desenvolvido com ♥ por lucasalmeida.cc');

// CLique do menu
var item = $('#menu a, .bottom-menu a, .seta, .btn-revenda');

item.click(function(){
    var espaco = $($(this).attr('href')).offset().top - 120;
    $('html, body').animate({
        scrollTop: espaco
    }, 1000);
    return false;
});

// Carrossel de fotos da marca
$('#fotos-marca').owlCarousel({
  items:1,
  singleItem:true,
  autoplay:true,
  autoplayTimeout:5000,
  loop:true
});

$('#carousel-parallax').owlCarousel({
  items:1,
  singleItem:true,
  autoplay:true,
  autoplayTimeout:5000,
  loop:true,
  nav:true
});

// Vídeo
$('.play').click(function(e){
  e.preventDefault();

  $('.overlay').fadeIn();

});

$('.fechar, .overlay').click(function(e){
  e.preventDefault();

  $('.overlay').fadeOut();

});

// Produtos
$('#lista-produtos').owlCarousel({
  items:3,
  center:true,
  stagePadding: 200,
  autoplay:true,
  autoplayTimeout:6000,
  loop:true,
  margin:30,
  responsive : {
    0 : {
      items:1,
      stagePadding: 50
    },
    1024 : {
      items: 3,
      stagePadding: 50
    },
    1100 : {
      items: 3,
      stagePadding: 200
    }
  }
});

// Alerts
function abreAlert(i){
  $('.alert').stop(true,true).fadeIn();
  $('.alert').find('p').html(i);
}

function fechaAlert(){
  $('.alert').stop(true,true).fadeOut();
}

$('.alert-contato').click(function(e){
  e.preventDefault();

  abreAlert('Mensagem recebida!<br>Responderemos o mais rápido possível. :)');

});

$('.alert-produto').click(function(e){
  e.preventDefault();

  abreAlert('Que gosto refinado!<br>Já já uma revendedora entra em contato. :)');

});

$('.alert-revenda').click(function(e){
  e.preventDefault();

  abreAlert('Logo você será uma revendedora Vila Flor. :)');

});

$('.alert-news').click(function(e){
  e.preventDefault();

  abreAlert('Obrigado por se inscrever! :)');

});

$('.close').click(function(e){
  e.preventDefault();

  fechaAlert();

});