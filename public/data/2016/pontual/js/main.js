// Saudações
console.log('feito com ♥ pelo estudioffw.com');

// Banners
$('#banners').owlCarousel({
	items:1,
	singleItem:true,
	autoPlay:5000
});

// Serviços
$('.servicos li a').fancybox();

// Clientes
var clientes = $('#lista-clientes');
clientes.owlCarousel({
	items:5,
	autoPlay:3000
});

$('#prev').click(function(e){
	e.preventDefault();

	clientes.trigger('owl.prev');

});

$('#next').click(function(e){
	e.preventDefault();

	clientes.trigger('owl.next');

});

// Formulário
$('.checkBig').click(function(e){
	e.preventDefault();

	$('.checkBig').removeClass('active');
	$(this).addClass('active');

});

//----------------------------------------------------------------------------------------------------


function fileSelected(campo) {
    var file = document.getElementById(campo).files[0];
    if (file) {
        var fileSize = 0;
        if (file.size > 1024 * 1024)
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        else
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

        //document.getElementById('Nome').innerHTML = 'Nome: ' + file.name;
        //document.getElementById('Tamanho').innerHTML = 'Tamanho: ' + fileSize;
        //document.getElementById('Tipo').innerHTML = 'Tipo: ' + file.type;
        uploadFile(campo);
    }
}

function uploadFile(campo) {
    var fd = new FormData();
    fd.append(campo, document.getElementById(campo).files[0]);
    fd.append("tipo", "orcamento");
    fd.append("token", $('#token').val());
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", "/orcamento.upload");
    xhr.send(fd);
}

function uploadProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);

        var fileSize = 0;
        if (evt.loaded > 1024 * 1024)
            fileSize = (Math.round(evt.loaded * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        else
            fileSize = (Math.round(evt.loaded * 100 / 1024) / 100).toString() + 'KB';

        document.getElementById('progressoUp').innerHTML = percentComplete.toString() + '%   ' + '&nbsp;&nbsp;&nbsp;' + fileSize;
    }
    else {
        //document.getElementById('Progresso').innerHTML = 'impossível computar';
    }
}

function uploadComplete(evt) {
    /* Mostra o retorno quando tem sucesso. Depois daki da pra chamar a função das fotos na galeria, por exemplo */
    //alert(evt.target.responseText);
    if ($('#token').val() == "") {
        $('#token').val(evt.target.responseText);
    }
    document.getElementById('progressoUp').innerHTML = "";
}

function uploadFailed(evt) {
    alert("Erro ao fazer upload.");
}

function uploadCanceled(evt) {
    alert("Upload cancelado pelo usuário ou conexão interrompida pelo navegador.");
}