// ------
// Bolt ϟ
// ------

// Clique no botão
$('#disparar').click(function(e){
	e.preventDefault();

	// Criando o objeto que será enviado para a API
	var params = new Object();

	// Informações do remetente
	params.key = $('#key').val();
    params.message = new Object();
    params.message.from_email = $('#email').val();
    
    // Mensagem
    params.message.autotext = 'true';
    params.message.subject = $('#assunto').val();
    params.message.html = $('#html').val();

    // Destinatários
    params.message.to = new Object();

    // Tratando a lista de e-mails
    var emails = $('#destinatarios').val();
    var listaEmails = emails.split(',');
    
    // var total = listaEmails.length;
    var destinatarios = [];
    $.each(listaEmails,function(m,mail){
    	
    	destinatarios.push({
    		email: mail,
            name: "Vazio",
            type: "to"
    	});

    });
	params.message.to = destinatarios;

	// Ajax de envio para API
	$.ajax({
		type: 'POST',
		url: 'https://mandrillapp.com/api/1.0/messages/send.json',
		data: JSON.stringify(params),
		success:function(r){
			$('#disparador').html('<p>E-mails disparados com sucesso. <a href="/">Enviar novamente.</a></p>');
		}
	});

});