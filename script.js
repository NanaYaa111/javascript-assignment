/* QUESTIONS WITH EXPLANATIONS */
const questions = [
    {
        q: "What is the capital of France?",
        options: ["Paris", "London", "Rome", "Madrid"],
        answer: 0,
        explanation: "Paris is the official capital city of France."
    },
    {
        q: "Who invented the light bulb?",
        options: ["Newton", "Edison", "Tesla", "Einstein"],
        answer: 1,
        explanation: "Thomas Edison is credited with inventing the practical light bulb."
    },
    {
        q: "Which planet is known as the Red Planet?",
        options: ["Venus", "Earth", "Mars", "Jupiter"],
        answer: 2,
        explanation: "Mars appears red because of iron oxide on its surface."
    },
    {
        q: "What is the largest ocean?",
        options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        answer: 2,
        explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
    },
    {
        q: "Which animal is known as the King of the Jungle?",
        options: ["Lion", "Tiger", "Leopard", "Elephant"],
        answer: 0,
        explanation: "The lion is commonly referred to as the King of the Jungle."
    },
    {
        q: "Water freezes at what temperature?",
        options: ["0°C", "10°C", "20°C", "40°C"],
        answer: 0,
        explanation: "Water freezes into ice at 0 degrees Celsius."
    },
    {
        q: "How many continents do we have?",
        options: ["5", "6", "7", "8"],
        answer: 2,
        explanation: "There are 7 continents in the world."
    },
    {
        q: "Which gas do plants absorb?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: 1,
        explanation: "Plants absorb CO₂ for photosynthesis."
    },
    {
        q: "What is H2O?",
        options: ["Oxygen", "Hydrogen", "Water", "Salt"],
        answer: 2,
        explanation: "H2O is the chemical formula for water."
    },
    {
        q: "Who wrote Hamlet?",
        options: ["Shakespeare", "Dickens", "Achebe", "Mark Twain"],
        answer: 0,
        explanation: "Hamlet was written by William Shakespeare."
    }
];

let index = 0;
let score = 0;
let selected = null;
let userAnswers = [];

/* TIMER — 2 MINUTES GLOBAL */
let totalSeconds = 120;
let overallTimer = setInterval(() => {
    totalSeconds--;

    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;
    document.getElementById("timer").textContent = `${mins}:${secs < 10 ? "0" + secs : secs}`;

    if (totalSeconds <= 0) showResults();
}, 1000);

const questionTitle = document.getElementById("questionTitle");
const optionsDiv = document.getElementById("options");
const progressBar = document.getElementById("progressBar");

function loadQuestion() {
    const q = questions[index];
    questionTitle.textContent = q.q;

    optionsDiv.innerHTML = "";
    selected = null;

    q.options.forEach((opt, i) => {
        let div = document.createElement("div");
        div.className = "option";
        div.textContent = opt;

        div.onclick = () => {
            document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
            div.classList.add("selected");
            selected = i;
        };

        optionsDiv.appendChild(div);
    });

    progressBar.style.width = ((index) / questions.length) * 100 + "%";
}

document.getElementById("submitBtn").onclick = () => {
    if (selected === null) {
        alert("Please select an answer!");
        return;
    }

    userAnswers[index] = selected;

    if (selected === questions[index].answer) score++;

    index++;

    if (index >= questions.length) {
        showResults();
    } else {
        loadQuestion();
    }
};

function showResults() {
    clearInterval(overallTimer);

    // Check score to decide which message to show
    let message = "";
    if (score === questions.length) {
        message = "<br><strong>🎉 Congratulations! You got all of them right!</strong>";
    } else {
        // --- THIS IS THE NEW ENCOURAGEMENT MESSAGE ---
        message = "<br><strong>Don't give up! Keep practicing! 💪</strong>";
    }

    let html = `
        <div class="result-box">
            <h2>Your Score</h2>
            <h1>${score} / ${questions.length}</h1>
            <p>Scroll down to review all answers</p>
            ${message}
        </div>
    `;

    questions.forEach((q, i) => {
        const userAns = userAnswers[i];
        const correct = q.answer;

        html += `
            <div class="review ${userAns === correct ? "correct" : "wrong"}">
                <h3>${i + 1}. ${q.q}</h3>
                <p><strong>Your Answer:</strong> ${q.options[userAns] || "No Answer"}</p>
                <p><strong>Correct Answer:</strong> ${q.options[correct]}</p>
                <p><strong>Explanation:</strong> ${q.explanation}</p>
            </div>
        `;
    });

    document.querySelector(".container").innerHTML = html;
}

/* DARK MODE */
document.getElementById("darkToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

loadQuestion();
