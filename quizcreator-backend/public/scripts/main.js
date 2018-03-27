(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-user-quiz]";
  var FORM_HEADER = "[data-header=welcome]";
  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var dpd = window.dpd;
  var GetName = App.GetName;
  var getName = new GetName(FORM_HEADER);

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
        dpd.quiz.post({
          username: results.username,
          question: data["question"],
          optionA: data["optionA"],
          optionB: data["optionB"],
          optionC: data["optionC"],
          answer: data["answer"]
        }, function(result, error) {
          if (error) {
            alert(JSON.stringify(error));
          } else {
            // location.href = "/main.html";
          }
        });
      }
    });
  });

})(window);
