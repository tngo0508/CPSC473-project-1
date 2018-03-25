(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-user-info=form]";
  // var SERVER_URL_USER = "http://localhost:2403/users";

  var App = window.App;
  // var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  // var remoteDS = new RemoteDataStore(SERVER_URL_USER);
  var formhandler = new FormHandler(FORM_SELECTOR);
  var dpd = window.dpd;

  formhandler.addCreateAccountHandler(function(data) {
    if (data["password"] === data["passwordAgain"]) {
      console.log("New account has just created");
      dpd.users.post({
        "name": data["name"],
        "emailAddress": data["email"],
        "password": data["password"]
      }, function(result, error) {
        if (error) {
          if (error.message) {
            alert(error.message);
          } else if (error.errors && error.errors.message) {
            alert("Message " + error.errors.message);
          } else {
            alert("An error occurred");
          }
        }
      });
    } else {
      console.log("Cannot create account");
    }
  });
})(window);
