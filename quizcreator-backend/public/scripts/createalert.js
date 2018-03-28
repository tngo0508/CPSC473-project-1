(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function CreateAlert(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  CreateAlert.prototype.addRowSuccess = function() {
    var data = "[data-user-success=success]";
    this.removeRow(data);
    data = "[data-user-failure=failure]";
    this.removeRow(data);
    var rowElement = new RowSuccess();
    this.$element.append(rowElement.$element);
  };

  CreateAlert.prototype.addRowFailure = function() {
    var data = "[data-user-success=success]";
    this.removeRow(data);
    data = "[data-user-failure=failure]";
    this.removeRow(data);
    var rowElement = new RowFailure();
    this.$element.append(rowElement.$element);
  };

  CreateAlert.prototype.removeRow = function(data) {
    this.$element
      .find(data)
      .remove();
  };

  function RowSuccess() {
    var $div = $("<div data-user-success=\"success\" class=\"alert alert-success\" role=\"alert\">A question is created for your quiz successfully</div>");

    this.$element = $div;
  }

  function RowFailure() {
    var $div = $("<div data-user-failure=\"failure\" class=\"alert alert-danger\" role=\"alert\">No question is created! Please fufill all the fields above</div>");

    this.$element = $div;
  }

  App.CreateAlert = CreateAlert;
  window.App = App;
})(window);
