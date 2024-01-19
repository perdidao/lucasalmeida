$('#mutant').click(function(e){
	e.preventDefault();

    $(this).toggleClass('active');
    $('#menu').fadeToggle();

});

$('#btn-menu').click(function(e){
	e.preventDefault();

	$('.hidden-menu').slideToggle();

});