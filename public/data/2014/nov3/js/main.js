$('#btn-menu').click(function(){
  $(this).toggleClass('active');
  $('#box-menu').toggleClass('opened');
  $('#header h1').toggleClass('floated');
  $('#header').toggleClass('active');
});

$('#lista-projetos li a').hover(function(){
  $(this).find('.hover').stop(true, true).fadeToggle();
});

$('#fotos li a').hover(function(){
  $(this).find('.hover').stop(true, true).fadeToggle();
});

$('#marcas li').hover(function(){
  $(this).find('.hover').stop(true, true).fadeToggle();
});

$('.ver-projeto').click(function(e){
  e.preventDefault();
  $('#projeto').fadeIn();
});

$('#fechar').click(function(e){
  e.preventDefault();
  $('#projeto').fadeOut();
});

// ANIMAÇÃO DOS SVGs
function drawLine(container, line){
  var length = 0;
  var pathLength = line.getTotalLength();
  var distanceFromTop = container.offset().top - $(window).scrollTop() - 240;
  var percentDone = 1 - (distanceFromTop / $(window).height()) + 0.2;
  length = percentDone * pathLength;
  line.style.strokeDasharray = [length,pathLength].join(' ');
}

function drawLines(){
  $.each($("path"), function(i, val){
    var line = val;
    drawLine($(this), line);
  });
}

$(window).scroll(function() {
  drawLines();
});

// ROLAGEM DO MENU
$('#menu a').click(function(){
  var distancia = $($(this).attr("href")).offset().top; 
  $('html, body').animate({
      scrollTop: distancia
  }, 1000);
  return false;
});

// AJUSTE DE TEXTOS PARA CELULAR
var larguraTela = $(window).width();

$(document).ready(function(){
  if(larguraTela < 1000){
    $('.text-br').remove();
  }
});