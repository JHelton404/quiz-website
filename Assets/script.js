// Quiz Answer Key: 1-C, 2-B, 3-C, 4-D, 5-B, 6-C, 7-A, 8-C, 9-D, 10-D, 11-B, 12-A

// Global Variables
// Possible Screens
var welcomePage = document.getElementById("welcomePage")
var endScreen = document.getElementById("endScreen")
var question = document.getElementById("question")
var winSubmit = document.getElementById("winSubmit")

// Timer things
var countdownTimer
var countdownDisplay = document.getElementById("countdownDisplay")
var timer

// Question trackers
var winTracker = 0
var lossTracker = 0
var correctTotal
var score = document.getElementById("score")
var questionFirst

// Win Submit Input and Trackers
var initialsInput = document.getElementById("initials")
var save 
var newSave
var usernameInput

// Question Object Array
var questions = [{
  question: "1. What does the Earth look like?",
  answers: ['answerA', 'answerB', 'answerC', 'answerD'],
  correct: "answerA"
}, {
  question: "2. What does the Earth sound like?",
  answers: ['answerA', 'answerB', 'answerC', 'answerD'],
  correct: "answerA"
}, {
  question: "3. What does the Earth feel like?",
  answers: ['answerA', 'answerB', 'answerC', 'answerD'],
  correct: "answerA"
}, {
  question: "4. What does the Earth taste like?",
  answers: ['answerA', 'answerB', 'answerC', 'answerD'],
  correct: "answerA"
}]


// When a player presses the button to start the game, this is what initializes the next game. Numerical variables are reset, welcome page disappears, and question pages start up.
function quizEvent(){
  correctTotal = 0;
  countdownTimer = 60;
  questionFirst = 0;
  welcomePage.style.display = "none"
  question.style.display = "block"
  countdown();
  displayQuestion();
}

// This function sorts which question the user is currently on by navigating the Question Array Objects listed above.
function displayQuestion(){
  document.getElementById("firstQuestion").textContent=questions[questionFirst].question
  document.getElementById("answerA").textContent=questions[questionFirst].answers[0]
  document.getElementById("answerB").textContent=questions[questionFirst].answers[1]
  document.getElementById("answerC").textContent=questions[questionFirst].answers[2]
  document.getElementById("answerD").textContent=questions[questionFirst].answers[3]
}

// Countdown keeps track of the timer throughout the game
// If the timer reaches 0, the game should end (runs gameOver function)
function countdown(){
  timer = setInterval(function(){
    countdownTimer--;
    countdownDisplay.textContent = countdownTimer + "remaining";
    if(countdownTimer <= 0) {
      gameOver();
    }
  }, 1000);
}

// Function to check whether or not the answer chosen by the player was correct
// If a button is pressed, it should navigate to the next question regardless of correct or incorrect
// If an incorrect answer is chosen, the amount of time left is penalized and the timer goes down
// Once the player exhausts all possible questions from the array, the gameOver function should run.
function checkAnswer(e){
  if (e.target.matches("button")){
    if (questions[questionFirst].correct === e.target.textContent) {
      correctTotal++;
    } else {
      countdownTimer -= 10;
    }
    questionFirst++;
    if (questionFirst === questions.length) {
      gameOver();
    }
    else {displayQuestion();}
  }
}

// Function makes the end screen appear and the question screen disappear
// Timer clears
// If the player wins, they get to add their name to the list of winners and the win counter should increase
// If the player loses, the loss counter should increase
// Player will also get to choose to play again from this page
function gameOver(){
  question.style.display = "none"
  endScreen.style.display = "block"
  clearInterval(timer)
  score.textContent = correctTotal + " correct"
  if (correctTotal === questions.length) {
    winSubmit.style.display = "block"
    winTracker++;
  } else if (correctTotal < questions.length) {
    loserCorner.style.display = "block"
    lossTracker++;
  }
  submitForm();
  pull();
  store();
}


function submitForm(){
  usernameInput = initialsInput.value
  person = {
    userName: usernameInput,
    scoreW: winTracker,
    scoreL: lossTracker
  }
}
function pull(){
  save = JSON.parse(localStorage.getItem('scoreBox'));
}
function store() {
  if (save == null) {
    save = []
  }
  newSave = person;
  save.push(newSave);
  localStorage.setItem('scoreBox', JSON.stringify(save));
  console.log(save)
}


function replay(){
  question.style.display = "none"
  endScreen.style.display = "none"
  winSubmit.style.display = "none"
  loserCorner.style.display = "none"
  welcomePage.style.display = "block"
}

document.querySelector("#submitScore").addEventListener("submit", usernameInput)


document.querySelector("#retryBtn").addEventListener("click", replay)
document.querySelector("#nextQuestion").addEventListener("click", checkAnswer);
document.querySelector(".quizStart").addEventListener("click", quizEvent);