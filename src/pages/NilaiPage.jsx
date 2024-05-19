import React, { useState, useEffect } from "react";
import "../CSS/TambahUser.css";
import Navbar from "../components/Navbar.jsx";

const NilaiPage = () => {
  const [parentSubjects, setParentSubjects] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedParentMateriId, setSelectedParentMateriId] = useState(null);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchParentSubjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/materi/admin");
        if (response.ok) {
          const data = await response.json();
          setParentSubjects(
            data.body.filter(subject => subject.ParentMateriId === null)
          );
        } else {
          console.error("Failed to fetch parent subjects");
        }
      } catch (error) {
        console.error("Error fetching parent subjects:", error);
      }
    };

    fetchParentSubjects();
  }, []);

  const handleParentSubjectChange = async e => {
    const selectedId = e.target.value;
    setSelectedParentMateriId(selectedId);
    setSelectedQuizId(null); // Reset selected quiz when a new subject is selected
    setQuizzes([]); // Clear quizzes list when a new subject is selected
    setLeaderboard([]); // Clear leaderboard when a new subject is selected

    if (selectedId) {
      try {
        const response = await fetch("http://localhost:3000/quiz/admin");
        if (response.ok) {
          const data = await response.json();
          setQuizzes(
            data.body.filter(quiz => quiz.MateriId === parseInt(selectedId))
          );
        } else {
          console.error("Failed to fetch quizzes");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    }
    console.log(selectedId);
  };

  const handleQuizChange = async e => {
    const selectedId = e.target.value;
    setSelectedQuizId(selectedId);

    if (selectedId) {
      try {
        const response = await fetch("http://localhost:3000/quiz/leaderboard");
        if (response.ok) {
          const data = await response.json();
          setLeaderboard(
            data.body.filter(entry => entry.QuizId === parseInt(selectedId))
          );
        } else {
          console.error("Failed to fetch leaderboard");
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    }
  };

  return (
    <div className="nilai-page1">
      <Navbar />
      <div className="nilai-page">
        <h1>Nilai Siswa</h1>
        <div className="pilihan">
          {/* Dropdown untuk memilih mata pelajaran */}
          <div className="subject-dropdown">
            <select onChange={handleParentSubjectChange} defaultValue="">
              <option value="" disabled>
                Pilih Mata Pelajaran
              </option>
              {parentSubjects.map(subject => (
                <option key={subject.Id} value={subject.Id}>
                  {subject.Name}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown untuk memilih quiz berdasarkan mata pelajaran */}
          {selectedParentMateriId && (
            <div className="quiz-dropdown">
              <select onChange={handleQuizChange} defaultValue="">
                <option value="" disabled>
                  Pilih Quiz
                </option>
                {quizzes.map(quiz => (
                  <option key={quiz.Id} value={quiz.Id}>
                    {quiz.Title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {/* Tabel nilai siswa */}
        {selectedQuizId && (
          <div className="leaderboard-table">
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map(entry => (
                  <tr
                    key={entry.Id}
                    className={entry.TotalScore < 50.0 ? "low-score" : ""}
                  >
                    <td>{entry.CreatedBy}</td>
                    <td>{entry.TotalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NilaiPage;
