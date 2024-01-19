$('#apes li').hover(function(){

	$('#apes li').css('width','19%');
	$(this).css('width','24%');
	$(this).toggleClass('active');

});

$('#apes li').mouseleave(function(){

	$('#apes li').css('width','20%');

});