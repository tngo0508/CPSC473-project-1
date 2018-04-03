# QuizCreator

-   This application allows users to register or login to their account first. When a user does not have an account, he or she will create one by entering an email address and a password. A user is then asked to login after registering and will be able to create a quiz. When users are done creating a quiz they can create another quiz or allow someone to take the quiz to find out the results after taking the quiz. </br>
    Creating a quiz works as follows:

    -   Enter the question
    -   Enter up to three possible answers
    -   Enter the correct answer
    -   Continue to create a next question and repeat the process.

-   This application is user-friendly, so anyone can use it. A computer is needed to execute the application locally. This version is local.

-   Upon registering users must include a valid email address. Users will be able to access previously saved data in the Deployd database. Deployd keeps track of the emails, passwords, and quizzes created by the users.

-   This application is a project for a front-end course. We were asked to use client-side JavaScript, Ajax, and Deployd to build one of the applications asked by the professor. The one we selected was, “Visitors can create their own which character are you? Quizzes.”

## Screenshots of QuizCreator

### index.html

![index](screenshots/index.png)

### contactUs.html

![contactUs](screenshots/contactUs.png)

### login.html

![login](screenshots/login.png)

### register.html

![register](screenshots/register.png)

### main.html

![main](screenshots/main.png)

### character.html

![character](screenshots/character.png)

### quiz.html

![quiz](screenshots/quiz.png)

## Core Technical Concepts/Inspiration

We made this app as a project for a front-end course assignment.
This app will work for anyone who wants to be creative and fun!
With QuizCreator you will be able to access old quizzes and log in to your own account with data stored on an online database. You will also create your own quiz so that you don’t have to go looking for a specific quiz that may not even exist.

## Getting Started/Requirements/Prerequisites/Dependencies

Include any essential instructions for:

-   clone master branch to your local machine
-   use command `dpd create new-project-1` to create your new directory for deployd database
-   copy **public** and **resources** directory to your new-project-1
-   run it by `dpd -d`
-   go to <http://localhost:2403/> on web-browser, the website will be running

## Built-With

-   [jQuery API](https://api.jquery.com/) - a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.
-   [Deployd](http://docs.deployd.com/docs/getting-started/what-is-deployd.html) - a tool that makes building APIs simple by providing important ready-made functionality out of the box that meet the demands of complex applications.
-   [Bootstrap 4.0](https://getbootstrap.com/docs/4.0/getting-started/introduction/) - an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery.

## To-Do

-   Enhance UI
-   Fix Minor Bugs
-   Add More Useful Features
-   Need to implement Forgot Password feature

## Authors/Contributors

-   **Ngo,Thomas** - _tngo0508@csu.fullerton.edu_ - [tngo0508](https://github.com/tngo0508)
-   **Derderian,Grace Bernadette** - _grace.derderian@csu.fullerton.edu_ - [gracederderian](https://github.com/gracederderian)
-   **Adame,Alan** - _aadame4@csu.fullerton.edu_ - [aadame13](https://github.com/aadame13)
-   **Villanueva,Christopher R** - _cvillanueva19@csu.fullerton.edu_ - [chrisvillan](https://github.com/chrisvillan)
-   **Afredi,Momtaz Mohmad** - _mafredi1@csu.fullerton.edu_ [mafredi](https://github.com/mafredi) 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgements

-   _Front-End Web Development: The Big Nerd Ranch Guide_, Aquino and Gandee, Pearson, ISBN: 0134433947
-   **Professor Kenytt Avery** - _kavery@fullerton.edu_ - California State University, Fullerton
-   **Yaphi Berhanu** - _<https://www.sitepoint.com/simple-javascript-quiz/>_
