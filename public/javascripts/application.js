var app = {
  templates: JST,
  initializeViews: function() {
    this.nav.render();
    this.display();
  },
  updateViews: function() {
    this.nav.render();
    this.nav.displayTodoGroup();
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
    this.events.listenTo(this.collection, 'update change', this.updateViews.bind(this));
  },
  init: function() {
    this.collection = new Todos();
    this.list = new List(this.collection);
    this.nav = new Nav(this.collection);
    this.modal = new Modal(this.collection);
    this.initializeViews();
    this.registerListeners();
  }
}
