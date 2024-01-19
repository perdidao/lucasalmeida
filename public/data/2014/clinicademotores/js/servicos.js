var item = $('#submenu li a');

item.click(function(){
	var distancia = $($(this).attr("href")).offset().top - 140; 
    $('html, body').animate({
        scrollTop: distancia
    }, 1000);
    return false;
});