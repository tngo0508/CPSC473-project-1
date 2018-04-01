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

  CreateAlert.prototype.addRowSuccess = function(message) {
    var data = "[data-user-success=success]";
    this.removeRow(data);
    data = "[data-user-failure=failure]";
    this.removeRow(data);
    var rowElement = new RowSuccess(message);
    this.$element.append(rowElement.$element);
  };

  CreateAlert.prototype.addRowFailure = function(message) {
    var data = "[data-user-success=success]";
    this.removeRow(data);
    data = "[data-user-failure=failure]";
    this.removeRow(data);
    var rowElement = new RowFailure(message);
    this.$element.append(rowElement.$element);
  };

  CreateAlert.prototype.removeRow = function(data) {
    this.$element
      .find(data)
      .remove();
  };

  function RowSuccess(message) {
    var $div = $("<div></div>", {
      "data-user-success": "success",
      "class": "alert alert-success",
      "role": "alert"
    });
    var $message = message;
    $div.append($message);

    this.$element = $div;
  }

  function RowFailure(message) {
    var $div = $("<div></div>", {
      "data-user-failure": "failure",
      "class": "alert alert-danger",
      "role": "alert"
    });
    var $message = message;
    $div.append($message);

    this.$element = $div;
  }

  App.CreateAlert = CreateAlert;
  window.App = App;
})(window);
