import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Quiz Platform 🚀</h1>

        <nav>
          <Link to="/signup">Signup</Link> |{" "}
          <Link to="/login">Login</Link> |{" "}
          <Link to="/quiz">Quiz</Link> |{" "}
          <Link to="/result">Result</Link> |{" "}
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;