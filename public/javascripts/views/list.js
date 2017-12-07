var List = Backbone.View.extend({
  template: JST.todoList,
  el: '#list',
  events: {
    'click .delete': 'delete',
    'click li.todo': 'toggleComplete',
    'click #add_todo': 'showNewForm',
    'click .todo-title': 'showEditForm'
  },
  showEditForm: function(e) {
    e.stopPropagation();
    var id = this.todoIdFromEvent(e);
    app.showEditForm(id);
  },
  showNewForm: function() {
    app.showNewForm();
  },
  toggleComplete: function(e) {
    var id = e.target.dataset.id;
    this.collection.get(id).toggleComplete();
  },
  delete: function(e) {
    e.stopPropagation();
    var id = $(e.target).closest('li').attr('data-id');
    this.collection.remove(id);
  },
  render: function(collection) {
    this.$el.html(this.template({ count: collection.length, 
                                  todos: collection.todoDisplayObjects() }));
  },
  initialize: function(todos) {
    this.collection = todos;
  },
  todoIdFromEvent: function(e) {
    return $(e.target).closest('li').attr('data-id');
  }
})