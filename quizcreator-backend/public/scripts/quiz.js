(function(window) {
  "user strict";
  var BUTTON_LOGOUT = "[data-button=logout]";
  var BUTTON_CREATE = "[data-button=newQuiz]";
  var DIV_CHARACTER = "[data-character=character]";
  var App = window.App;
  var ButtonHandler = App.ButtonHandler;
  var buttonHandler = new ButtonHandler(BUTTON_LOGOUT);
  var createNewQuiz = new ButtonHandler(BUTTON_CREATE);
  buttonHandler.addLogoutHandler();
  createNewQuiz.addCreateNewQuiz();
  var dpd = window.dpd;
  var GetCharacter = App.GetCharacter;
  var getCharacter = new GetCharacter(DIV_CHARACTER);
  dpd.users.me(function(results, error) {
    if (error) {
      alert(error.message);
    } else {
      dpd.quiz.get({
        username: results.username
      }, function(results, err) {
        if (err) {
          return alert(err.message || "an error occurred.");
        }

        const myQuestions = [];
        results.forEach(function(data) {
          myQuestions.push({
            question: data.question,
            answers: {
              a: data.optionA,
              b: data.optionB,
              c: data.optionC
            },
            correctAnswer: data.answer
          });
        });

        function buildQuiz() {
          //stores html output
          const output = [];


          myQuestions.forEach((currentQuestion, questionNumber) => {
            //stores answer choices
            const answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {
              // ...add an HTML radio button
              answers.push(
                `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
              );
            }

            // add this question and its answers to the output
            output.push(
              `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
            );
          });

          // finally combine our output list into one string of HTML and put it on the page
          quizContainer.innerHTML = output.join("");
        }


        var characterA = 0;
        var characterB = 0;
        var characterC = 0;
        var max = 0;
        var chosenCharacter;

        function showResults() {
          // gather answer containers from our quiz
          const answerContainers = quizContainer.querySelectorAll(".answers");

          // keep track of user's answers
          let numCorrect = 0;

          // for each question...
          myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            console.log(results[0].username);
            dpd.character.get({
              username: results[0].username
            }, function(characters, error) {
              console.log(characters);
              if (error) {
                return alert(err.message || "an error occurred.");
              }
              if (userAnswer === "a") {
                characterA++;
              }
              if (userAnswer === "b") {
                characterB++;
              }
              if (userAnswer === "c") {
                characterC++;
              }
              max = characterA;
              chosenCharacter = characters[0].characterA;
              if (characterB > max) {
                max = characterB;
                chosenCharacter = characters[0].characterB;
              }
              if (characterC > max) {
                max = characterC;
                chosenCharacter = characters[0].characterC;
              }
              console.log("A: " + characterA);
              console.log("B: " + characterB);
              console.log("C: " + characterC);
              console.log(max);
              getCharacter.addRow(chosenCharacter);
            });


            // const character = [];
            // character.push(
            //   `<div>${chosenCharacter}</div>
            //     <div>${max}</div>`
            // );


            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
              // add to the number of correct answers
              numCorrect++;

              // color the answers green
              answerContainers[questionNumber].style.color = "lightgreen";
            } else {
              // if answer is wrong or blank
              // color the answers red
              answerContainers[questionNumber].style.color = "red";
            }
          });

          // show number of correct answers out of total
          resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        }

        function showSlide(n) {
          slides[currentSlide].classList.remove("active-slide");
          slides[n].classList.add("active-slide");
          currentSlide = n;

          if (currentSlide === 0) {
            previousButton.style.display = "none";
          } else {
            previousButton.style.display = "inline-block";
          }

          if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
          } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
          }
        }

        function showNextSlide() {
          showSlide(currentSlide + 1);
        }

        function showPreviousSlide() {
          showSlide(currentSlide - 1);
        }

        const quizContainer = document.getElementById("quiz");
        const resultsContainer = document.getElementById("results");
        const submitButton = document.getElementById("submit");

        // display quiz right away
        buildQuiz();

        const previousButton = document.getElementById("previous");
        const nextButton = document.getElementById("next");
        const slides = document.querySelectorAll(".slide");
        let currentSlide = 0;

        showSlide(0);

        // on submit, show results
        submitButton.addEventListener("click", showResults);
        previousButton.addEventListener("click", showPreviousSlide);
        nextButton.addEventListener("click", showNextSlide);
      });
    }
  });
})(window);
