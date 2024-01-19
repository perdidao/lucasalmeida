// Sudações
console.log('Desenvolvido com ♥ por lucasalmeida.cc');

$('#projeto').owlCarousel({
  items:3,
  center:true,
  loop:true,
  nav:true,
  responsive:{
    0:{
      items:1,
      nav:false
    },
    740:{
      items:2
    },
    1024:{
      items:3
    }
  }
});