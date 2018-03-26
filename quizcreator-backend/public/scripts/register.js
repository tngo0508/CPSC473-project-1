(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-user-info=form]";
  // var SERVER_URL_USER = "http://localhost:2403/users";

  var App = window.App;
  // var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  // var remoteDS = new RemoteDataStore(SERVER_URL_USER);
  var Validation = App.Validation;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var dpd = window.dpd;

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
          location.href = "/login.html";
        }
      });
    } else {
      console.log("Cannot create account");
    }
  });

  formHandler.addInputHandler(Validation.validatePassword);
})(window);
