$(document).ready(function(){
	
	// MAPA
	$('.mapa').load('static/mapa.html', function(){

		$('.grupo-estado').click(function(e){
			e.preventDefault();

			var uf = $(this).attr('id');
			$('#estado').val(uf);


		});

	});


	$('#lista-resultados').jScrollPane();

});