// Sudações
console.log('Desenvolvido com ♥ por lucasalmeida.cc');

// CLique do menu
var item = $('#menu a');

item.click(function(){
    var espaco = $($(this).attr('href')).offset().top;
    $('html, body').animate({
        scrollTop: espaco
    }, 1000);
    return false;
});

// Carrossel de obras
$('#obras ul').owlCarousel({
  items:3,
  singleItem:true,
  center:true,
  nav:true,
  autoplay:true,
  autoplayTimeout:6000,
  loop:true,
  margin:40,
  responsive:{
    0:{
      items:1,
      center:false,
      nav:false
    },
    640:{
      items:3,
      center:true,
      nav:true
    }
  }
});