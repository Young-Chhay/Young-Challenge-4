var startBtn =document.getElementById("start-btn")
var nextBtn =document.getElementById("next-btn")
var questionContainerEl = document.getElementById('question-container')
var highScoreEl =document.getElementById('high-score')
var questionEl = document.getElementById('question')
var answerBtnEl = document.getElementById('answer-buttons')
var shufQuestions = ""
var currentQuestions = ""
var timeEl = document.querySelector("#timer");
var secondsLeft = 60;
var questionsLi = [
    {
        question: 'What is HTML ?',
        answers: [
            { text: 'Hypertext Markup Language', correct: true},
            { text: 'Hey there my love', correct: false},
            { text: 'Hit the main lobby', correct: false},
            { text: 'How to mow lawn', correct: false},
        ]
    },
    {
        question: 'What is CSS ?',
        answers: [
            { text: 'Cant stand shits', correct: false},
            { text: 'Counter-Strike source ', correct: false},
            { text: 'Counselling student service', correct: false},
            { text: "Cascading style sheet", correct: true},
        ]
    },
    {
        question: 'What is Javascript ?',
        answers: [
            { text: 'Cascading Style sheet', correct: false},
            { text: 'Old ancient script', correct: false},
            { text: 'Interactive Web programming language', correct: true},
            { text: 'Cookies made from Javasian', correct: false},
        ]
    },
    {
        question: 'What is a Programming language ?',
        answers: [
            { text: 'Language specifically design for Nerds to rap in battle', correct: false},
            { text: 'New technique of training dragons', correct: false},
            { text: 'Is any set of rules that converts strings of command into machine code output', correct: true},
            { text: 'New language to program animals ', correct: false},
        ]
    },
    {
        question: 'What is Wireframing ?',
        answers: [
            { text: 'Is a layout of a web page that demonstrates what interface will exist on key page. ( Designing) ', correct: true},
            { text: 'Wrapping wires around a Frame', correct: false},
            { text: 'Add lighting around Picture Frame', correct: false},
            { text: "New Justin Bieber No.1 song", correct: false},
        ]
    },
]

startBtn.addEventListener('click', startQuiz)
nextBtn.addEventListener('click', function() {
    currentQuestions++;
    setNextQuestion()
})

function startQuiz() {
    startBtn.classList.add('hide')
    shufQuestions = questionsLi.sort( function() { Math.random() +.5})
    currentQuestions = 0 
    questionContainerEl.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetQuestion()
    showQuestion(shufQuestions[currentQuestions])

}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        } 
        button.addEventListener('click', selectAnswer) 
        answerBtnEl.appendChild(button)
    })
}

function selectAnswer(Event) {
    var selectedBtn = Event.target
    var correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtnEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shufQuestions.length > currentQuestions +1) {
        nextBtn.classList.remove('hide')
    } else {
        highScoreEl.classList.remove('hide')
        timeEl.classList.add('hide')
        questionContainerEl.classList.add('hide')
        highScoreEl.textContent = secondsLeft + " Seconds. You passed Buddy !!! "
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        secondsLeft = secondsLeft + 11
    } else {
        punishFalse()
        element.classList.add('wrong')
    }
}

function punishFalse() {
    secondsLeft = secondsLeft - 5
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function resetQuestion() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}

startBtn.addEventListener('click', function() {
    var timerInterval = setInterval( function() {
        secondsLeft--
        timeEl.textContent = secondsLeft + " seconds left before you lose!";
        if (secondsLeft==0) {
            timeEl.textContent = 'You Lost !';
            clearInterval(timerInterval);
            sendMessage(); 
        } else {

        }
    }, 1000);
})

function sendMessage() {
    questionContainerEl.classList.add('hide');
    highScoreEl.textContent = " 0 Seconds. You lost !!! "
}
