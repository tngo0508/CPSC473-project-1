(function(window) {
  "user strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function ProgressBar(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  ProgressBar.prototype.addRow = function(width) {
    var data = "[data-progress-bar]";
    this.removeRow(data);
    var rowElement = new Row(width);
    this.$element.append(rowElement.$element);
  };

  ProgressBar.prototype.removeRow = function(data) {
    this.$element
      .find(data)
      .remove();
  };

  function Row(width) {
    var $div = $("<div></div>", {
      "data-progress-bar": "outer",
      "class": "progress"
    });
    var $progress = $("<div></div>", {
      "data-progress-bar": "bar",
      "class": "progress-bar progress-bar-striped progress-bar-animated",
      "role": "progressbar",
      "style": "width: " + width + "%",
      "aria-valuenow": 75,
      "aria-valuemin": 0,
      "aria-valuemax": 100
    });
    var $content = width + "%";

    $progress.append($content);
    $div.append($progress);
    this.$element = $div;
  }

  App.ProgressBar = ProgressBar;
  window.App = App;
})(window);
