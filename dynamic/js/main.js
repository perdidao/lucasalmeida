console.log('Desenvolvido por lucasalmeida.cc');

// -- Face interaction
var face = $('#face');

$(document).on('mousemove',function(e) {  

  var ax = -($(window).innerWidth()/1.2 - e.pageX)/30;
  var ay = ($(window).innerHeight()/2 - e.pageY)/40;

  face.attr('style', 'transform: rotateY('+ax+'deg) rotateX('+ay+'deg);');

});