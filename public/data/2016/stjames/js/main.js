// Menu
$('#btn-menu').click(function(e){
	e.preventDefault();
    $(this).toggleClass('active');
    $('#main-nav').slideToggle();
});

// Parallax
$('#tour').parallax({ imageSrc: '../static/img/bkg-tour.jpg' });
$('#calendario').parallax({ imageSrc: '../static/img/bkg-calendario.jpg' });
$('#materiais').parallax({ imageSrc: '../static/img/bkg-materiais.jpg' });

// Graus
$('#graus li a').click(function(e){
	e.preventDefault();

	$('#graus li').removeClass('active');
	$(this).parent().addClass('active');

});

// Overlay
$('#oficinas li a').click(function(e){
	e.preventDefault();

	$('#overlay').fadeIn();

});

$('#fechar').click(function(e){
	e.preventDefault();

	$('#overlay').fadeOut();

});