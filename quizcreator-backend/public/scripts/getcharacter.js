(function(window) {
  "user strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function GetCharacter(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  GetCharacter.prototype.addRow = function(chosenCharacter) {
    var data = "[data-user-character=chosenCharacter]";
    this.removeRow(data);
    var rowElement = new Row(chosenCharacter);
    this.$element.append(rowElement.$element);
  };

  GetCharacter.prototype.removeRow = function(data) {
    this.$element
      .find(data)
      .remove();
  };

  function Row(chosenCharacter) {
    var $div = $("<strong></strong>", {
      "data-user-character": "chosenCharacter"
    });

    var content = "Your character is " + chosenCharacter;

    $div.append(content);

    this.$element = $div;
  }

  App.GetCharacter = GetCharacter;
  window.App = App;
})(window);
