const questions = [
  {
    question: "ما عاصمة فرنسا؟",
    answers: [
      { text: "باريس", correct: true },
      { text: "لندن", correct: false },
      { text: "برلين", correct: false },
      { text: "مدريد", correct: false }
    ]
  },
    {
    question: "ما عاصمة أمريكا؟",
    answers: [
      { text: "نيويوك", correct: false },
      { text: "واشنطن", correct: true },
      { text: "برلين", correct: false },
      { text: "يوتا", correct: false }
    ]
  },
   {
    question: "ما عاصمة لبنان؟",
    answers: [
      { text: "بيروت", correct: true },
      { text: "لندن", correct: false },
      { text: "لبنان", correct: false },
      { text: "رياض", correct: false }
    ]
  },
    {
    question: "ما عاصمة العراق؟",
    answers: [
      { text: "موسكو", correct: false },
      { text: "خرطوم", correct: false },
      { text: "سانت بوترسبورغ", correct: false },
      { text: "بغداد", correct: true }
    ]
  },
  {
    question: "ما هو أكبر كوكب في المجموعة الشمسية؟",
    answers: [
      { text: "الأرض", correct: false },
      { text: "المشتري", correct: true },
      { text: "زحل", correct: false },
      { text: "المريخ", correct: false }
    ]
  },
  {
    question: "ما هي لغة البرمجة المستخدمة لإنشاء صفحات الويب؟",
    answers: [
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
      { text: "Java", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = "النقاط: 0";
  endScreen.classList.add("hidden");
  document.getElementById("question-container").classList.remove("hidden");
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });

  startTimer();
}

function resetState() {
  clearInterval(timerInterval);
  timeLeft = 15;
  timerElement.textContent = "الوقت: " + timeLeft;
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = "الوقت: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
      });
      nextButton.style.display = "block";
    }
  }, 1000);
}

function selectAnswer(e) {
  clearInterval(timerInterval);
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) {
    score++;
    scoreElement.textContent = "النقاط: " + score;
  }

  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === "true");
  });

  nextButton.style.display = "block";
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
});

function endGame() {
  document.getElementById("question-container").classList.add("hidden");
  nextButton.style.display = "none";
  endScreen.classList.remove("hidden");
  finalScore.textContent = `انتهت اللعبة! نتيجتك: ${score} من ${questions.length}`;
}

restartButton.addEventListener("click", startQuiz);

startQuiz();
