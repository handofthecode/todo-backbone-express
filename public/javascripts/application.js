var app = {
  templates: JST,
  renderViews: function() {
    this.display();
    this.nav.render();
  },
  display(query) {
    var collection = !query ? this.collection : new Todos(this.collection.where(query))
    collection.sort();
    this.list.render(collection);
  },
  showNewForm: function() {
    this.modal.showNewForm();
  },
  showEditForm: function(id) {
    var todo = this.collection.get(id);
    this.modal.showEditForm(todo.toJSON());
  },
  registerListeners: function() {
    this.events = _.extend({}, Backbone.Events);
    this.events.listenTo(this.collection, 'update change', this.renderViews.bind(this));
  },
  init: function() {
    this.collection = new Todos();
    this.list = new List(this.collection);
    this.nav = new Nav(this.collection);
    this.modal = new Modal(this.collection);
    this.renderViews();
    this.registerListeners();
  }
}
