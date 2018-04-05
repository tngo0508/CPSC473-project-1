(function(window) {
  "user strict";
  var BUTTON_LOGOUT = "[data-button=logout]";
  var BUTTON_CREATE = "[data-button=newQuiz]";
  var DIV_CHARACTER = "[data-character=character]";
  var PROGRESS_BAR = "[data-progress-bar]";
  var App = window.App;
  var ButtonHandler = App.ButtonHandler;
  var buttonHandler = new ButtonHandler(BUTTON_LOGOUT);
  var createNewQuiz = new ButtonHandler(BUTTON_CREATE);
  buttonHandler.addLogoutHandler();
  createNewQuiz.addCreateNewQuiz();
  var dpd = window.dpd;
  var GetCharacter = App.GetCharacter;
  var getCharacter = new GetCharacter(DIV_CHARACTER);
  var ProgressBar = App.ProgressBar;
  var progressBar = new ProgressBar(PROGRESS_BAR);

// Followed tutorial; https://www.sitepoint.com/simple-javascript-quiz/
/*How we changed the functionality of code.
    Online: Quiz was originally, a question w/ a "correct" answer. Then at the end of the quiz, it will display how much you have correct

    Our implementation: We took out the part that determines the correct answer. Our algorithim calculates which of the A,B,C answers the user picks the most.
    Then at the end, we display the character type based on the most amounts of answer type. So if user picks mainly answer A's then they will be Character A.
    The correct answer was also hardcoded before, but we implemented grabbibg from deployd database
*/


  //gets current user
  dpd.users.me(function(results, error) {
    if (error) {
      alert(error.message);
    } else {

      //grap results (questions and answers) from deployd
      dpd.quiz.get({
        username: results.username
      }, function(results, err) {
        if (err) {
          return alert(err.message || "an error occurred.");
        }

        var numberOfQuestion = 0;
        const myQuestions = [];
        results.forEach(function(data) {
        //pushing results (questions and answers) from deployd
          myQuestions.push({
            question: data.question,
            answers: {
              a: data.optionA,
              b: data.optionB,
              c: data.optionC
            }
            // correctAnswer: data.answer
          });
          numberOfQuestion++;
        });

        console.log("Number of question: " + numberOfQuestion);


//start of online code
//this part of the code will add radio buttons and questions to output

        function buildQuiz() {
          //stores html output
          const output = [];


          myQuestions.forEach((currentQuestion, questionNumber) => {
            //stores answer choices
            const answers = [];
            for (letter in currentQuestion.answers) {
              //ES6 syntax - creates radio buttons based on number of answered stored
              answers.push(
                `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
              );
            }
            //ES6 syntax - add this question and its answers to the output
            output.push(
              `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
            );
          });
          //for the es6 syntax, we had trouble converting to es5

          // finally combine our output list into one string of HTML and put it on the page
          quizContainer.innerHTML = output.join("");
        }
//end of online code


/*
original online code, implemented having a "correct" answer per question.
But we wanted to implement a character evaluation based on the answers. So no "wrong" or "correct" answer.
*/
        var characterA = 0;
        var characterB = 0;
        var characterC = 0;
        var max = 0;
        var chosenCharacter;
        var answeredQuestion = 0;

//online code -

        function showResults() {
          //gather answer containers from our quiz
          const answerContainers = quizContainer.querySelectorAll(".answers");

          // keep track of user's answers
          myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer && answeredQuestion < numberOfQuestion) {
              answeredQuestion++;
            }

//end of online code
            console.log("Number of answered questions: " + answeredQuestion);

            console.log(results[0].username);

            //gets answer and adds count to the character. Then at the end displays greatest count
            dpd.character.get({
              username: results[0].username
            }, function(characters, error) {
              console.log(characters);
              console.log("questionNumber: " + questionNumber);
              console.log("currentQuestion: " + currentQuestion.question);
              if (error) {
                return alert(err.message || "an error occurred.");
              }
              if (userAnswer === "a" && characterA < numberOfQuestion) {
                characterA++;
              }
              if (userAnswer === "b" && characterB < numberOfQuestion) {
                characterB++;
              }
              if (userAnswer === "c" && characterC < numberOfQuestion) {
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
              console.log(answeredQuestion);
              if (max === 0 || answeredQuestion < numberOfQuestion) {
                chosenCharacter = "undefined since you haven't completed the quiz yet. Please refresh the page to retake the quiz.";
              }
              console.log("A: " + characterA);
              console.log("B: " + characterB);
              console.log("C: " + characterC);
              console.log("Maximum: " + max);
              getCharacter.addRow(chosenCharacter);
            });

          });
        }

//start of online code
        //displays quiz with a slide-based ui and implements transition for the previous and next buttons
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
        // extra element we added - progressbar
        //creates and calculates progress and displays it underneath
        var current = 1;
        var width = (current / numberOfQuestion * 100).toFixed(0);
        progressBar.addRow(width);

        function showNextSlide() {
          showSlide(currentSlide + 1);
          current++;
          width = (current / numberOfQuestion * 100).toFixed(0);
          progressBar.addRow(width);
        }

        function showPreviousSlide() {
          showSlide(currentSlide - 1);
          current--;
          width = (current / numberOfQuestion * 100).toFixed(0);
          progressBar.addRow(width);
        }

        const quizContainer = document.getElementById("quiz");
        const resultsContainer = document.getElementById("results");
        const submitButton = document.getElementById("submit");

        buildQuiz();

        const previousButton = document.getElementById("previous");
        const nextButton = document.getElementById("next");
        const slides = document.querySelectorAll(".slide");
        let currentSlide = 0;

        showSlide(0);

        submitButton.addEventListener("click", showResults);
        previousButton.addEventListener("click", showPreviousSlide);
        nextButton.addEventListener("click", showNextSlide);
      });
    }
  });

//end of online code
})(window);
