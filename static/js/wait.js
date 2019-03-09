console.log("Feito com ♥ por lucasalmeida.cc");

var SPMaskBehavior = function(val) {
    return 11 === val.replace(/\D/g, "").length ? "(00) 00000-0000" : "(00) 0000-00009";
}, spOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
};

$(".i-phone").mask(SPMaskBehavior, spOptions);