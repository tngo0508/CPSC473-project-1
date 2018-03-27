(function(window) {
  "user strict";
  var App = window.App || {};
  var $ = window.jQuery;
  var dpd = window.dpd;

  function ButtonHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  ButtonHandler.prototype.addLogoutHandler = function() {
    console.log("Setting logout handler for button");
    this.$formElement.on("click", function() {
      dpd.users.logout(function(results, error) {
        if (error) {
          alert(error.message);
        } else {
          location.href = "/login.html";
        }
      });
    });

  };

  App.ButtonHandler = ButtonHandler;
  window.App = App;
})(window);
