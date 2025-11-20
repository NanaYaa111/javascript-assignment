// 1. DATA & VARIABLES
let questions = [
  { question: "1. What is 2 + 2?", options: ["3", "4", "5"], correct: 1 },
  { question: "2. Capital of France?", options: ["London", "Paris", "Rome"], correct: 1 },
  { question: "3. Which is a fruit?", options: ["Car", "Apple", "Chair"], correct: 1 },
  { question: "4. HTML stands for?", options: ["Hyper Text Markup Language", "High Text Machine", "None"], correct: 0 },
  { question: "5. CSS controls?", options: ["Styling", "Database", "Server"], correct: 0 }
];

let quizForm = document.getElementById("quizForm");
let quizContainer = document.getElementById("quiz");
let resultContainer = document.getElementById("result");
let timerDisplay = document.getElementById("timer");

let timeLeft = 30; 
let countdown; // Stores the timer interval ID

// 2. INITIALIZE QUIZ
buildQuiz();
startTimer();

// 3. TIMER FUNCTION
function startTimer() {
  clearInterval(countdown); // Clear any existing timer
  countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      alert("Time is up!");
      finishQuiz(); // Force finish when time is up
    }
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    timeLeft--;
  }, 1000);
}

// 4. BUILD QUIZ UI
function buildQuiz() {
  quizContainer.innerHTML = ""; // Clear previous content
  questions.forEach((q, index) => {
    let block = document.createElement("div");
    block.style.marginBottom = "15px"; 
    block.style.padding = "10px";
    block.innerHTML = `
      <h3>${q.question}</h3>
      ${q.options.map((opt, i) => `
        <label>
          <input type="radio" name="q${index}" value="${i}"> ${opt}
        </label><br>
      `).join("")}
    `;
    quizContainer.appendChild(block);
  });
}

// 5. SUBMIT EVENT LISTENER
quizForm.addEventListener("submit", function (e) {
  e.preventDefault();
  finishQuiz();
});

// 6. FINISH LOGIC (SCORING + MESSAGES)
function finishQuiz() {
  clearInterval(countdown); // Stop the clock

  let score = 0;
  let questionBlocks = quizContainer.children; // Get all question divs

  questions.forEach((q, index) => {
    let selected = document.querySelector(`input[name='q${index}']:checked`);
    let block = questionBlocks[index];

    // Disable inputs so user can't change answers
    let inputs = document.getElementsByName(`q${index}`);
    inputs.forEach(input => input.disabled = true);

    if (!selected) {
        // Highlight unanswered
        block.style.border = "2px solid orange";
    } else {
        let chosen = parseInt(selected.value);
        if (chosen === q.correct) {
            score++;
            block.style.backgroundColor = "#d4edda"; // Light Green
        } else {
            block.style.backgroundColor = "#f8d7da"; // Light Red
        }
    }
  });

  // Disable the main Submit button
  quizForm.querySelector("button").disabled = true;

  // --- MESSAGE LOGIC (The part you asked for) ---
  let message = "";
  if (score === questions.length) {
    message = "<br><strong>🎉 Congratulations! You got all of them right!</strong>";
  } else {
    message = "<br><strong>Don't give up! Keep practicing! You can do it!💪</strong>";
  }

  // --- DISPLAY RESULT + RESTART BUTTON ---
  resultContainer.innerHTML = `
    <h3>Your score: ${score} / ${questions.length}</h3>
    ${message}
    <br><br>
    <button id="restartBtn" style="padding:10px; cursor:pointer;">Restart Quiz</button>
  `;

  // Attach event listener to the new Restart button
  document.getElementById("restartBtn").addEventListener("click", restartQuiz);
}

// 7. RESTART LOGIC
function restartQuiz() {
  // Reset variables
  timeLeft = 30;
  resultContainer.innerHTML = ""; // Clear result text/button
  quizForm.querySelector("button").disabled = false; // Enable submit button

  // Rebuild everything
  buildQuiz();
  startTimer();
}