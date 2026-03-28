import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzyWTpeqw1ByNig9-330uB-x3It0lXF8k",
  authDomain: "quiz-5924e.firebaseapp.com",
  projectId: "quiz-5924e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// LOGIN
document.getElementById("googleLogin").onclick = () => {
  signInWithPopup(auth, provider);
};

// LOGOUT
document.getElementById("logoutBtn").onclick = () => {
  signOut(auth);
};

// STATE
onAuthStateChanged(auth, user => {
  if (user) {
    login.classList.add("hidden");
    categories.classList.remove("hidden");
    logoutContainer.classList.remove("hidden");
  } else {
    login.classList.remove("hidden");
    categories.classList.add("hidden");
    logoutContainer.classList.add("hidden");
  }
});

// ---------------- QUIZ ----------------

function generateQuestions(name) {
  let arr = [];
  for (let i = 1; i <= 20; i++) {
    arr.push({
      q: `${name} въпрос ${i}?`,
      a: ["Отговор 1", "Отговор 2"],
      correct: 0
    });
  }
  return arr;
}

const quizzes = {
  tech: generateQuestions("Компютри"),
  internet: generateQuestions("Интернет"),
  friendship: generateQuestions("Приятелство"),
  games: generateQuestions("Игри"),
  movies: generateQuestions("Филми"),
  music: generateQuestions("Музика"),
  sports: generateQuestions("Спорт"),
  general: generateQuestions("Обща култура"),
};

let currentQuiz = [];
let index = 0;
let score = 0;
let type = "";

window.startQuiz = function(category) {
  type = category;
  currentQuiz = quizzes[category];
  index = 0;
  score = 0;

  categories.classList.add("hidden");
  quiz.classList.remove("hidden");

  showQuestion();
};

function showQuestion() {
  let q = currentQuiz[index];
  question.innerText = q.q;

  answers.innerHTML = "";
  q.a.forEach((ans, i) => {
    let btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => answer(i);
    answers.appendChild(btn);
  });
}

function answer(i) {
  if (i === currentQuiz[index].correct) score++;
  index++;

  if (index < currentQuiz.length) showQuestion();
  else showResult();
}

function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  let percent = Math.round((score / currentQuiz.length) * 100);

  scoreText = type === "friendship"
    ? `❤️ Съвместимост: ${percent}%`
    : `🎯 Резултат: ${percent}%`;

  document.getElementById("score").innerText = scoreText;
}
