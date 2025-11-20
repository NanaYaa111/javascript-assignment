// VERY SIMPLE QUIZ WITH 5 QUESTIONS + TIMER + GREEN/RED FEEDBACK

let questions = [
  { question: "1. What is 2 + 2?", options: ["3", "4", "5"], correct: 1 },
  { question: "2. Capital of France?", options: ["London", "Paris", "Rome"], correct: 1 },
  { question: "3. Which is a fruit?", options: ["Car", "Apple", "Chair"], correct: 1 },
  { question: "4. HTML stands for?", options: ["Hyper Text Markup Language", "High Text Machine", "None"], correct: 0 },
  { question: "5. CSS controls?", options: ["Styling", "Database", "Server"], correct: 0 }
];

let quizForm = document.getElementById("quizForm");
let timerDisplay = document.getElementById("timer");
let timeLeft = 30; // 1 minute

// Start countdown timer
let countdown = setInterval(() => {
  if (timeLeft <= 0) {
    clearInterval(countdown);
    alert("Time is up!");
    quizForm.querySelector("button").disabled = true;
  }
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
  timeLeft--;
}, 1000);

// Build quiz questions on page
let quizContainer = document.getElementById("quiz");

questions.forEach((q, index) => {
  let block = document.createElement("div");
  block.innerHTML = `
    <h3>${q.question}</h3>
    ${q.options
      .map(
        (opt, i) => `
      <label>
        <input type="radio" name="q${index}" value="${i}"> ${opt}
      </label><br>`
      )
      .join("")}
  `;
  quizContainer.appendChild(block);
});

// Submit quiz
quizForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let score = 0;
  
  questions.forEach((q, index) => {
    let selected = document.querySelector(`input[name='q${index}']:checked`);

    // If not answered
    if (!selected) return;

    let chosen = parseInt(selected.value);

    if (chosen === q.correct) {
      score++;
      selected.parentElement.style.color = "green";
    } else {
      selected.parentElement.style.color = "red";
    }
  });

  document.getElementById("result").textContent = `Your score: ${score} / ${questions.length}`;
});