Dreams = new Mongo.Collection("dreams");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    dreams: function(){
      return Dreams.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-dream": function (event) {
      // This function is called when the new task form is submitted

      var text = event.target.text.value;

      Dreams.insert({
        dream_title: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
  });

  Template.dream.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Dreams.update(this._id, {$set: {checked: ! this.checked}});
  },
  "click .delete": function () {
    Dreams.remove(this._id);
  }
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
