// MAPA
var latMap = -23.3114;
var longMap = -51.157587;
var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize(lat, lng) {

	directionsDisplay = new google.maps.DirectionsRenderer();
	
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 16,
        scrollwheel: false,
        disableDefaultUI: true,
    };
    $('#mapa').attr('lat', lat);
    $('#mapa').attr('lng', lng);

    var map = new google.maps.Map(document.getElementById("mapa"),
        mapOptions);

	var styles = [
        {
            stylers: [
                { hue: "#2D2A6E" },
                { saturation: -50 }
            ]
        }
    ];
    map.setOptions({styles: styles});
    directionsDisplay.setMap(map);
}

// CARREGA POSTS
function montaBlog(){
    $.ajax({
        type:'GET',
        url:'http://www.planninglondrina.com.br/svcBlog/Textos/0/5',
        contentType:'application/json; charset=utf-8',
        dataType:'jsonp'
    }).done(function(response){

        var posts='<div class="center">';


        $.each(response, function(b, blog){

            var texto = blog.Conteudo.substring(0,800)+'...';

            posts+='<section class="post">';
            posts+='    <figure class="box-imagem">';
            posts+='        <a href="'+blog.Slug+'"><img src="http://www.planninglondrina.com.br/images/blog/'+blog.Id+'.jpg?w=900&h=350&c=2" alt="'+blog.Titulo+'"></a>';
            posts+='    </figure>';
            posts+='    <div class="conteudo">';
            posts+='        <h3><a href="'+blog.Slug+'">'+blog.Titulo+'</a></h3>';
            posts+='        <p>'+texto+' <a href="'+blog.Slug+'">Continuar lendo »</a></p>';
            posts+='    </div>';
            posts+='    <br class="clear">';
            posts+='</section>';

        });

        posts += '</div>'

        $('#posts').html(posts);

    });
}

// CARREGA PARCEIROS
function montaParceiros(){
    $.ajax({
        type:'GET',
        url:'http://www.planninglondrina.com.br/svcParceiros/Parceiros/0/32',
        contentType:'application/json; charset=utf-8',
        dataType:'jsonp'
    }).done(function(response){
        
        var parceiros = '';
        var count = '';

        $.each(response, function(p, parceiro){
            count++;

            if(count%4 == 0){
                parceiros+='<li class="last"><a href="'+parceiro.Link+'" title="'+parceiro.Titulo+'"><img src="http://www.planninglondrina.com.br/images/parceiros/'+parceiro.Id+'.jpg?w=180&h=80&c=3" width="180" alt="'+parceiro.Titulo+'"></a></li>';
            } else {
                parceiros+='<li><a href="'+parceiro.Link+'" title="'+parceiro.Titulo+'"><img src="http://www.planninglondrina.com.br/images/parceiros/'+parceiro.Id+'.jpg?w=180&h=80&c=3" width="180" alt="'+parceiro.Titulo+'"></a></li>';
            }

        });

        $('#lista-parceiros').html(parceiros);

    });
}

function enviaContato(){
    $('#enviaContato').click(function(e){
        e.preventDefault();

        var json = new Object();

        json.Assunto = $('#assunto').val();
        json.Email = $('#email').val();
        json.Mensagem = $('#mensagem').val();
        json.Nome = $('#nome').val();
        json.Telefone = $('#telefone').val();

        $.ajax({
            type:'POST',
            url:'http://www.planninglondrina.com.br/svcContato/Geral',
            contentType:'application/json; charset=utf-8',
            dataType:'jsonp',
            data:JSON.stringify(json),
            success: function(response){
                if(response == true){
                    alert('Mensagem enviada com sucesso. Em breve, entraremos em contato.');
                    location.reload();
                } else {
                    alert('Algo deu errado. Confira os campos e tente novamente.');
                }
            }
        });

    });
}