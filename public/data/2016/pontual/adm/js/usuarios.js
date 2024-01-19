function apagaUsuario(IDUsuario) {
    $.ajax({
        url: "/ADM_Usuarios/Usuario/" + IDUsuario,
        method: "DELETE",
        success: function (result, status, xhr) {
            if (result == true) {
                location.href=location.href;
            }
            
        },
        error: function (xhr, status, error) {

        }
    });
}