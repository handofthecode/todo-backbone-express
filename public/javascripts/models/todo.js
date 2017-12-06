var Todo = Backbone.Model.extend({
  toggleComplete: function() {
    this.set({complete: (this.get('complete') ? false : true)});
  },
  truncYear: function() {
    return this.get('year') % 100;
  },
  displayDate: function() {
    if (this.get('month') && this.get('year')) {
      return this.get('month') + '/' + this.truncYear();
    } else {
      return 'No Date Due';
    }
  },
  initialize: function() {
    this.set({ date: this.displayDate(),
               complete: false });
  }
})