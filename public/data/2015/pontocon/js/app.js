App = Ember.Application.create();

App.Router.map(function() {
  this.resource('sobre');
  this.resource('imobiliaria');
  this.resource('blog');
  this.resource('parceiros');
  this.resource('contato');
});

App.ContatoView = Ember.View.extend({
  didInsertElement: function() {
    initialize(latMap, longMap);
    montaUF('BR');
    enviaContato();
  }
});

App.BlogView = Ember.View.extend({
  didInsertElement: function() {
    montaBlog();
  }
});

App.ParceirosView = Ember.View.extend({
  didInsertElement: function() {
    montaParceiros();
  }
});