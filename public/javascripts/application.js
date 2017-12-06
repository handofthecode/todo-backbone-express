var app = {
  templates: JST,
  renderViews: function() {
    this.list.render();
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
    this.events.listenTo(this.collection, 'all', this.renderViews.bind(this));
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

//   registerHandlers: function() {
//     
//     
//     
//   },
//   // UI //

//   // NAV //
//   handleNavSelect: function(e) {
//     var $nav = $(e.target).closest('.nav');
//     var navId = $nav[0].dataset.navId;
//     this.refreshDisplay(navId, $nav);
//   },
//   refreshDisplay: function(navId, $nav) {
//     navId = navId || this.selectedNavId;
//     $nav = $nav || this.retrieveNavCategory(navId);
//     this.highlightNavGroup($nav);
//     this.renderNavToDisplay($nav, navId);
//     this.setDisplayHeading($nav, navId);
//   },
//   setDisplayHeading: function($nav, navId) {
//     var count = $nav.find('dd').html() || '0';
//     this.$heading.html(navId);
//     this.$displayCount.html(count);
//   },
//   retrieveNavCategory: function(navId) {
//     var $nav = $('[data-nav-id="' + navId + '"]');
//     $nav.each((i, el) => {
//       if (this.inCompletedNav($(el)) === this.selectedNavIsCompleted) $nav = $(el);
//     });

//     return $nav;
//   },
//   renderNavToDisplay: function($nav, navId) {
//     this.clearDisplay();
//     if (navId === 'All Todos') {
//       this.renderAllTodos();
//     } else if (navId === 'Completed') {
//       this.renderCompletedTodos();
//     } else {
//       this.renderNavGroupToDisplay($nav, navId);
//     }
//   },
//   updateNav: function() {
//     if ($('.nav_selected').length !== 0) this.storeSelectedNavGroup();
//     this.clearNav();
//     this.allTodosNav = this.list.orderedNavObjects();
//     this.completedTodosNav = this.list.orderedNavObjects('completed');
//   },
//   storeSelectedNavGroup: function() {
//     var $selected = $('.nav_selected');
//     this.selectedNavId = $selected[0].dataset.navId;
//     this.selectedNavIsCompleted = this.inCompletedNav($selected);
//   },
//   inCompletedNav: function($nav) {
//     return $.contains(this.$navCompletedList[0], $nav[0]);
//   },
//   // NAV DISPLAY //
//   handleNavToggle: function(e) {
//     this.$header.toggleClass('hidden');
//   },
//   renderNav: function() {
//     this.allTodosNav.forEach(nav => this.appendNav(nav, this.$navTodoList));
//     this.completedTodosNav.forEach(nav => this.appendNav(nav, this.$navCompletedList));
//   },
//   renderNavGroupToDisplay: function($nav, navId) {
//     var list;
//     if (!this.inCompletedNav($nav)) {
//       list = this.list.matchDate(navId, 'notCompleted');
//       list = this.list.todoDisplayObjects(list, this.appendTodo.bind(this));
//     }
//     list = this.list.matchDate(navId, 'completed');
//     list = this.list.todoDisplayObjects(list, this.appendTodo.bind(this));
//   },
//   appendNav: function(context, list) {
//     var element = this.createTemplate(this.navTemplate, context);
//     list.append(element);
//   },
//   clearNav: function() {
//     this.$navTodoList.children().remove();
//     this.$navCompletedList.children().remove();
//   },
//   // TODOS DISPLAY //
//   renderAllTodos: function() {
//     this.list.todoDisplayObjects('notCompleted', this.appendTodo.bind(this));
//     this.renderCompletedTodos();
//   },
//   renderCompletedTodos: function() {
//     this.list.todoDisplayObjects('completed', this.appendTodo.bind(this));
//   },
//   appendTodo: function(todo) {
//     var element = this.createTemplate(this.todoTemplate, todo);
//     this.$todoDisplay.append(element);
//   },
//   updateTodoCount: function() {
//     this.$allTodoCount.html(this.list.length);
//     this.$completedCount.html(this.list.completedCount());
//   },
//   clearDisplay: function() {
//     this.$todoDisplay.children().remove();
//   },
//   // FORM //

//   showForm: function() {
//     $('.bad-input').removeClass('bad-input');
//     this.$notification.hide();
//     this.clearForm();
//     this.$tint.fadeIn();
//     this.$modal.fadeIn();
//   },
//   hideForm: function() {
//     this.setFormID(0);
//     this.$tint.fadeOut();
//     this.$modal.fadeOut();
//   },

  
//   },
//   // HELPERS //
//   createTemplate(source, context) {
//     var template = Handlebars.compile(source);
//     return template(context);
//   },
//   todoIdFromEvent: function(event) {
//     return +event.target.closest('.todo').dataset.id;
//   },
//   init: function() {
//     this.$heading = $('#heading');

//     // BUTTONS
//     this.$navToggle = $('#nav_toggle');
//     this.$addTodo = $('#add_todo');

//     // TODO & NAV Lists //
//     this.$todoDisplay = $('#todo-display');




//     this.todoList = Object.create(TodoList).init();
//     this.allTodosNav = [];
//     this.completedTodosNav = [];
//     this.renderUpdate();
//     this.registerHandlers();
//   }
// };

// app.init();
// }