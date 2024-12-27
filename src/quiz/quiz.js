import { data } from "./questions.js";
console.log("Data", data);
let quiz_body = document.getElementById("quiz-body");

document.addEventListener("DOMContentLoaded", () => {
  let timmer = 0;
  let counter = setInterval(() => {
    const timmerBody = document.getElementById("timmer");
    timmerBody.innerHTML = `${timmer}%`;
    timmer++;

    if (timmer > 100) {
      clearInterval(counter);
      getQuizData();
    }
  }, 100);
});

const getQuizData = () => {
  quiz_body.innerHTML = "";
  const quiz = data;
  let currentIndex = 0;

  // Create timeline elements
  let timeline = document.createElement("div");
  let timeline_inner = document.createElement("div");
  timeline.className = "timeline";
  timeline_inner.className = "timeline_inner";
  timeline.appendChild(timeline_inner);
  quiz_body.appendChild(timeline);

  const updateTimeline = (index) => {
    // Calculate the fill percentage based on the current index
    const fillPercentage = ((index + 1) / quiz.length) * 100;
    timeline_inner.style.width = `${fillPercentage}%`;
  };

  const renderQuestion = (index) => {
    const data = quiz[index];
    let quizContainer = document.createElement("div");
    let questions = document.createElement("h4");
    let optionsContainer = document.createElement("div");
    let backButton = document.createElement("button");
    let nextButton = document.createElement("button");

    quizContainer.className = "quiz-container";

    // Display the question
    questions.innerHTML = data.question;
    questions.className = "question-text";

    // Add options dynamically
    data.options.forEach((option, optionIndex) => {
      let optionElement = document.createElement("p");
      optionElement.innerHTML = option;
      optionElement.className = "option-text";
      optionsContainer.appendChild(optionElement);
      optionsContainer.className = "option-container";
      optionElement.className = "option-element";
      // Add click behavior to select an option
      let selectedOptions = [];
      if (selectedOptions[index] === optionIndex) {
        optionElement.classList.add("option-active");
      }
      optionElement.onclick = () => {
        // Remove 'option-active' class from all options
        Array.from(optionsContainer.children).forEach((child) => {
          child.classList.remove("option-active");
        });

        // Add 'option-active' class to the clicked option
        optionElement.classList.add("option-active");

        // Store the selected option index for the current question
        selectedOptions[index] = optionIndex;
      };
    });

    // Set the "Previous" button behavior
    backButton.innerHTML = "<<";
    backButton.className = "btn";
    backButton.disabled = currentIndex === 0;
    backButton.onclick = () => {
      if (currentIndex > 0) {
        currentIndex--;
        quizContainer.innerHTML = "";
        renderQuestion(currentIndex);
        updateTimeline(currentIndex);
      }
    };

    // Set the "Next" button behavior
    nextButton.innerHTML = ">>";
    nextButton.className = "btn";

    // Disable the "Next" button if it's the last question and no answer is selected
    nextButton.disabled = false;

    nextButton.onclick = () => {
      if (currentIndex < quiz.length - 1) {
        currentIndex++;
        quizContainer.innerHTML = "";
        renderQuestion(currentIndex);
        updateTimeline(currentIndex);
      } else if (currentIndex === quiz.length - 1) {
        window.location.href = "doneQuiz.html";
      }
    };

    quizContainer.appendChild(questions);
    quizContainer.appendChild(optionsContainer);
    quizContainer.appendChild(backButton);
    quizContainer.appendChild(nextButton);
    quiz_body.appendChild(quizContainer);
  };

  updateTimeline(currentIndex);
  renderQuestion(currentIndex);
};
