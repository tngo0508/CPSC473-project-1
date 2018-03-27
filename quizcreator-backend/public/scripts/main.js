(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-user-quiz]";
  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var dpd = window.dpd;

  formHandler.addSubmitHandler(function(data) {
    dpd.quiz.post({
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
  });

})(window);
