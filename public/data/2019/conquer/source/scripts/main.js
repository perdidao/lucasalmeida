console.log('Desenvolvido com <3 por lucasalmeida.dev');

// Mobile navigation
$('.header-toggle').on('click', function (e) {
  e.preventDefault();

  $(this).toggleClass('opened');
  $('.header-nav').toggleClass('opened');
});

// Testimonials
$('.company-testimonials').slick({
  arrows: true,
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
});

/**
 * Steps interactions
 */

$(document).on('click', '[data-navigate]', function (e) {
  var $el = $(e.currentTarget),
    scope = $el.data('navigate-reference'),
    step = $el.data('navigate-direction'),
    context = `.scope-${scope}`,
    goTo = `#${scope}-step-${step}`,
    close = $el.data('close');

  $(context).find('.step').removeClass('active');
  $(goTo).addClass('active');

  if (close === true) {
    $(context).removeClass('hovered');
  }
});

$('.simulate-item__image').click(function (e) {
  $(this).parents('.simulate-item').addClass('hovered');
});

// Field masks
var SPMaskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
  spOptions = {
    onKeyPress: function (val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
  };

$('.mask-phone').mask(SPMaskBehavior, spOptions);
$('.mask-money').mask('00.000.000', { reverse: true });
