(function(window) {
  "user strict";
  var FORM_SELECTOR = "[data-feedback=feedback]";
  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var dpd = window.dpd;
  var $ = window.jQuery;

  formHandler.addSubmitHandler(function(data) {
    dpd.feedback.post({
      name: data["name"],
      email: data["email"],
      feedback: data["feedback"]
    }, function(result, error) {
      if (error) {
        alert(JSON.stringify(error));
      } else {
        $("#thankyou").modal();
      }
    });
  });
})(window);
