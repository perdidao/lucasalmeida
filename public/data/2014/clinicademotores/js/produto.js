// FOTOS

$('#miniaturas li a').click(function(e){
	e.preventDefault();

	var foto = $(this).attr('href');
	$('#foto-ativa img').attr('src', foto);

});

$('#miniaturas li a:first').click();