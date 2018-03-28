(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-user-quiz]";
  var FORM_HEADER = "[data-header=welcome]";
  var BUTTON_LOGOUT = "[data-button=logout]";
  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var dpd = window.dpd;
  var GetName = App.GetName;
  var getName = new GetName(FORM_HEADER);
  var ButtonHandler = App.ButtonHandler;
  var buttonHandler = new ButtonHandler(BUTTON_LOGOUT);

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
        var question = data["question"],
          optionA = data["optionA"],
          optionB = data["optionB"],
          optionC = data["optionC"],
          answer = data["answer"];
        if (question || optionA || optionB || optionC || answer) {
          dpd.quiz.post({
            username: results.username,
            question: question,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            answer: answer
          }, function(result, error) {
            if (error) {
              alert(JSON.stringify(error));
            } else {
              // location.href = "/main.html";
            }
          });
        } else {
          console.log("No question is added.");
        }
      }
    });
  });

  buttonHandler.addLogoutHandler();

})(window);
