import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

  const navigate = useNavigate();

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    axios
      .get("https://quiz-platform-j38o.onrender.com/questions")
      .then((res) => {
        const shuffledQuestions = shuffleArray(
          res.data.map((q) => ({
            ...q,
            options: shuffleArray(q.options),
          }))
        );

        setQuestions(shuffledQuestions);
      })
      .catch(() => alert("Failed to load questions ❌"));
  }, []);

  const handleAnswer = (questionId, selectedOption, correctAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));

    setFeedback((prev) => ({
      ...prev,
      [questionId]:
        selectedOption === correctAnswer
          ? "Correct Answer ✅"
          : `Wrong Answer ❌ Correct: ${correctAnswer}`,
    }));
  };

  const submitQuiz = async () => {
    try {
      const username = localStorage.getItem("username");

      const res = await axios.post("https://quiz-platform-j38o.onrender.com/submit-quiz", {
        username,
        answers,
      });

      localStorage.setItem("score", res.data.score);
      localStorage.setItem("totalQuestions", res.data.totalQuestions);

      alert(res.data.message);
      navigate("/result");
    } catch (err) {
      alert("Quiz submission failed ❌");
    }
  };

  useEffect(() => {
  if (timeLeft <= 0) {
    alert("Time is up! ⏳");
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);

  return (
    <div>
      <h2>
        ⏳ Time Left: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </h2>

      <h2>Quiz Page</h2>
      <button onClick={logout}>Logout 🚪</button>

      {questions.map((q, index) => (
        <div key={q._id}>
          <h3>
            {index + 1}. {q.question}
          </h3>

          {q.options.map((option) => (
            <div key={option}>
              <input
                type="radio"
                name={q._id}
                value={option}
                disabled={answers[q._id]}
                onChange={() => handleAnswer(q._id, option, q.correctAnswer)}
              />
              {option}
            </div>
          ))}

          {feedback[q._id] && <h4>{feedback[q._id]}</h4>}
        </div>
      ))}

      <br />

      <button onClick={submitQuiz}>Submit Quiz</button>
    </div>
  );
}

export default Quiz;