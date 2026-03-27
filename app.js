// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const logoutBtn = document.getElementById("logoutBtn");

loginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(result => {
      document.getElementById("login").classList.add("hidden");
      document.getElementById("categories").classList.remove("hidden");
      document.getElementById("logoutContainer").classList.remove("hidden");
    })
    .catch(error => alert("Грешка при логин с Google"));
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    document.getElementById("login").classList.remove("hidden");
    document.getElementById("categories").classList.add("hidden");
    document.getElementById("logoutContainer").classList.add("hidden");
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.add("hidden");
  });
});

// Ако потребителят вече е влязъл
onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("categories").classList.remove("hidden");
    document.getElementById("logoutContainer").classList.remove("hidden");
  }
});

// ------------------------
// Quiz data (20 въпроса)
// ------------------------
const quizzes = {
  tech: [
    { q: "Какво е RAM?", a: ["Памет", "Процесор"], correct: 0 },
    { q: "HTML е?", a: ["Език за структура", "ОС"], correct: 0 },
    { q: "CSS служи за?", a: ["Стилизиране", "Съхранение"], correct: 0 },
    { q: "CPU е?", a: ["Процесор", "Памет"], correct: 0 },
    { q: "SSD е?", a: ["Бърз диск", "Монитор"], correct: 0 },
    { q: "GPU е?", a: ["Видео карта", "Мишка"], correct: 0 },
    { q: "Python е?", a: ["Език за програмиране", "Операционна система"], correct: 0 },
    { q: "JavaScript се използва за?", a: ["Динамика на сайт", "Хранилище"], correct: 0 },
    { q: "HTML таг <a>?", a: ["Линк", "Картина"], correct: 0 },
    { q: "CSS Flexbox е?", a: ["Подредба на елементи", "Сървър"], correct: 0 },
    { q: "IP адрес е?", a: ["Идентификатор на устройство", "Програма"], correct: 0 },
    { q: "DNS служи за?", a: ["Намиране на сайтове", "Шифроване"], correct: 0 },
    { q: "Cloud computing е?", a: ["Облачни услуги", "Физически диск"], correct: 0 },
    { q: "HTML <h1>?", a: ["Заглавие", "Текст"], correct: 0 },
    { q: "VPN е?", a: ["Виртуална мрежа", "Антивирус"], correct: 0 },
    { q: "API е?", a: ["Интерфейс за връзка", "Памет"], correct: 0 },
    { q: "Git е?", a: ["Система за версии", "Браузър"], correct: 0 },
    { q: "Framework е?", a: ["Среда за разработка", "Сървър"], correct: 0 },
    { q: "HTML <img>?", a: ["Картинка", "Видео"], correct: 0 },
    { q: "CSS Grid е?", a: ["Система за подреждане", "Памет"], correct: 0 },
  ],

  internet: [
    { q: "Какво е URL?", a: ["Адрес", "Файл"], correct: 0 },
    { q: "Wi-Fi е?", a: ["Мрежа", "Хард диск"], correct: 0 },
    { q: "HTTP е?", a: ["Протокол", "Браузър"], correct: 0 },
    { q: "HTTPS означава?", a: ["Сигурен протокол", "База данни"], correct: 0 },
    { q: "IP адресът идентифицира?", a: ["Устройство", "Програма"], correct: 0 },
    { q: "Cookies са?", a: ["Данни за сесия", "Вируси"], correct: 0 },
    { q: "VPN защитава?", a: ["Личната информация", "Паметта"], correct: 0 },
    { q: "Search engine пример?", a: ["Google", "Word"], correct: 0 },
    { q: "Cloud storage пример?", a: ["Google Drive", "Notepad"], correct: 0 },
    { q: "Social media пример?", a: ["Facebook", "Excel"], correct: 0 },
    { q: "Domain name е?", a: ["Име на сайт", "Програма"], correct: 0 },
    { q: "Email протокол?", a: ["SMTP", "FTP"], correct: 0 },
    { q: "Firewall защитава?", a: ["Мрежата", "Монитора"], correct: 0 },
    { q: "Bandwidth е?", a: ["Капацитет на мрежата", "Диск"], correct: 0 },
    { q: "Ping измерва?", a: ["Време за реакция", "Памет"], correct: 0 },
    { q: "IP v6 има колко бита?", a: ["128", "32"], correct: 0 },
    { q: "HTML сайт се зарежда чрез?", a: ["Браузър", "ОС"], correct: 0 },
    { q: "HTTPS порт?", a: ["443", "80"], correct: 0 },
    { q: "DNS сървър прави?", a: ["Превод на имена", "Кодиране"], correct: 0 },
    { q: "ISP е?", a: ["Интернет доставчик", "Антивирус"], correct: 0 },
  ],

  friendship: [
    { q: "Обичаш ли да излизаш с приятели?", a: ["Да", "Не"], correct: 0 },
    { q: "Споделяш ли тайни?", a: ["Да", "Не"], correct: 0 },
    { q: "Помагаш ли на приятели в нужда?", a: ["Да", "Не"], correct: 0 },
    { q: "Лоялността важна ли е?", a: ["Да", "Не"], correct: 0 },
    { q: "Обичаш ли изненади за приятели?", a: ["Да", "Не"], correct: 0 },
    { q: "Често ли комуникираш?", a: ["Да", "Не"], correct: 0 },
    { q: "Споделяш радости?", a: ["Да", "Не"], correct: 0 },
    { q: "Извиняваш ли се?", a: ["Да", "Не"], correct: 0 },
    { q: "Доверие е важно?", a: ["Да", "Не"], correct: 0 },
    { q: "Подкрепяш ли в трудности?", a: ["Да", "Не"], correct: 0 },
    { q: "Обичаш ли да се шегуваш с приятели?", a: ["Да", "Не"], correct: 0 },
    { q: "Честността е важна?", a: ["Да", "Не"], correct: 0 },
    { q: "Приятелите ти знаят ли всичко за теб?", a: ["Да", "Не"], correct: 0 },
    { q: "Подаряваш ли неща на приятели?", a: ["Да", "Не"], correct: 0 },
    { q: "Обичаш ли групови срещи?", a: ["Да", "Не"], correct: 0 },
    { q: "Често ли говорите по телефона?", a: ["Да", "Не"], correct: 0 },
    { q: "Поддържаш ли стари приятелства?", a: ["Да", "Не"], correct: 0 },
    { q: "Слушаш ли внимателно приятели?", a: ["Да", "Не"], correct: 0 },
    { q: "Помагаш ли при домашни/работа?", a: ["Да", "Не"], correct: 0 },
    { q: "Споделяш ли нови идеи с приятели?", a: ["Да", "Не"], correct: 0 },
  ]
};

// ------------------------
// Quiz logic остава същата
// ------------------------
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
