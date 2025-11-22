const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText  = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
    {
        question: "What is the capital of France ?",
        answers: [
            { text: "London", correct: false},
            { text: "Berlin", correct: false},
            { text: "Paris", correct: true},
            { text: "Madrid", correct: false},
        ],
    },

    {
        question: "Which planet is known as the Red Planet ?",
        answers: [
            { text: "Venus", correct: false},
            { text: "Mars", correct: true},
            { text: "Jupiter", correct: false},
            { text: "Saturn", correct: false},
        ],
    }, 

    {
        question: "What is the largest ocean on Earth ?",
        answers: [
            { text: "Atlantic Ocean", correct: false},
            { text: "Indian Ocean", correct: false},
            { text: "Arcic Ocean", correct: false},
            { text: "Pacific Ocean", correct: true},
        ],
    }, 

    {
        question: "Which array method adds one or more elements to the end of an array in JavaScript ?",
        answers: [
            { text: "pop()", correct: false},
            { text: "shift()", correct: false},
            { text: "push()", correct: true},
            { text: "unshift()", correct: false},
        ],
    }, 

    {
        question: "What does the 'event.target' property represents in JavaScript ?",
        answers: [
            { text: "The CSS selector of the event", correct: false},
            { text: "The original element that triggered the event", correct: true},
            { text: "The parent element of the event", correct: false},
            { text: "The function that handles the event", correct: false},
        ],
    }, 

];


//QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;   
maxScoreSpan.textContent = quizQuestions.length;


// event listeners
startButton.addEventListener('click', startQuiz);
startButton.addEventListener('touchstart', startQuiz);

restartButton.addEventListener('click', restartQuiz);
restartButton.addEventListener('touchstart', restartQuiz);


function startQuiz() {
    //reset quiz
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}


function showQuestion() {
    answersDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"

    questionText.textContent = currentQuestion.question

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener('click', selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event){
    if(answersDisabled) return

    answersDisabled = true 

    const selectedButton = event.target;
    const isCorect = selectedButton.dataset.correct === "true"

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }else if (button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorect){
        score++;
        scoreSpan.textContent = score
    }

    setTimeout( () => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        }else{
            showResults()
        }
    }, 1000)
}

function showResults(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100

    if(percentage === 100){
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    }else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!"
    } else if (percentage >= 40){
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}
