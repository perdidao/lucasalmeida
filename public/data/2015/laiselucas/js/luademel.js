$(document).ready(function(){

	var status = $.url().param('status');

	if(status == 'concluido'){

		$('#conteudo').html('<h2>Obrigado!</h2><p>Sua conribuição nos deixou mais pertos da nossa viagem dos sonhos. Seremos eternamente gratos! :D</p>');

	}

});