// jsFiddle
$.ajax({
  type:'GET',
  url:'http://jsfiddle.net/api/user/estudioffw/demo/list.json?sort=date&order=desc&start=0&limit=3',
  contentType:'application/json; charset=utf-8',
  dataType: 'jsonp',
  success:function(r){

    var snippets = '';

    $.each(r.list,function(s,snippet){

      snippets+='<li>'+
              '<h4><a href="'+snippet.url+'" target="_blank" title="'+snippet.title+'">'+snippet.title+'</a></h4>'+
              '<p>'+snippet.description+'</p>'+
            '</li>';

    });

    $('#fiddle').html(snippets);

  }
});

// GitHub
$.ajax({
  type:'GET',
  url: "https://api.github.com/users/estudioffw/repos?sort=updated",
  contentType:'application/json; charset=utf-8',
  dataType: "jsonp",
  success:function(r){

    var repos = '';
    var count = 0;
    
    $.each(r.data,function(re,repo){
      count++;

      repos+='<li>'+
              '<h4><a href="'+repo.url+'" target="_blank" title="'+repo.name+'">'+repo.name+'</a></h4>'+
              '<p>'+repo.description+'</p>'+
            '</li>';

      if(count == 3){
        return false;
      }

    });

    $('#github').html(repos);

  }
});

// Contato
$('#enviar').click(function(e){
    e.preventDefault();
    
    var params = new Object();
    params.key = 'G0b3hpjyhDLaSgyAQlnTQg';
    
    params.message = new Object();
    params.message.from_email = $('#email').val();
    
    params.message.to = new Object();
    params.message.to = [{'email':'contato@estudioffw.com', 'name':'Estúdio FFW', 'type':'to'}];
    
    params.message.autotext = 'true';
    params.message.subject = $('#nome').val()+' | Contato pelo site';
    params.message.html = $('#mensagem').val();
    
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: JSON.stringify(params),
      success:function(r){
          $.each(r, function(d, deliver){
              if(deliver.status == 'sent'){
                  $('#nome').val(' ');
                  $('#email').val('');
                  $('#mensagem').val(' ');
                  $('#msg').fadeIn().html('<p>Ae! Recebemos a mensagem. Em breve entramos em contato.</p>');
                  setTimeout(function(){
                    $('#msg').fadeOut();
                  },5000);
              } else {
                  $('#msg').fadeIn().html('<p>Opa! Algo deu errado. Confira os campos ou tente novamente em alguns minutos.</p>');
                  setTimeout(function(){
                    $('#msg').fadeOut();
                  },5000);
              }
          });
      }
     });
    
});