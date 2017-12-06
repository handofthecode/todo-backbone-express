var Nav = Backbone.View.extend({
  template: app.templates.nav,
  el: '#nav-wrap',
  events: {
    'click #nav': 'navSelect',
    'click #nav_toggle': 'navToggle'
  },
  navSelect: function(e) {
    var $nav = $(e.target).closest('.nav');
    var navID = $nav.attr('data-nav-id');
    this.highlightNavGroup($nav);
    if (navID === 'All Todos') {
      app.display();
    } else if (navID === 'Completed') {
      app.display({complete: true});
    } else if (navID === 'No Date Due' && this.completedNav($nav)) {
      app.display({date: 'No Date Due', complete: true})
    } else if (navID === 'No Date Due') {
      app.display({date: 'No Date Due'});
    } else if (this.completedNav($nav)) {
      app.display({date: navID, complete: true });
    }
    else app.display({date: navID});
  },
  completedNav: function($nav) {
    return $nav.closest('ul').is('#nav-completed-list');
  },
  highlightNavGroup: function($nav) {
    $('.nav_selected').removeClass('nav_selected');
    $nav.addClass('nav_selected');
  },
  navToggle: function() {
    this.$header.toggleClass('hidden');
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
    this.$header = $('header');
  },
  initialize: function(todos) {
    this.collection = todos;
    this.cacheDOM();
  }
})