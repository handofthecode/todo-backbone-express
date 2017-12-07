var Todos = Backbone.Collection.extend({
  model: Todo,
  comparator: function(model) {
    return model.get('complete') === true ? 1 : -1;
  },
  completed: function() {
    return this.where({complete: true});
  },
  notCompleted: function() {
    return this.where({complete: false});
  },
  orderedNavObjects: function(completed) {
    var ids = {};
    var list = completed ? this.completed() : this;

    // e.g. {12/18: [1,2,4,6,8], "No Date Due": [3,5,7]} //
    list.forEach(todo => {
      var date = todo.get('date');
      ids[date] = ids[date] || [];
      ids[date].push(todo.get('id'));
    });

    // e.g. ["No Date Due", "12/18"] //
    var orderedDates = Object.keys(ids).sort((a, b) => {
      if (a === "No Date Due") a = '-1';
      if (b === "No Date Due") b = '-1';
      return a.split('/').reverse().join('') - b.split('/').reverse().join('');
    });

    // e.g. [{"No Date Due": 3}, {"12/18": 5}] //
    return orderedDates.map(date => {
      var nav = {};
      nav.date = date;
      nav.count = ids[date].length;
      return nav;
    });
  },
  todoDisplayObjects: function() {
    return this.map(todo => {
      return {
        id: todo.get('id'),
        date: todo.get('date'),
        title: todo.get('title'),
        complete: todo.get('complete')
      }
    });
  },
  completedCount: function() {
    return this.completed().length;
  },
  markComplete: function(id) {
    this.update(id, {complete: true});
  },
  update: function(id, obj) {
    this.get(id).set(obj);
  },
  toggleComplete: function(id) {
    this.get(id).toggleComplete();
  },
  saveData: function() {
    var list = JSON.stringify(this.toJSON());
    localStorage.setItem('todoList', list);
    localStorage.setItem('todoID', this.serialID);
  },
  loadList: function() {
    this.reset(JSON.parse(localStorage.getItem('todoList')) || []);
  },
  loadSerialID: function() {
    this.serialID = +localStorage.getItem('todoID') || 1;
  },
  initialize: function() {
    this.loadList();
    this.loadSerialID();
  }
});