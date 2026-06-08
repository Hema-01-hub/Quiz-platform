import { useNavigate } from "react-router-dom";
function Result() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const score = Number(localStorage.getItem("score"));
  const totalQuestions = Number(localStorage.getItem("totalQuestions"));

  const percentage = Math.round((score / totalQuestions) * 100);

  let rank = "";

  if (percentage >= 90) {
    rank = "🥇 Expert";
  } else if (percentage >= 75) {
    rank = "🥈 Advanced";
  } else if (percentage >= 60) {
    rank = "🥉 Intermediate";
  } else {
    rank = "📚 Beginner";
  }

  return (
    <div>
      <h2>Result Page 🎯</h2>
      <h3>Welcome, {username} 👋</h3>

      <h3>Your Score: {score} / {totalQuestions}</h3>
      <h3>Percentage: {percentage}%</h3>
      <h3>Your Rank: {rank}</h3>
      <button onClick={() => navigate("/leaderboard")}>
  View Leaderboard 🏆
</button>
    </div>
  );
}

export default Result;