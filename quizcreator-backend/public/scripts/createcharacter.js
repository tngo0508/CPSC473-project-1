(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-user-quiz=form]";
  var FORM_HEADER = "[data-header=welcome]";
  var BUTTON_LOGOUT = "[data-button=logout]";
  var FORM_ALERT = "[data-user-alert=alert]";
  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var dpd = window.dpd;
  var GetName = App.GetName;
  var getName = new GetName(FORM_HEADER);
  var ButtonHandler = App.ButtonHandler;
  var buttonHandler = new ButtonHandler(BUTTON_LOGOUT);
  var CreateAlert = App.CreateAlert;
  var createAlert = new CreateAlert(FORM_ALERT);

  dpd.users.me(function(results, error) {
    if (error) {
      alert(error.message);
    } else {
      getName.addRow(results);
    }
  });

  formHandler.addSubmitHandler(function(data) {
    dpd.users.me(function(results, error) {
      if (error) {
        alert(error.message);
      } else {
        var characterA = data["characterA"],
          characterB = data["characterB"],
          characterC = data["characterC"];
        if (characterA && characterB && characterC) {
          dpd.character.get({
            username: results.username
          }, function(character) {
            if (character) {
              dpd.character.put(character[0].id, {
                username: results.username,
                characterA: characterA,
                characterB: characterB,
                characterC: characterC
              }, function(result, error) {
                if (error) {
                  alert(JSON.stringify(error));
                } else {
                  createAlert("success alert");
                }
              });
            } else {
              dpd.character.post({
                username: results.username,
                characterA: characterA,
                characterB: characterB,
                characterC: characterC
              }, function(result, error) {
                if (error) {
                  alert(JSON.stringify(error));
                } else {
                  console.log("success alert");
                  createAlert.addRowSuccess();
                }
              });
            }
          });
        } else {
          createAlert.addRowFailure();
          console.log("failure alert");
        }
      }
    });
  });

  buttonHandler.addLogoutHandler();

})(window);
