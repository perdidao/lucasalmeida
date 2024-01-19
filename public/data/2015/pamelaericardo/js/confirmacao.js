// CONFIRMAÇÃO DE PRESENÇA
$('#telefone').mask('(99) 99999999?9');
$('#confirmar').click(function(e){
  e.preventDefault();
    
    var dados = '<p><strong>Convidado:</strong> '+$('#nome').val()+'</p><p><strong>Acompanhantes:</strong> '+$('#convidados').val()+'</p><p><strong>Telefone:</strong> '+$('#telefone').val()+'</p>';
    
    var params = new Object();
    params.key = 'G0b3hpjyhDLaSgyAQlnTQg';
    
    params.message = new Object();
    params.message.from_email = $('#email').val();
    
    params.message.to = new Object();
    params.message.to = [{'email':'lucas@perdidao.net', 'name':'Lucas Almeida', 'type':'to'}];
    
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
                  $('#convidados').val('');
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