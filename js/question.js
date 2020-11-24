var question = document.getElementById('question');
var choices = Array.from(document.getElementsByClassName('choice-text'));
var questionCounterText = document.getElementById("questionCounter");
var timerText = document.getElementById("timer");

var currentQuestion = {};
var acceptingAnswers = false;
var score = 75;
var questionCounter = 0;
var availableQuesions = [];

//Quiz Questions

var questions = [
    {
        question: 'When a user views a page containing a JavaScript program, which machine actually executes the script?',
        choice1: "The User's machine running a Web browser",
        choice2: "The Web server",
        choice3: "A central machine deep within Netscape's corporate offices",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
    {
        question: "What are variables used for in JavaScript Programs?",
        choice1: "Storing numbers, dates, or other values",
        choice2: "Varying randomly",
        choice3: "Causing high-school algebra flashbacks",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "Which of the following are capabilities of functions in JavaScript?",
        choice1: "Return a value",
        choice2: "Accept parameters",
        choice3: "Accept parameters and Return a value",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "How does JavaScript store dates in a date object?",
        choice1: "The number of milliseconds since January 1st, 1970",
        choice2: "The number of days since January 1st, 1900",
        choice3: "The number of seconds since Netscape's public stock offering.",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "Which of the following best describes JavaScript?",
        choice1: "A low-level programming language.",
        choice2: "A scripting language precompiled in the browser.",
        choice3: "A compiled scripting language.",
        choice4: "An object-oriented scripting language.",
        answer: 4,
    },
];

//CONSTANTS
var MAX_QUESTIONS = 7;

//Start the quiz. Two functions will run - generate new question, and countdown timer
function startGame () {
    questionCounter = 0;
    score = 75;
    availableQuesions = [...questions];
    getNewQuestion();
    countDown();
};

//Generate a new question
function getNewQuestion () {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page when all questions have been answered
        return window.location.assign('../pages/score.html');
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    
    //Generate question from the question bank randomly
    var questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        var number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

  //Checks whether user answers a given question correctly
  choices.forEach(choice => {
    choice.addEventListener("click", function(e) {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      var selectedChoice = e.target;
      var selectedAnswer = selectedChoice.dataset["number"];
  
      var classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "incorrect" && score > 0) {
            score -= 10;
            timerText.textContent = score;
          } 
  
      selectedChoice.parentElement.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });




//Countdown Timer
function countDown() {

    setInterval(function() {
        if (score > 0) { 
            score--;
            timerText.textContent = score;
        }

        if (score <= 0) {
            clearInterval();
            return window.location.assign('../pages/score.html');
        }
    }, 1000);
}


  
  startGame();
  