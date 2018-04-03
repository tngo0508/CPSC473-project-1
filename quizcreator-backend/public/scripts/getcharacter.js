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
    var $jumbotron = $("<div></div>", {
      "class": "jumbotron jumbotron-fluid",
      "data-user-character": "chosenCharacter"
    });

    var $container = $("<div></div>", {
      "class": "container"
    });
    var $h1 = $("<h1></h1>", {
      "class": "display-4"
    });
    var title = "Quiz Result";
    var $p = $("<p></p>", {
      "class": "lead"
    });
    var content = "Your character is " + chosenCharacter;

    $p.append(content);
    $h1.append(title);
    $container.append($h1);
    $container.append($p);
    $jumbotron.append($container);
    this.$element = $jumbotron;
  }

  App.GetCharacter = GetCharacter;
  window.App = App;
})(window);
