const quizSection = document.querySelector("#quiz");
const submitButton = document.querySelector("#submit");
const resultsSection = document.querySelector("#results");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const slides = document.getElementsByClassName("slide");
let currentSlide = 0;

const quizData = [
  {
    question: "How much time do you have to dedicate to your houseplants?",
    answers: {
      a: "No time",
      b: "Some time",
      c: "A lot"
    }
  },
  {
    question: "When would you be able to water your houseplants?",
    answers: {
      a: "Once a week",
      b: "Every two weeks",
      c: "Monthly"
    }
  },
  {
    question: "How much light do you get in your home?",
    answers: {
      a: "Hardly any",
      b: "Not a great deal, but there are some sunny spots",
      c: "Lots - we always get some sun"
    }
  },
  {
    question: "Do you want to have to trim your plants?",
    answers: {
      a: "No",
      b: "Doesn't matter",
      c: "Yes"
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
            <label class="container">
              <input type="radio" name="question${questionNumber}" value="${letter}">
                ${currentQuestion.answers[letter]}
              <span class="checkmark"></span>
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

// Select each checked radio button and display in results div.

function showResults() {
  quizSection.style.display = "none";

  const userAnswers = [
    [],
    [],
    []
  ];

  const output = [];

  const answerContainers = quizSection.querySelectorAll(".answers");

  quizData.forEach( (currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = 'input[name=question'+questionNumber+']:checked';
      const userAnswer = (answerContainer.querySelector(selector)).value;

      if (userAnswer === "a") {
        userAnswers[0].push(userAnswer);
      } else if (userAnswer === "b") {
        userAnswers[1].push(userAnswer);
      } else if (userAnswer === "c") {
        userAnswers[2].push(userAnswer);
      }
    }
  )

  if (userAnswers[0].length > userAnswers[1].length && userAnswers[0].length > userAnswers[2].length) {
    output.push(
      `
        <h2>Take it easy</h2>
        <img src="resources/images/easy.jpg">
        <h3>Peace lily dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</h3>
      `
    )
  } else if (userAnswers[1].length > userAnswers[0].length && userAnswers[1].length > userAnswers[2].length) {
    output.push(
      `
        <h2>Steady as she goes</h2>
        <img src="resources/images/medium.jpg">
        <h3>Pilea dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</h3>
      `
    )
  } else if (userAnswers[2].length > userAnswers[1].length && userAnswers[2].length > userAnswers[0].length) {
    output.push(
      `
        <h2>It's tricky</h2>
        <img src="resources/images/tricky.jpg">
        <h3>Moth orchid dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</h3>
      `
    )
  } else {
    output.push(
      `
        <h2>Steady as she goes</h2>
        <img src="resources/images/medium.jpg">
        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</h3>
      `
    )
  }

  resultsSection.innerHTML = output.join('');
  console.log(userAnswers);
};

// Display question and control appearanceof buttons

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
showSlide(0);

submitButton.addEventListener("click", showResults);
