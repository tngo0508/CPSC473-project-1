(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-user-info=form]";

  var App = window.App;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var dpd = window.dpd;
  var $ = window.jQuery;

  formHandler.addSubmitHandler(function(data) {
    if (data["password"] === data["passwordAgain"]) {
      console.log("New account has just created");
      dpd.users.post({
        name: data["name"],
        username: data["email"],
        password: data["password"]
      }, function(result, error) {
        if (error) {
          alert(JSON.stringify(error));
        } else {
          // location.href = "/login.html";
        }
      });

      $("#exampleModal").modal();
    } else {
      console.log("Cannot create account");
    }
  });

  formHandler.addInputHandler(Validation.validatePassword);
})(window);
