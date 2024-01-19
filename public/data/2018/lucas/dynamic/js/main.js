console.log('Feito com ♥ por lucasalmeida.cc');

var el, sum, deg, mx;

wrapper = $('#container');
el = $('.el');

wrapper.mousemove(function(e){
	mx = e.offsetX;
	
	console.log(mx);
	
	sum = mx/10;
	deg = sum+'deg';
	
  el.css('filter','hue-rotate('+deg+')');
});