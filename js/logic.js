//When "Start Quiz" button is clicked, show the first question and start the countdown timer
var startQuiz = document.getElementById("start");

startQuiz.addEventListener("click", function(){
    countDown();
    displayQuiz();
})

//Count down timer will be started when "Start Quiz" button is clicked. If user answers questions incorrectly, countdown will decrease by 10. Countdown stops when it reaches zero or when user has answered all questions. If countdown reaches zero or user has already answered all questions, display score
var timer = document.getElementById("timer");

function countDown(){
    var timeLeft = 75;

    var timeInterval = setInterval(function() {
        timer.textContent = "Time: " + timeLeft;
        timeLeft--;
        
        if (timeLeft === 0) {
            timer.textContent = "Time: " + timeLeft;
            clearInterval(timeInterval);
        }
    }, 1000);
}

var showQuiz = document.getElementById("quiz");

function displayQuiz(){
    var output=[];
    questions.forEach(
        (currentQuestion, questionNumber) => {
            var answers = [];

            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                     <input type="radio" name="question${questionNumber}" value="${letter}">
                     ${letter} :
                     ${currentQuestion.answers[letter]}
                     </label>`
                );
            }
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                 <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );
    showQuiz.innerHTML = output.join('');

}

