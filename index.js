let questionField = document.querySelector('.quastion');
let answerButtons = document.querySelectorAll('.Answer');
let stat = document.querySelector('.statistik');
let end = document.getElementById('end')
let reload = document.getElementById('reload')
let butstart = document.getElementById('butstart')
let container_main = document.querySelector('.container_main')
let start = document.getElementById('start')


// Массив вопросов и ответов
let questions = [
    {
        question: "2+2",
        answers: ["6", "2", "4", "10", "3"],
        correct: "4"
    },
    {
        question: "2+3",
        answers: ["6", "4", "5", "10", "3"],
        correct: "5"
    },
    {
        question: "3+5",
        answers: ["6", "4", "8", "10", "3"],
        correct: "8"
    }
];

let currentQuestionIndex = 0;
let good = 0;
let bad = 0;

// Функция перемешивания массива
function randomQuestion(array){
    for (let i = array.length-1; i>0; i--){
        let j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Перемешиваем вопросы один раз в начале
randomQuestion(questions);

// Функция отображения вопроса
function displayQuestion(index) {
    let currentQuestion = questions[index];
    questionField.innerHTML = currentQuestion.question;
    // Перемешиваем ответы для текущего вопроса
    randomQuestion(currentQuestion.answers);
    answerButtons.forEach((button, i) => {
        button.innerHTML = currentQuestion.answers[i];
        button.classList.remove('good', 'bad');
    });
}

// Функция обработки клика по кнопке ответа
function handleAnswerClick(event) {
    let selectedAnswer = event.target.innerHTML;
    let correctAnswer = questions[currentQuestionIndex].correct;

    if (selectedAnswer === correctAnswer) {
        event.target.classList.add('good');
        good++;
    } else {
        event.target.classList.add('bad');
        bad++;
    }


// Функция для обновления статуса
function status() {
    stat.innerHTML = `Правильно: ${good} Неправильно: ${bad}`;
}

    // Переход к следующему вопросу через 1 секунду
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex); // Показываем следующий вопрос
        } else {
            alert("Все вопросы завершены");
            status();
            otpravka();
            container_main.classList.add('hiden');
            end.classList.remove('hiden');
            
        }
    }, 1000); // Задержка 1 секунда (1000 миллисекунд)
}

function start_new(){
    currentQuestionIndex = 0;
    good = 0;
    bad = 0;
    start.classList.add('hiden');
    end.classList.add('hiden');
    container_main.classList.remove('hiden');
    displayQuestion(currentQuestionIndex);




}

function otpravka(){
    let subjekt = 'Результат квиза';
    let letter = `А вот и результат нашего квиза\n правильные ответы ${good}, не правелльные ответы ${bad}`
    let mailtoLink = `mailto:gopilpro9@gmail.com?subject=${encodeURIComponent(subjekt)}&body=${encodeURIComponent(letter)}`;
    window.location.href = mailtoLink
}





butstart.addEventListener("click", start_new)
reload.addEventListener("click", start_new)

// Назначаем обработчики событий для кнопок с ответами
answerButtons.forEach(button => {
    button.addEventListener('click', handleAnswerClick);
});
