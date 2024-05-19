import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import "../CSS/TambahUser.css";

const HapusKuis = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState({
    mode: "DELETE",
    Id: null,
    MateriId: null,
    Title: "",
    quizQuestions: [],
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch("http://localhost:3000/quiz/admin");
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data.body);
      } else {
        console.error("Failed to fetch quizzes");
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleQuizSelection = quizId => {
    const selectedQuiz = quizzes.find(quiz => quiz.Id === quizId);
    setSelectedQuizId(quizId);
    setSelectedQuiz(
      selectedQuiz || {
        Id: null,
        MateriId: null,
        Title: "",
      }
    );
  };

  const handleDelete = async () => {
    if (!selectedQuizId) {
      setMessage("Please select a quiz to delete");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/quiz/admin/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "DELETE",
          Id: selectedQuiz.Id,
          MateriId: selectedQuiz.MateriId,
          Title: selectedQuiz.Title,
          quizQuestions: [],
        }),
      });

      if (response.ok) {
        setMessage("Quiz deleted successfully");
        setQuizzes(prevQuizzes =>
          prevQuizzes.filter(quiz => quiz.Id !== selectedQuizId)
        );
        setSelectedQuizId(null);
      } else {
        const errorData = await response.json();
        console.error("Error deleting quiz:", errorData);
        setMessage(`Failed to delete quiz: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      setMessage("Error deleting quiz");
    }
  };

  return (
    <div className="hapus-kuis-container">
      <Navbar />
      <div className="hapus-kuis-content">
        <h2>Delete Quiz</h2>
        <select
          value={selectedQuizId}
          onChange={e => handleQuizSelection(parseInt(e.target.value))}
          className="quiz-select"
        >
          <option value="">Select Quiz to Delete</option>
          {quizzes.map(quiz => (
            <option key={quiz.Id} value={quiz.Id}>
              {quiz.Title}
            </option>
          ))}
        </select>
        <button onClick={handleDelete} className="delete-button">
          Delete Quiz
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default HapusKuis;
