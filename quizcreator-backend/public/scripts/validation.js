(function(window) {
  "use strict";
  var App = window.App || {};
  // var $ = window.jQuery;

  var Validation = {
    validatePassword: function(password, confirmedPassword) {
      return password === confirmedPassword;
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
