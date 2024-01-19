// DROPDOWN FAKE

// Controla a animação dos objetos envolvidos
$('#dropdown').click(function(){
	
	$(this).toggleClass('active');
	$('#opcoes').stop(true,true).slideToggle();

	// Verifica se algum filtro já está selecionado e marca como selecionado

	var valFiltro = $('#filtro').val();
	$('#opcoes li').each(function(){

		if($(this).find('a').text() == valFiltro){

			$(this).find('a').addClass('active');

		} else {
			$(this).find('a').removeClass('active');			
		}

	});

});

// Preenche o input com o filtro selecionado e limpa a animação
$('#opcoes li a').click(function(){

	var valor = $(this).text();
	$('#filtro').val(valor);

	$('#dropdown').removeClass('active');
	$('#opcoes').slideUp();

});


// HOVER DOS ITENS
$('#itens li').hover(function(){
	$(this).find('.hover').stop(true,true).fadeToggle();
});