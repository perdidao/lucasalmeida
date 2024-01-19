function tamanho(){
	var altura = $(window).height();
	var largura = $(window).width();

	$('.page').css({
		'width': largura,
		'height': altura
	});
}

$(document).ready(function(){
	tamanho();
});

$(document).resize(function(){
	tamanho();
});

// MENU
$('#main-nav a').click(function(e){
	e.preventDefault();

	var item = $(this).attr('href');
	var distancia = $(item).offset().top;

	$('html,body').animate({
		scrollTop:distancia
	},1000);
});

$(document).ready(function(){
	var menuItem = $('#main-nav a');

	$.each(menuItem,function(){
		
		var This = $(this);
		var contentItem = $(this).attr('href');

		$(document).scroll(function(){

			var distanceTop = $(document).scrollTop();
			var distanceItem = $(contentItem).offset().top-5;

			console.log(distanceTop);

			if(distanceItem < distanceTop){
				$('#main-nav a').removeClass('active');
				$(This).addClass('active');
			}

		});

	});
});

// CONFIRMAÇÃO DE PRESENÇA
$('#telefone').mask('(99) 99999999?9');
$('#enviar').click(function(e){
    
    var dados = '<p><strong>Convidado:</strong> '+$('#nome').val()+'</p><p><strong>Acompanhantes:</strong> '+$('#acompanhantes').val()+'</p><p><strong>Quantidade de convites individuais:</strong> '+$('#quantidade').val()+'</p><p><strong>Telefone:</strong> '+$('#telefone').val()+'</p>';
    
    var params = new Object();
    params.key = 'G0b3hpjyhDLaSgyAQlnTQg'
    
    params.message = new Object();
    params.message.from_email = $('#email').val();
    
    params.message.to = new Object();
    params.message.to = [{'email':'lucas@perdidao.net', 'name':'Lucas Almeida', 'type':'to'},{'email':'laislopes__@hotmail.com', 'name':'Laís Lopes', 'type':'to'},{'email':'assessoria.claudiadavid@hotmail.com', 'name':'Claudia - Assessora', 'type':'to'}]
    
    params.message.autotext = 'true';
    params.message.subject = 'Confirmação de presença: '+$('#nome').val();
    params.message.html = dados;
    
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: JSON.stringify(params),
      success:function(r){
          $.each(r, function(d, deliver){
              if(deliver.status == 'sent'){
                  $('#nome').val('');
                  $('#email').val('');
                  $('#telefone').val('');
                  $('#quantidade').val('');
                  $('#acompanhantes').val('');
                  $('#msg').fadeIn().html('Pronto, sua presença está confirmada! Estamos te aguardando. :D');
                  setTimeout(function(){
                    $('#msg').fadeOut();
                  },5000);
              } else {
                  $('#msg').fadeIn().html('Opa! Algo deu errado. Confira os campos ou tente novamente em alguns minutos.');
                  setTimeout(function(){
                    $('#msg').fadeOut();
                  },5000);
              }
          });
      }
     });
    
});