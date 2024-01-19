// Sudações
console.log('Desenvolvido por Estúdio FFW');

// Banner
$('#banners').owlCarousel({
  items:1,
  singleItem:true,
  autoplay:true,
  nav:true
});

$('#btn-menu').click(function(e){
  e.preventDefault();

  $(this).toggleClass('active');
  $('#menu').slideToggle();

});

// Overlay
$('.ingr li a').click(function(e){
  e.preventDefault();

  var item = $(this).attr('href');
  $('#overlay-content').html('<img src="'+item+'" alt="">');
  $('.overlay').fadeIn();

});

$('.fechar').click(function(e){
  e.preventDefault();

  $('.overlay').fadeOut();

});

// Abas
$('.tabs li a').click(function(e){
  e.preventDefault();

  $('.tabs li a').removeClass('active');
  $(this).addClass('active');

  var item = $(this).attr('href');
  $('.tab').hide();
  $(item).fadeIn();

});

// Masonry
$('#celebridade').masonry({
  // options
  itemSelector: '#celebridade li',
  horizontalOrder: true,
  percentPosition: true,
  columnWidth:480
});
