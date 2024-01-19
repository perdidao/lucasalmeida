function montaCidade(estado, pais){
	$.ajax({
		type:'GET',
		url:'http://api.londrinaweb.com.br/PUC/Cidades/'+estado+'/'+pais+'/0/10000',
		contentType: "application/json; charset=utf-8",
		dataType: "jsonp",
		async:false
	}).done(function(response){
		cidades='<option value=""></option>';

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
		estados='<option value=""></option>';
		$.each(response, function(e, estado){

			estados+='<option value="'+estado.UF+'">'+estado.Estado+'</option>';

		});

		// PREENCHE OS ESTADOS BRASILEIROS
		$('#estado').html(estados);

		// CHAMA A FUNÇÃO QUE PREENCHE AS CIDADES DE ACORDO COM O ESTADO
		montaCidade($('#estado').val(), pais);

		// VERIFICA A MUDANÇA NO VALOR DO CAMPO ESTADO E ATUALIZA AS CIDADES
		$('#estado').change(function(){
			montaCidade($(this).val(), pais);
		});

	});
}