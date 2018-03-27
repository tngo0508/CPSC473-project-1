(function(window) {
  "user strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function GetName(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  GetName.prototype.addRow = function(user) {
    var rowElement = new Row(user);
    this.$element.append(rowElement.$element);
  };

  function Row(user) {
    var $h1 = $("<h1>Welcome to quizCreator, " + user.name + "!</h1>", {
      "class": "display-4"
    });

    this.$element = $h1;
  }

  App.GetName = GetName;
  window.App = App;
})(window);
