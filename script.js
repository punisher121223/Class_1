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

    // رمزنگاری رمز عبور
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
        document.getElementById('math-container').style.display = 'block';
        generateQuestion();
    } else {
        message.textContent = "نام کاربری یا رمز عبور اشتباه است!";
        message.style.color = "red";
    }
}

// خروج
function logout() {
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('math-container').style.display = 'none';
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('auth-message').textContent = '';
}

// تولید سوال ریاضی
function generateQuestion() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let operator = Math.random() > 0.5 ? '+' : '-';
    let question = `${num1} ${operator} ${num2}`;
    document.getElementById('question').textContent = question;

    return operator === '+' ? num1 + num2 : num1 - num2;
}

let correctAnswer = generateQuestion();

// بررسی جواب
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer').value);
    let result = document.getElementById('result');

    if (userAnswer === correctAnswer) {
        result.textContent = "آفرین! جواب درست بود.";
        result.style.color = "green";
    } else {
        result.textContent = "اشتباه شد! دوباره امتحان کن.";
        result.style.color = "red";
    }

    correctAnswer = generateQuestion();
    document.getElementById('answer').value = '';
}
