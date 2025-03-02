// مدیریت کاربران با localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || {};
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// ثبت‌نام
function register() {
    let username = document.getElementById('reg-username').value;
    let password = document.getElementById('reg-password').value;
    let message = document.getElementById('auth-message');
    
    if (!username || !password) {
        message.textContent = "لطفاً همه فیلدها رو پر کنید!";
        message.style.color = "red";
        return;
    }

    let users = getUsers();
    if (users[username]) {
        message.textContent = "این نام کاربری قبلاً ثبت شده!";
        message.style.color = "red";
        return;
    }

    let hashedPassword = sha256(password);
    users[username] = hashedPassword;
    saveUsers(users);

    message.textContent = "ثبت‌نام موفق! حالا وارد شوید.";
    message.style.color = "green";
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';
}

// ورود
function login() {
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;
    let message = document.getElementById('auth-message');
    
    if (!username || !password) {
        message.textContent = "لطفاً همه فیلدها رو پر کنید!";
        message.style.color = "red";
        return;
    }

    let users = getUsers();
    let hashedPassword = sha256(password);
    
    if (users[username] && users[username] === hashedPassword) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('lesson-container').style.display = 'block';
    } else {
        message.textContent = "نام کاربری یا رمز عبور اشتباه است!";
        message.style.color = "red";
    }
}

// خروج
function logout() {
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('lesson-container').style.display = 'none';
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('auth-message').textContent = '';
}

// نمایش درس انتخاب‌شده
function showLesson(lesson) {
    document.getElementById('lesson-container').style.display = 'none';
    document.getElementById(`${lesson}-lesson`).style.display = 'block';
    if (lesson === 'math') generateMathQuestion();
    if (lesson === 'persian') generatePersianQuestion();
    if (lesson === 'writing') generateWritingQuestion();
}

// بازگشت به انتخاب درس
function backToLessons() {
    document.getElementById('math-lesson').style.display = 'none';
    document.getElementById('persian-lesson').style.display = 'none';
    document.getElementById('writing-lesson').style.display = 'none';
    document.getElementById('lesson-container').style.display = 'block';
}

// درس ریاضی
function generateMathQuestion() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let operator = Math.random() > 0.5 ? '+' : '-';
    let question = `${num1} ${operator} ${num2}`;
    document.getElementById('math-question').textContent = question;
    return operator === '+' ? num1 + num2 : num1 - num2;
}

let mathAnswer = generateMathQuestion();

function checkMathAnswer() {
    let userAnswer = parseInt(document.getElementById('math-answer').value);
    let result = document.getElementById('math-result');
    if (userAnswer === mathAnswer) {
        result.textContent = "آفرین! جواب درست بود.";
        result.style.color = "green";
    } else {
        result.textContent = "اشتباه شد! دوباره امتحان کن.";
        result.style.color = "red";
    }
    mathAnswer = generateMathQuestion();
    document.getElementById('math-answer').value = '';
}

// درس فارسی (شناخت حروف و کلمات)
const persianQuestions = [
    { question: "د_ن", answer: "ا" },
    { question: "م_در", answer: "ا" },
    { question: "ک_تاب", answer: "ی" }
];
let persianIndex = 0;

function generatePersianQuestion() {
    let q = persianQuestions[persianIndex];
    document.getElementById('persian-question').textContent = q.question;
    return q.answer;
}

let persianAnswer = generatePersianQuestion();

function checkPersianAnswer() {
    let userAnswer = document.getElementById('persian-answer').value;
    let result = document.getElementById('persian-result');
    if (userAnswer === persianAnswer) {
        result.textContent = "آفرین! درست بود.";
        result.style.color = "green";
    } else {
        result.textContent = "اشتباه شد! دوباره امتحان کن.";
        result.style.color = "red";
    }
    persianIndex = (persianIndex + 1) % persianQuestions.length;
    persianAnswer = generatePersianQuestion();
    document.getElementById('persian-answer').value = '';
}

// درس نگارش (جمله‌سازی)
const writingQuestions = [
    { question: "من به ___ می‌روم.", answer: "مدرسه" },
    { question: "خورشید در ___ می‌درخشد.", answer: "آسمان" },
    { question: "ما با هم ___ می‌کنیم.", answer: "بازی" }
];
let writingIndex = 0;

function generateWritingQuestion() {
    let q = writingQuestions[writingIndex];
    document.getElementById('writing-question').textContent = q.question;
    return q.answer;
}

let writingAnswer = generateWritingQuestion();

function checkWritingAnswer() {
    let userAnswer = document.getElementById('writing-answer').value;
    let result = document.getElementById('writing-result');
    if (userAnswer === writingAnswer) {
        result.textContent = "آفرین! درست بود.";
        result.style.color = "green";
    } else {
        result.textContent = "اشتباه شد! دوباره امتحان کن.";
        result.style.color = "red";
    }
    writingIndex = (writingIndex + 1) % writingQuestions.length;
    writingAnswer = generateWritingQuestion();
    document.getElementById('writing-answer').value = '';
}
