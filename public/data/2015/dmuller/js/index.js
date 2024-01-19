$('document').ready(function(){

	// Banner
	$('#banner').owlCarousel({
		items:1,
		singleItem:true,
		pagination:true,
		autoPlay:4000
	});

	// Marcas
	$('#lista-marcas').owlCarousel({
		items:4,
		pagination:true,
		autoPlay:7000,
		scrollPerPage:true
	});

	// Representantes
	$('#uf-dropdown').click(function(e){
		e.preventDefault();

		$('#lista-estados').slideToggle();

	});

	$('#lista-estados li a').click(function(e){
		e.preventDefault();

		var valor = $(this).text();
		$('#estado').val(valor);

		$('#lista-estados').slideUp();

	});



});