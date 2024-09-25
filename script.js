const questions = [
    {
      question: "What is the capital of India?",
      answers: [
        { text: "Maharashtra", correct: false },
        { text: "U.P.", correct: false },
        { text: "Delhi", correct: true },
        { text: "J&K", correct: false },
      ],
    },
    {
      question: "Largest Onion market in India?",
      answers: [
        { text: "Pune", correct: false },
        { text: "Nashik", correct: true },
        { text: "Delhi", correct: false },
      ],
    },
    {
      question: "Which planet is language used in Mahrashtra?",
      answers: [
        { text: "Hindi", correct: false },
        { text: "Marathi", correct: true },
        { text: "Gujrati", correct: false },
        { text: "Tamil", correct: false },
      ],
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Get DOM elements
  const questionContainer = document.getElementById("question-container");
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const scoreContainer = document.getElementById("score-container");
  const scoreMessage = document.getElementById("score-message");
  const restartButton = document.getElementById("restart-btn");
  
  // Start the quiz
  function startQuiz() {
    currentQuestionIndex = 0; // Reset index
    score = 0; // Reset score
    scoreContainer.classList.add("hide");
    questionContainer.classList.remove("hide");
    nextButton.classList.add("hide");
    showQuestion();
  }
  
  // Show the current question
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    // Create answer buttons
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      button.dataset.correct = answer.correct;
      button.addEventListener("click", selectAnswer);
      const li = document.createElement("li");
      li.appendChild(button);
      answerButtonsElement.appendChild(li);
    });
  }
  
  // Reset the state of the quiz for a new question
  function resetState() {
    nextButton.classList.add("hide");
    clearStatusClass();
    answerButtonsElement.innerHTML = ""; // Clear previous answer buttons
  }
  
  // Handle answer selection
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    updateScore(correct);
  
    // Disable all answer buttons after selection and show correct/incorrect status
    Array.from(answerButtonsElement.children).forEach((li) => {
      const button = li.firstChild;
      button.disabled = true;
      setStatusClass(button, button.dataset.correct === "true");
    });
  
    // Show the next button only if there are more questions left
    if (currentQuestionIndex < questions.length - 1) {
      nextButton.classList.remove("hide");
    } else {
      // Automatically show the score after the last question
      showScore();
    }
  }
  
  // Update the score if the answer is correct
  function updateScore(isCorrect) {
    if (isCorrect) score++;
  }
  
  // Handle showing the next question
  function handleNextQuestion() {
    currentQuestionIndex++;
    showQuestion();
  }
  
  // Show the final score
  function showScore() {
    questionContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    scoreMessage.textContent = `You scored ${score} out of ${questions.length}!`;
  }
  
  // Clear status classes (colors) on buttons
  function clearStatusClass() {
    Array.from(answerButtonsElement.children).forEach((li) => {
      const button = li.firstChild;
      button.style.backgroundColor = "";
    });
  }
  
  // Add status classes (color green for correct, red for wrong)
  function setStatusClass(button, isCorrect) {
    button.style.backgroundColor = isCorrect ? "green" : "red";
  }
  
  // Start the quiz on page load
  startQuiz();
  
  // Attach event listener to the next and restart buttons
  nextButton.addEventListener("click", handleNextQuestion);
  restartButton.addEventListener("click", startQuiz);
  