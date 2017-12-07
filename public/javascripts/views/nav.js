var Nav = Backbone.View.extend({
  template: JST.nav,
  el: '#nav-wrap',
  events: {
    'click .nav': 'navSelect',
    'click #nav_toggle': 'navToggle'
  },
  lastDataID: 'All Todos',
  $lastNav: function() {
    var $el = $('[data-nav-id="' + this.lastDataID + '"]');
    if ($el.length === 0) {
      this.lastDataID = 'All Todos';
      $el = $('#all-todos');
    }

    return $el;
  },
  lastDataDate: function() {
    return this.lastDataID.replace(/-completed/, '');
  },
  navSelect: function(e) {
    this.lastDataID = $(e.target).closest('.nav').attr('data-nav-id');
    this.displayTodoGroup();
  },
  displayTodoGroup: function() {
    this.highlightNavGroup();
    if (this.lastDataID === 'All Todos') {
      app.display();
    } else if (this.lastDataID === 'Completed') {
      app.display({complete: true});
    } else if (this.lastDataID === 'No Date Due-completed') {
      app.display({date: 'No Date Due', complete: true})
    } else if (this.lastDataID === 'No Date Due') {
      app.display({date: 'No Date Due'});
    } else if (this.lastDataDate() !== this.lastDataID) {
      app.display({date: this.lastDataDate(), complete: true });
    }
    else app.display({date: this.lastDataDate()});
  },
  highlightNavGroup: function() {
    $('.nav_selected').removeClass('nav_selected');
    this.$lastNav().addClass('nav_selected');
  },
  toggle: function() {
    this.$el.toggleClass('hidden');
  },
  render: function() {
    this.$el.html(this.template({
      group: this.collection.orderedNavObjects(),
      completedGroup: this.collection.orderedNavObjects('completed'),
      completedCount: this.collection.completedCount(),
      totalCount: this.collection.length
    }));
  },
  cacheDOM: function() {
    this.$allTodos = ('#all-todos');
  },
  initialize: function(todos) {
    this.collection = todos;
    this.cacheDOM();
  }
})