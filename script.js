// DOM ELEMENT
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const quitButton = document.getElementById("quit-btn");

// QUIZ DATA
const quizQuestions = [
  {
    question: "Kapan Hari Bhayangkara diperingati setiap tahunnya?",
    answers: [
      { text: "1 Juni", correct: false },
      { text: "1 Juli", correct: true },
      { text: "17 Agustus", correct: false },
      { text: "5 Oktober", correct: false },
      { text: "10 November", correct: false },
    ],
  },
  {
    question: "Apa kepanjangan dari POLRI?",
    answers: [
      { text: "Polisi Republik Indonesia", correct: false },
      { text: "Polisi Nasional Indonesia", correct: false },
      { text: "Polisi Negara Indonesia", correct: false },
      { text: "Kepolisian Negara Republik Indonesia", correct: true },
      { text: "Polisi Rakyat Indonesia", correct: false },
    ],
  },
  {
    question: "Siapakah Kapolri tahun 2025?",
    answers: [
      { text: "Jenderal Polisi Idham Azis", correct: false },
      { text: "Jenderal Polisi Tito Karnavian", correct: false },
      { text: "Jenderal Polisi Listyo Sigit Prabowo", correct: true },
      { text: "Jenderal Polisi Badrodin Haiti", correct: false },
      { text: "Jenderal Polisi Sutarman", correct: false },
    ],
  },
  {
    question: "Apa motto resmi Polri?",
    answers: [
      { text: "Satya Haprabu", correct: false },
      { text: "Rastra Sewakottama", correct: true },
      { text: "Tribrata", correct: false },
      { text: "Catur Prasetya", correct: false },
      { text: "Wira Dharma", correct: false },
    ],
  },
  {
    question: "Apa nama lembaga pendidikan calon perwira Polri?",
    answers: [
      { text: "STIN", correct: false },
      { text: "Akpol", correct: true },
      { text: "Akmil", correct: false },
      { text: "Seskoal", correct: false },
      { text: "IPDN", correct: false },
    ],
  },
  {
    question: "Undang-undang yang mengatur tentang Kepolisian Negara Republik Indonesia adalah?",
    answers: [
      { text: "UU No. 2 Tahun 2002", correct: true },
      { text: "UU No. 34 Tahun 2004", correct: false },
      { text: "UU No. 5 Tahun 1999", correct: false },
      { text: "UU No. 17 Tahun 2014", correct: false },
      { text: "UU No. 9 Tahun 2015", correct: false },
    ],
  },
  {
    question: "Unit Polri yang bertugas menangani kejahatan siber adalah?",
    answers: [
      { text: "Brimob", correct: false },
      { text: "Satlantas", correct: false },
      { text: "Densus 88", correct: false },
      { text: "Direktorat Siber Bareskrim", correct: true },
      { text: "Divisi Humas Polri", correct: false },
    ],
  },
  {
    question: "Densus 88 Polri dibentuk untuk menangani?",
    answers: [
      { text: "Kejahatan narkoba", correct: false },
      { text: "Kejahatan dunia maya", correct: false },
      { text: "Kasus korupsi", correct: false },
      { text: "Terorisme", correct: true },
      { text: "Kejahatan lalu lintas", correct: false },
    ],
  },
  {
    question: "Lambang Polri terdiri dari tiga bagian utama, yaitu?",
    answers: [
      { text: "Bintang, tameng, dan pita", correct: true },
      { text: "Obor, padi, dan kapas", correct: false },
      { text: "Pedang, perisai, dan garuda", correct: false },
      { text: "Timbangan, pedang, dan kitab", correct: false },
      { text: "Keris, pita, dan cahaya", correct: false },
    ],
  },
  {
    question: "Tribrata sebagai pedoman hidup anggota Polri berisi?",
    answers: [
      { text: "2 butir", correct: false },
      { text: "3 butir", correct: true },
      { text: "4 butir", correct: false },
      { text: "5 butir", correct: false },
      { text: "6 butir", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

// set jumlah soal & skor maksimal
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length * 10;

// event listener
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
quitButton.addEventListener("click", quit)

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  // hitung progress
  const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  // tampilkan pertanyaan
  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("Benar");
    } else if (button === selectedButton) {
      button.classList.add("Salah");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score * 10;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Hebat! Pengetahuan kamu sangat luas 🎉";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Keren! Kamu pintar menjawab soal ini 👍";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Bagus! Terus berlatih 💪";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Cukup bagus, terus tingkatkan kemampuanmu 😉";
  } else {
    resultMessage.textContent = "Jangan menyerah! Masih bisa belajar lagi 🔥";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}


function quit(){
  quizScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  startScreen.classList.add("active")
}