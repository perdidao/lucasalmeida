$('#mutant').click(function(e){
	e.preventDefault();

    $(this).toggleClass('active');
    $('#menu').fadeToggle();

});

$('#btn-menu').click(function(e){
	e.preventDefault();

	$('.hidden-menu').slideToggle();

});

function Sair() {
    $.ajax({
        url: "/ADM/Sair",
        method: "GET",
        success: function (result, status, xhr) {            
            location.href = '/adm/login.vbhtml';
        },
        error: function (xhr, status, error) {

        }
    });
}