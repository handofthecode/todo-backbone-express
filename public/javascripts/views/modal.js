var Modal = Backbone.View.extend({
  serialID: 1,
  template: JST.modal,
  el: '#modal-wrap',
  events: {
    'click #tint': 'hide',
    'keypress form input': 'handlePreventBadNumbers',
    'blur form input': 'handleBadInput',
    'keyup form .bad-input': 'handleCheckBadInputFixed',
    'click #mark-as-complete': 'handleFormMarkComplete',
    'click #submit': 'handleSubmit'
  },
  render: function() {
    this.$el.html(this.template());
  },
  show: function() {
    $('.bad-input').removeClass('bad-input');
    this.$notification.hide();
    this.$el.fadeIn();
  },
  showNewForm: function() {
    this.clearForm();
    this.show();
  },
  showEditForm: function(todo) {
    this.populateForm(todo);
    this.show();
  },
  hide: function() {
    this.$el.fadeOut();
  },
  populateForm: function(todo) {
    this.$title.val(todo.title);
    this.$day.val(todo.day);
    this.$month.val(todo.month);
    this.$year.val(todo.year);
    this.$description.val(todo.description);
    this.setFormID(todo.id);
  },
  clearForm: function() {
    this.$title.val('');
    this.$day.val('');
    this.$month.val('');
    this.$year.val('');
    this.$description.val('');
  },
  handleSubmit: function(e) {
    if (this.$submit.hasClass('disabled')) return;
    var navId;
    var id = +this.getFormID();
    var properties = this.getFormValues();
    if (id === 0) {
      properties.id = this.serialID++;
      this.collection.add(properties);
      navId = 'All Todos';
    } else {
      this.collection.get(id).set(properties);
      this.setFormID(0);
    }
    this.hide();
  },
  handleFormMarkComplete: function() {
    var id = +this.getFormID();
    if (id === 0) {
      alert('Cannot mark as complete as item has not been created yet!');
    } else {
      this.collection.get(id).set('complete', true);
      this.hide();
    }
  },
  getFormValues: function() {
    var day = this.$day.val();
    var month = this.$month.val();
    month = month.length === 1 ? month.padStart(2, "0") : month;
    day = day.length === 1 ? day.padStart(2, "0") : day;

    return { title: this.$title.val(),
             day: day,
             month: month,
             year: this.$year.val(),
             description: this.$description.val(),
           };
  },
        // VALIDATION //
  checkForBadInput: function() {
    return $('.bad-input').length !== 0;
  },
  disableSubmit: function() {
    this.$submit.addClass('disabled');
  },
  enableSubmit: function() {
    this.$submit.removeClass('disabled');
  },
  handleBadInput: function(e) {
    var $target = $(e.target);
    if ($target.val() === '') {
      $target.removeClass('bad-input');
    } else {
      if (this.$day.is($target) && (this.$day.val() > 31 || this.$day.val() < 1)) {
        this.notify($target, 'day between 1-31.');
      } else if (this.$day.is($target)) {
        $target.removeClass('bad-input');
      }
      if (this.$month.is($target) && (this.$month.val() > 12 || this.$month.val() < 1)) {
        this.notify($target, 'month between 1-12.');
      } else if (this.$month.is($target)) {
        $target.removeClass('bad-input');
      }
      if (this.$year.is($target) && (this.$year.val() > 2099 || this.$year.val() < 2017)) {
        this.notify($target, '4 digit year between 2017-2099.');
      } else if (this.$year.is($target)) {
        $target.removeClass('bad-input');
      }
    }
    if (this.checkForBadInput()) this.disableSubmit();
    else this.enableSubmit();
  },
  notify: function($input, value) {
    this.$notification.html('Please enter a valid ' +  value).fadeIn().delay(3000).fadeOut();
    $input.addClass('bad-input');
  },
  handleCheckBadInputFixed: function(e) {
    var $target = $(e.target);
    if ($target.val() === '') {
      $target.removeClass('bad-input');
    } else if (this.$day.is($target) && this.$day.val() <= 31 && this.$day.val() >= 1) {
      $target.removeClass('bad-input');
    } else if (this.$month.is($target) && this.$month.val() <= 12 && this.$month.val() >= 1) {
      $target.removeClass('bad-input');
    } else if (this.$year.is($target) && this.$year.val() <= 2099 && this.$year.val() >= 2017) {
      $target.removeClass('bad-input');
    }
    if (!this.checkForBadInput()) this.enableSubmit();
  },
  handlePreventBadNumbers: function(e) {
    var target = e.target;
    if (window.getSelection().toString() !== '' || target.value === '') {
    } else if (this.$day.is(target) && this.$day.val().length >= 2) {
      e.preventDefault();
    } else if (this.$month.is(target) && this.$month.val().length >= 2) {
      e.preventDefault();
    } else if (this.$year.is(target) && this.$year.val().length >= 4) {
      e.preventDefault();
    }
  },
  cacheDOM: function() {
    // FORM ELEMENTS //
    this.$title = $('#title');
    this.$day = $('#day');
    this.$month = $('#month');
    this.$year = $('#year');
    this.$description = $('#description');
    this.$submit = $('#submit');
    this.$markAsComplete = $('#mark-as-complete');
    this.$notification = $('#notification');
    this.$form = $('form');
  },
  initialize: function(todos) {
    this.collection = todos;
    this.render();
    this.cacheDOM();
  },
  // HELPERS //
  getFormID: function() {
    return this.$form[0].dataset.editId;
  },
  setFormID: function(id) {
    this.$form[0].dataset.editId = id;
  }
})