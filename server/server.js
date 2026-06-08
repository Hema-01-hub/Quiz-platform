const Result = require("./models/Result");
const Question = require("./models/Question");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Quiz Platform Backend Working ✅");
});

const PORT = process.env.PORT || 5000;

// Register user
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "Registration successful ✅" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed ❌", error: err.message });
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password ❌" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      message: "Login successful ✅",
      token,
      username: user.username
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed ❌", error: err.message });
  }
});

// Add question
app.post("/add-question", async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;

    const newQuestion = new Question({
      question,
      options,
      correctAnswer
    });

    await newQuestion.save();

    res.json({ message: "Question added successfully ✅", question: newQuestion });
  } catch (err) {
    res.status(500).json({ message: "Failed to add question ❌", error: err.message });
  }
});
app.post("/seed-questions", async (req, res) => {
  try {
    const questions = [
      {
        question: "What is HTML?",
        options: ["Markup Language", "Programming Language", "Database", "Operating System"],
        correctAnswer: "Markup Language"
      },
      {
        question: "HTML stands for?",
        options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Markup Language", "Home Text Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
      },
      {
        question: "CSS is used for?",
        options: ["Styling Web Pages", "Storing Data", "Creating Server", "Running Database"],
        correctAnswer: "Styling Web Pages"
      },
      {
        question: "Which language is used to make web pages interactive?",
        options: ["JavaScript", "HTML", "CSS", "MongoDB"],
        correctAnswer: "JavaScript"
      },
      {
        question: "What is React?",
        options: ["JavaScript Library", "Database", "Operating System", "Backend Server"],
        correctAnswer: "JavaScript Library"
      },
      {
        question: "Which hook is used to manage state in React?",
        options: ["useState", "useEffect", "useNavigate", "useParams"],
        correctAnswer: "useState"
      },
      {
        question: "Which hook is used to run code after component loads?",
        options: ["useEffect", "useState", "useRef", "useMemo"],
        correctAnswer: "useEffect"
      },
      {
        question: "What is Node.js?",
        options: ["JavaScript Runtime Environment", "Database", "Frontend Framework", "Text Editor"],
        correctAnswer: "JavaScript Runtime Environment"
      },
      {
        question: "What is Express.js?",
        options: ["Backend Framework", "Database", "CSS Framework", "Browser"],
        correctAnswer: "Backend Framework"
      },
      {
        question: "MongoDB is a?",
        options: ["NoSQL Database", "Programming Language", "Web Browser", "CSS Library"],
        correctAnswer: "NoSQL Database"
      },
      {
        question: "Which command is used to initialize a Node.js project?",
        options: ["npm init -y", "node start", "npm create db", "express init"],
        correctAnswer: "npm init -y"
      },
      {
        question: "Which package is used to connect Node.js with MongoDB?",
        options: ["mongoose", "axios", "bcryptjs", "cors"],
        correctAnswer: "mongoose"
      },
      {
        question: "Which package is used to call backend APIs from React?",
        options: ["axios", "mongoose", "jsonwebtoken", "dotenv"],
        correctAnswer: "axios"
      },
      {
        question: "Which package is used to hide environment variables?",
        options: ["dotenv", "cors", "express", "react-router-dom"],
        correctAnswer: "dotenv"
      },
      {
        question: "JWT stands for?",
        options: ["JSON Web Token", "Java Web Tool", "JavaScript Web Type", "JSON Work Token"],
        correctAnswer: "JSON Web Token"
      },
      {
        question: "Which package is used to hash passwords?",
        options: ["bcryptjs", "axios", "cors", "nodemon"],
        correctAnswer: "bcryptjs"
      },
      {
        question: "Which package helps frontend and backend communicate?",
        options: ["cors", "mongoose", "dotenv", "jsonwebtoken"],
        correctAnswer: "cors"
      },
      {
        question: "Which method is used to get data?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correctAnswer: "GET"
      },
      {
        question: "Which method is used to create data?",
        options: ["POST", "GET", "PUT", "DELETE"],
        correctAnswer: "POST"
      },
      {
        question: "Which method is used to update data?",
        options: ["PUT", "GET", "POST", "DELETE"],
        correctAnswer: "PUT"
      },
      {
        question: "Which method is used to delete data?",
        options: ["DELETE", "GET", "POST", "PUT"],
        correctAnswer: "DELETE"
      },
      {
        question: "What is localStorage used for?",
        options: ["Store data in browser", "Database", "Backend", "Hosting"],
        correctAnswer: "Store data in browser"
      },
      {
        question: "Which command starts React app?",
        options: ["npm start", "npm run dev", "node app.js", "npm build"],
        correctAnswer: "npm start"
      },
      {
        question: "Which command starts backend with nodemon?",
        options: ["npm run dev", "npm start", "node index.js", "npm build"],
        correctAnswer: "npm run dev"
      },
      {
        question: "Which folder contains React frontend?",
        options: ["client", "server", "models", "node_modules"],
        correctAnswer: "client"
      }
    ];

    await Question.insertMany(questions);

    res.json({
      message: "25 Questions Added Successfully ✅"
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to add questions ❌",
      error: err.message
    });
  }
});

// Get all questions
app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch questions ❌", error: err.message });
  }
});

// Submit quiz and calculate score
app.post("/submit-quiz", async (req, res) => {
  try {
    const { username, answers } = req.body;

    const questions = await Question.find();

    let score = 0;

    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        score++;
      }
    });

    const result = new Result({
      username,
      score,
      totalQuestions: questions.length
    });

    await result.save();

    res.json({
      message: "Quiz submitted successfully ✅",
      score,
      totalQuestions: questions.length
    });
  } catch (err) {
    res.status(500).json({
      message: "Quiz submission failed ❌",
      error: err.message
    });
  }
});

// Leaderboard
app.get("/leaderboard", async (req, res) => {
  try {
    const results = await Result.find().sort({ score: -1 });

    const rankedResults = results.map((result, index) => ({
      rank: index + 1,
      username: result.username,
      score: result.score,
      totalQuestions: result.totalQuestions
    }));

    res.json(rankedResults);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch leaderboard ❌",
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});