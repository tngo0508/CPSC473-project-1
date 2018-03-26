(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-user-login=form]";
  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var dpd = window.dpd;

  formHandler.addSubmitHandler(function(data) {
    dpd.users.login({
      emailAddress: data["email"],
      password: data["password"]
    }, function(result, error) {
      if (error) {
        alert(error.message);
      } else {
        location.href = "main.html";
      }
    });
  });

})(window);
