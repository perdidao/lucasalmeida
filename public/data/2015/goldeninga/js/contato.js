$(document).ready(function(){
	$("#form-contato").validate();
	$('#telefone').mask('(99) 9999-9999');
});

$('#form-contato input').blur(function(){

	var conteudo = $(this).val();
	var nome = $(this).attr('placeholder');
	if(conteudo == ''){
		$(this).addClass('required');
		$(this).attr('placeholder', nome+'*');
	} else {
		$(this).removeClass('required');
	}

});