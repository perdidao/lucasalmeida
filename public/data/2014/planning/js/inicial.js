var object;
var id = 1;

$('#banner li').hide();
$('#banner1').fadeIn();

function atualizaBanner(){
	if(id >= 5){
		id = 1;
	} else {
		id = id+1;
	}

	object = eval('banner'+id);

	$('#banner li').fadeOut(1000);
	$(object).fadeIn(1000);
}

function atualizaIcone(){
	$('#lista-areas li').removeClass('current');
	$('#lista-areas li').eq(id-1).addClass('current');
}

setInterval(function(){
	atualizaBanner();
	atualizaIcone();
}, 7000);


$('#lista-areas li a').click(function(e){
	e.preventDefault();
	var Id = $(this).attr('data-id');
	id = parseInt(Id)-1;
	atualizaBanner();
	atualizaIcone();
});