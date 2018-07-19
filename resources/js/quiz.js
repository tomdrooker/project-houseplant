const quizSection = document.querySelector("#quiz");
const submitButton = document.querySelector("#submit");
const resultsSection = document.querySelector("#results");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const slides = document.getElementsByClassName("slide");
let currentSlide = 0;

const quizData = [
  {
    question: "What is your favourite album by the rock band Led Zeppelin?",
    answers: {
      a: "Physical Graffiti",
      b: "Houses Of The Holy",
      c: "Led Zeppelin III"
    }
  },
  {
    question: "What is your favourite fruit?",
    answers: {
      a: "Pear",
      b: "Donut peaches",
      c: "Cherries"
    }
  },
  {
    question: "What's the best kind of pasta?",
    answers: {
      a: "Fusilli",
      b: "Penne",
      c: "Spaghetti"
    }
  }
];

function buildQuiz() {
  const output = [];

  quizData.forEach(
    (currentQuestion, questionNumber) => {
      const answers = [];
      for (letter in currentQuestion.answers) {
        answers.push(
          `
            <label>
              <input type="radio" name="question${questionNumber}" value="${currentQuestion.answers[letter]}">
                ${currentQuestion.answers[letter]}
            </label>
          `
        );
      }
      output.push(
        `
        <div class="slide">
          <div class="question"> ${currentQuestion.question} </div>
          <div class="answers">  ${answers.join('')} </div>
        </div>
        `
      );
    }
  );
  quizSection.innerHTML = output.join('');
};

function showResults() {
  const userAnswers = [];

  const output = [];

  const answerContainers = quizSection.querySelectorAll(".answers");

  quizData.forEach( (currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = 'input[name=question'+questionNumber+']:checked';
      const userAnswer = (answerContainer.querySelector(selector)).value;
      userAnswers.push(userAnswer);
    }
  )
  output.push(
    `
      <h2>Your favourite Led Zeppelin album is ${userAnswers[0]}</h2>
      <h2>Your favourite fruit is ${userAnswers[1].toLowerCase()}</h2>
      <h2>Your favourite type of pasta is ${userAnswers[2].toLowerCase()}</h2>
    `
  )
  resultsSection.innerHTML = output.join('');
};

function showSlide(n) {
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;

  if (currentSlide === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "inline-block";
  }

  if (currentSlide === slides.length - 1) {
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
};

function showNextSlide() {
  showSlide(currentSlide + 1);
};


function showPreviousSlide() {
  showSlide(currentSlide - 1);
};

previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

buildQuiz();
showSlide(2);

submitButton.addEventListener("click", showResults);
