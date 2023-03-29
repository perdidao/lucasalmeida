var face = $("#face");

$(document).on("mousemove",function(e) {
  const objPos = face.position();
  var hD = e.pageX - objPos.top;
  var vD = e.pageY - objPos.top;
  var ax = -($(window).innerWidth()/3- hD)/20;
  var ay = ($(window).innerHeight()/3- vD)/20;

  if (window.matchMedia("(min-width:640px)").matches) {
    face.attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg);");
  }
});