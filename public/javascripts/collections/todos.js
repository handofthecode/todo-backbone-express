var Todos = Backbone.Collection.extend({
  model: Todo,
  completed: function() {
    return this.where({complete: true});
  },
  notCompleted: function() {
    return this.where({complete: false});
  },
  matchDate: function(date, list) {
    if (list === 'completed') list = this.completed();
    else if (list === 'notCompleted') list = this.notCompleted();
    else list = this;

    return list.filter(todo => {
      return todo.displayDate() === date;
    });
  },
  orderedNavObjects: function(list) {
    var ids = {};
    list = list === 'completed' ? this.completed() : this;

    // e.g. {12/18: [1,2,4,6,8], "No Date Due": [3,5,7]} //
    list.forEach(todo => {
      var date = todo.displayDate();
      ids[date] = ids[date] || [];
      ids[date].push(todo.id);
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
        date: todo.displayDate(),
        title: todo.get('title'),
        complete: todo.get('complete')
      }
    });
  },
  completedCount: function() {
    return this.completed().length;
  },
  markComplete: function(id) {
    this.get(id).complete = true;
  },
  update: function(id, obj) {
    this.get(id).set(obj);
  },
  toggleComplete: function(id) {
    this.get(id).toggleComplete();
  },
  saveData: function() {
    var list = JSON.stringify(this);
    localStorage.setItem('todoList', list);
    localStorage.setItem('todoID', this.serialID);
  },
  loadList: function() {
    this.reset(JSON.parse(localStorage.getItem('todoList')) || []);
  },
  loadSerialID: function() {
    this.serialID = +localStorage.getItem('todoID') || 1;
  },
  checkDataIntegrity: function() {
    if (this.serialID === 1 || this.length === 0) {
      this.serialID = 1;
      this.reset();
    }
  },
  initialize: function() {
    this.loadList();
    this.loadSerialID();
    this.checkDataIntegrity();
    this.comparator = 'complete';
  }
});