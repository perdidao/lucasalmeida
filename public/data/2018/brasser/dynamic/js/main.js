console.log('Feito com ♥ por lucasalmeida.cc');

// Fade dos textos
$(document).ready(function(){

  var el = $('#text li'), current = 0, total = el.length - 1;

  el.hide();
  el.eq(current).fadeIn();

  setInterval(function(){
    if(current < total){
      current = current + 1;
    } else {
      current = 0;
    }
    el.hide();
    el.eq(current).fadeIn();
  },3000);

});

// Funções de scroll
var elem, elemTop, scrolled, newPos, speed, headerHeight;

elem = $('.perdillax');
$(document).ready(function(){
  var fix = $(elem).offset().top / 1.3 + 'px';
  elem.css('background-position','center '+fix);
});

headerHeight = $('.header-height').height();

$(document).scroll(function(){
  scrolled = $(window).scrollTop();

  // Parallax dos backgrounds
  $.each(elem, function(e, el){
    quoeficient = scrolled - $(el).offset().top;

		speed = el.dataset.speed;
    newPos = quoeficient/speed + 'px';

    $(el).css('background-position','center '+newPos);

  });

  // Altera o estilo do menu no scroll
  if(window.matchMedia("(min-width:720px)").matches){
    if(scrolled >= headerHeight){
      $('#menu').addClass('scrolled');
    } else if(scrolled < headerHeight){
      $('#menu').removeClass('scrolled');
    }
  };

});

// Clique do botão de menu
$('#btn-menu').click(function(e){
  e.preventDefault();

  $(this).toggleClass('active');
  $('#menu').stop(true,true).slideToggle();

});