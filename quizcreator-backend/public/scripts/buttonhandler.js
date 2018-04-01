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

  ButtonHandler.prototype.addCreateNewQuiz = function() {
    console.log("Setting create new quiz handler for button");
    this.$formElement.on("click", function() {
      dpd.users.me(function(user, error) {
        if (error) {
          alert(error.message);
        } else {
          dpd.character.get({
            username: user.username
          }, function(characters, error) {
            if (error) {
              alert(error.message || "an error occurred");
            } else {
              if (characters.length !== 0) {
                characters.forEach(function(character) {
                  dpd.character.del({
                    username: user.username,
                    id: character.id
                  }, function(results, error) {
                    if (error) alert(error.message);
                  });
                });
              }
            }
          });
          dpd.quiz.get({
            username: user.username
          }, function(questions, error) {
            if (error) {
              alert(error.message || "an error occurred");
            } else {
              if (questions.length !== 0) {
                questions.forEach(function(question) {
                  dpd.quiz.del({
                    username: user.username,
                    id: question.id
                  }, function(results, error) {
                    if (error) {
                      alert(error.message);
                    } else {
                      location.href = "/main.html";
                    }
                  });
                });
              } else {
                location.href = "/main.html";
              }
            }
          });
        }
      });
    });
  };

  App.ButtonHandler = ButtonHandler;
  window.App = App;
})(window);
