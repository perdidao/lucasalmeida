var scroll, pos1, pos2, pos3;

var scenter = $(window).height() / 2;

pos1 = $('.foguete.foguete1').offset().top - scenter;
pos2 = $('.foguete.foguete2').offset().top - scenter;
pos3 = $('.foguete.foguete3').offset().top - scenter;

$(document).scroll(function(){
  scroll = $(document).scrollTop();

  if(scroll >= pos1){
    $('.foguete.foguete1').addClass('animated fadeInUp');
  }
  
  if(scroll >= pos2){
    $('.foguete.foguete2').addClass('animated fadeInUp');
  }
  
  if(scroll >= pos3){
    $('.foguete.foguete3').addClass('animated fadeInUp');
  }

});