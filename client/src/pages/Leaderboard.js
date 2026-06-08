import { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/leaderboard")
      .then((res) => setLeaders(res.data))
      .catch(() => alert("Failed to load leaderboard ❌"));
  }, []);

  return (
    <div>
      <h2>🏆 Leaderboard</h2>

      {leaders.map((user) => (
        <div key={user.rank}>
          <h3>
            Rank #{user.rank} - {user.username} ({user.score}/{user.totalQuestions})
            {
  user.rank === 1
    ? "🥇"
    : user.rank === 2
    ? "🥈"
    : user.rank === 3
    ? "🥉"
    : `#${user.rank}`
}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;