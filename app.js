// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAzyWTpeqw1ByNig9-330uB-x3It0lXF8k",
  authDomain: "quiz-5924e.firebaseapp.com",
  projectId: "quiz-5924e",
  storageBucket: "quiz-5924e.firebasestorage.app",
  messagingSenderId: "88686809682",
  appId: "1:88686809682:web:228032c5b1202f2dbe858b",
  measurementId: "G-0G8XP44WDV"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google login
const loginBtn = document.getElementById("googleLogin");

loginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      console.log("Влязъл потребител:", user.displayName);
      document.getElementById("login").classList.add("hidden");
      document.getElementById("categories").classList.remove("hidden");
    })
    .catch(error => {
      console.error(error);
      alert("Грешка при логин с Google");
    });
});

// Ако потребителят вече е влязъл
onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("categories").classList.remove("hidden");
  }
});

// ------------------------
// Quiz logic
// ------------------------
const quizzes = {
  tech: [
    { q: "Какво е RAM?", a: ["Памет", "Процесор"], correct: 0 },
    { q: "HTML е?", a: ["Език за структура", "ОС"], correct: 0 }
  ],
  internet: [
    { q: "Какво е URL?", a: ["Адрес", "Файл"], correct: 0 },
    { q: "Wi-Fi е?", a: ["Мрежа", "Хард диск"], correct: 0 }
  ],
  friendship: [
    { q: "Обичаш ли да излизаш с приятели?", a: ["Да", "Не"], correct: 0 },
    { q: "Споделяш ли тайни?", a: ["Да", "Не"], correct: 0 }
  ]
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

  document.getElementById("categories").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  showQuestion();
};

function showQuestion() {
  let q = currentQuiz[index];
  document.getElementById("question").innerText = q.q;

  let answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.a.forEach((ans, i) => {
    let btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => answer(i);
    answersDiv.appendChild(btn);
  });
}

function answer(i) {
  if (i === currentQuiz[index].correct) score++;

  index++;
  if (index < currentQuiz.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  let percent = Math.round((score / currentQuiz.length) * 100);
  if (type === "friendship") {
    document.getElementById("score").innerText = `❤️ Съвместимост: ${percent}%`;
  } else {
    document.getElementById("score").innerText = `🎯 Резултат: ${percent}%`;
  }
}
