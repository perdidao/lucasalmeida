// MENU
$('#btn-menu').click(function(e){
	e.preventDefault();
    $(this).toggleClass('active');
    $('#menu').slideToggle();
});