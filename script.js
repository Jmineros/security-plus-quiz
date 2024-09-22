
const questionsPool = [
    {
        question: "Which protocol is used for secure web browsing?",
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
        correct: "HTTPS",
        category: "Urgent"
    },
    {
        question: "Which of the following is a hashing algorithm?",
        options: ["AES", "SHA-256", "RSA", "DES"],
        correct: "SHA-256",
        category: "Important"
    },
    {
        question: "What is the CIA triad?",
        options: ["Confidentiality, Integrity, Availability", "Communication, Internet, Access", "Cybersecurity, Identity, Authentication"],
        correct: "Confidentiality, Integrity, Availability",
        category: "Necessary"
    },
    {
        question: "What is a common form of multi-factor authentication?",
        options: ["Password and email", "Password and OTP (One-Time Password)", "Email and username"],
        correct: "Password and OTP (One-Time Password)",
        category: "Good Understanding"
    },
    {
        question: "Which of the following is used to perform a risk analysis calculation?",
        options: ["SLE", "MTTR", "ALE", "ARO"],
        correct: "ALE",
        category: "Important"
    },
    {
        question: "What is the purpose of a DDoS attack?",
        options: ["To gather intelligence", "To deny service to legitimate users", "To gain unauthorized access", "To encrypt data"],
        correct: "To deny service to legitimate users",
        category: "Urgent"
    },
    {
        question: "Which of the following is used to digitally sign email messages?",
        options: ["AES", "SHA-256", "RSA", "DES"],
        correct: "RSA",
        category: "Good Understanding"
    },
    {
        question: "Which of these protocols is commonly used to secure email transmissions?",
        options: ["SMTP", "TLS", "HTTP", "ICMP"],
        correct: "TLS",
        category: "Necessary"
    }
    // Additional questions here
];

let selectedQuestions = [];
let score = 0;
let totalQuestions = 0;
let incorrectQuestions = [];

document.getElementById('start-quiz').addEventListener('click', startQuiz);

function startQuiz() {
    const questionAmount = parseInt(document.getElementById('question-amount').value);
    selectedQuestions = shuffleArray(questionsPool).slice(0, questionAmount);
    totalQuestions = selectedQuestions.length;

    if (selectedQuestions.length > 0) {
        displayQuestions();
        if (questionAmount === 90) {
            startTimer(90 * 60); // 90 minutes in seconds
            document.getElementById('timer').style.display = 'block';
        }
    } else {
        document.getElementById('quiz').innerHTML = '<p>No questions available</p>';
    }
}

function displayQuestions() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '';
    selectedQuestions.forEach((question, index) => {
        const questionHtml = `
            <div class="question">
                <h3>${index + 1}. ${question.question}</h3>
                ${question.options.map((option, i) => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}">
                        ${option}
                    </label><br>
                `).join('')}
            </div>
        `;
        quizDiv.innerHTML += questionHtml;
    });
    document.getElementById('submit').style.display = 'block';
    quizDiv.style.display = 'block';
}

function submitQuiz() {
    score = 0;
    incorrectQuestions = [];
    
    selectedQuestions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === question.correct) {
            score++;
        } else {
            incorrectQuestions.push(question);
        }
    });

    showResults();
}

function showResults() {
    const resultsDiv = document.getElementById('results');
    const passRate = (score / totalQuestions) * 100;
    
    resultsDiv.innerHTML = `<h2>You scored ${score} out of ${totalQuestions} (${passRate.toFixed(2)}%)</h2>`;
    resultsDiv.innerHTML += passRate >= 75 ? `<p>Pass</p>` : `<p>Fail</p>`;

    if (incorrectQuestions.length > 0) {
        resultsDiv.innerHTML += `<h3>Review these sections:</h3>`;
        incorrectQuestions.forEach(q => {
            resultsDiv.innerHTML += `<p>${q.question} - Review: <strong>${q.category}</strong></p>`;
        });
    }
}

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const timerDisplay = document.getElementById('time');
    
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            submitQuiz();
        }
    }, 1000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.getElementById('submit').addEventListener('click', submitQuiz);
