(function(window) {
  "use strict";
  var App = window.App || {};
  // var $ = window.jQuery;

  var Validation = {
    validatePassword: function(password, confirmedPassword) {
      return password === confirmedPassword;
    },
    validateAnswer: function(answer) {
      if (answer === "a") {
        return true;
      } else if (answer === "b") {
        return true;
      } else if (answer === "c") {
        return true;
      }
      return false;
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
