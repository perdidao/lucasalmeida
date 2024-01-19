function montaCidade(estado, pais){
	$.ajax({
		type:'GET',
		url:'http://api.londrinaweb.com.br/PUC/Cidades/'+estado+'/'+pais+'/0/10000',
		contentType: "application/json; charset=utf-8",
		dataType: "jsonp",
		async:false
	}).done(function(response){
		
		var cidades='<option value="">Cidade</option>';

		$.each(response, function(c, cidade){

			cidades+='<option value="'+cidade+'">'+cidade+'</option>';

		});

		// PREENCHE AS CIDADES DE ACORDO COM O ESTADO
		$('#cidade').html(cidades);

	});
}

function montaUF(pais){
	$.ajax({
		type:'GET',
		url:'http://api.londrinaweb.com.br/PUC/Estados/'+pais+'/0/10000',
		contentType: "application/json; charset=utf-8",
		dataType: "jsonp",
		async:false
	}).done(function(response){
		
		var estados='<option value="">Estado</option>';

		$.each(response, function(e, estado){

			estados+='<option value="'+estado.UF+'">'+estado.Estado+'</option>';

		});

		// PREENCHE OS ESTADOS BRASILEIROS
		$('#estado').html(estados);

		// VERIFICA A MUDANÇA NO VALOR DO CAMPO ESTADO E ATUALIZA AS CIDADES
		$('#estado').change(function(){
			montaCidade($(this).val(), pais);
		});

	});
}

function montaPais(){
	$.ajax({
		type:	'GET',
		url:	'http://api.londrinaweb.com.br/PUC/Paisesv2/0/1000',
		contentType: "application/json; charset=utf-8",
		dataType: "jsonp",
		async:false
	}).done(function(response){
		
		var paises='';

		$.each(response, function(p, pais){

			if(pais.Pais == 'Brasil'){
				paises+='<option value="'+pais.Sigla+'" selected>'+pais.Pais+'</option>';
			} else {
				paises+='<option value="'+pais.Sigla+'">'+pais.Pais+'</option>';
			}

		});

		// PREENCHE O SELECT DE PAÍSES
		$('#pais').html(paises);

		montaUF('BR');

		// VERIFICA A MUDANÇA DO VALOR DO SELECT DE PAÍS
		$('#pais').change(function(){
			if($('#pais').val() == 'BR'){
				// SE O VALOR FOR BR E CONFIRMA OS SELECTS
				$('#estado').remove();
				$('#cidade').remove();
				$('#b-estado').append('<select id="estado"><option value="">Estado</option></select>');
				$('#b-cidade').append('<select id="cidade"><option value="">Cidade</option></select>');

				// CHAMA A FUNÇÃO QUE MONTA OS ESTADOS
				montaUF('BR');		
			} else {
				// SE NÃO FOR, TROCA OS SELECTS POR INPUTS DE TEXTO
				$('#estado').remove();
				$('#cidade').remove();
				$('#b-estado').append('<input type="text" id="estado">');
				$('#b-cidade').append('<input type="text" id="cidade">');
			}
		});

	});
}