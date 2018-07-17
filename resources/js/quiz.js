const quizSection = document.querySelector("#quiz");
const submitButton = document.querySelector("#submit");
const resultsSection = document.querySelector("#results");

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
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answers">  ${answers.join('')} </div>
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

buildQuiz();

submitButton.addEventListener("click", showResults);
