function fileSelected(campo) {
    var file = document.getElementById(campo).files[0];
    if (file) {
        var fileSize = 0;
        if (file.size > 1024 * 1024)
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        else
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

        document.getElementById('Nome').innerHTML = 'Nome: ' + file.name;
        document.getElementById('Tamanho').innerHTML = 'Tamanho: ' + fileSize;
        document.getElementById('Tipo').innerHTML = 'Tipo: ' + file.type;
        uploadFile(campo);
    }
}

function uploadFile(campo) {
        var fd = new FormData();
        fd.append(campo, document.getElementById(campo).files[0]);
        fd.append("modulo", "blog");
        fd.append("token", $('#token').val());
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "/blog.upload");
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

        document.getElementById('Progresso').innerHTML = percentComplete.toString() + '%   ' + '&nbsp;&nbsp;&nbsp;' + fileSize;
    }
    else {
        document.getElementById('Progresso').innerHTML = 'impossível computar';
    }
}

function uploadComplete(evt) {
    /* Mostra o retorno quando tem sucesso. Depois daki da pra chamar a função das fotos na galeria, por exemplo */
    //alert(evt.target.responseText);
    if ($('#token').val() == "") {
        $('#token').val(evt.target.responseText);
    }
}

function uploadFailed(evt) {
    alert("Erro ao fazer upload.");
}

function uploadCanceled(evt) {
    alert("Upload cancelado pelo usuário ou conexão interrompida pelo navegador.");
}

function apagaPost(IDPost) {
    $.ajax({
        url: "/ADM_Blog/Post/" + IDPost,
        method: "DELETE",
        success: function (result, status, xhr) {
            if (result == true) {
                location.href = location.href;
            }

        },
        error: function (xhr, status, error) {

        }
    });
}