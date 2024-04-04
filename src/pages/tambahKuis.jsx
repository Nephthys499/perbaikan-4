import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import "../CSS/TambahUser.css";
import trashIcon from "../assets/trash.png"; // Import gambar ikon tempat sampah

const TambahKuis = () => {
  const [newQuiz, setNewQuiz] = useState({
    mode: "CREATE",
    Id: null,
    MateriId: null,
    Title: "",
    TimeLimit: 60,
    quizQuestions: [
      {
        mode: "CREATE",
        Id: null,
        Question: "",
        quizQuestionDetails: [
          {
            mode: "CREATE",
            Id: null,
            Choice: "a",
            Description: "",
            IsAnswer: false,
          },
          {
            mode: "CREATE",
            Id: null,
            Choice: "b",
            Description: "",
            IsAnswer: false,
          },
          {
            mode: "CREATE",
            Id: null,
            Choice: "c",
            Description: "",
            IsAnswer: false,
          },
          {
            mode: "CREATE",
            Id: null,
            Choice: "d",
            Description: "",
            IsAnswer: false,
          },
        ],
      },
    ],
  });

  const [subjectNames, setSubjectNames] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSubjectNames = async () => {
      try {
        const response = await fetch("http://localhost:3000/materi/admin");
        if (response.ok) {
          const data = await response.json();
          const parentSubjects = data.body.filter(
            subject => subject.ParentMateriId === null
          );
          setSubjectNames(parentSubjects);
        } else {
          console.error("Failed to fetch subject names");
        }
      } catch (error) {
        console.error("Error fetching subject names:", error);
      }
    };

    fetchSubjectNames();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      console.log("Submitting data:", newQuiz);

      const response = await fetch("http://localhost:3000/quiz/admin/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuiz),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);
        setMessage("Quiz created successfully");
      } else {
        const errorData = await response.json();
        console.error("Error creating quiz:", errorData);
        setMessage(`Failed to create quiz: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      setMessage("Error creating quiz");
    }
  };

  const handleQuestionInputChange = (e, questionIndex) => {
    const { name, value } = e.target;
    const updatedQuizQuestions = [...newQuiz.quizQuestions];
    updatedQuizQuestions[questionIndex] = {
      ...updatedQuizQuestions[questionIndex],
      [name]: value,
    };
    setNewQuiz({
      ...newQuiz,
      quizQuestions: updatedQuizQuestions,
    });
  };

  const handleChoiceInputChange = (e, questionIndex, choiceIndex) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    const updatedChoices = [
      ...newQuiz.quizQuestions[questionIndex].quizQuestionDetails,
    ];
    updatedChoices[choiceIndex] = {
      ...updatedChoices[choiceIndex],
      [name]: newValue,
    };
    const updatedQuizQuestions = [...newQuiz.quizQuestions];
    updatedQuizQuestions[questionIndex] = {
      ...updatedQuizQuestions[questionIndex],
      quizQuestionDetails: updatedChoices,
    };
    setNewQuiz({
      ...newQuiz,
      quizQuestions: updatedQuizQuestions,
    });
  };

  const addQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      quizQuestions: [
        ...newQuiz.quizQuestions,
        {
          mode: "CREATE",
          Id: newQuiz.quizQuestions.length + 1,
          Question: "",
          quizQuestionDetails: [
            {
              mode: "CREATE",
              Id: 1,
              Choice: "",
              Description: "",
              IsAnswer: false,
            },
          ],
        },
      ],
    });
  };

  const addChoice = questionIndex => {
    const updatedQuizQuestions = [...newQuiz.quizQuestions];
    updatedQuizQuestions[questionIndex].quizQuestionDetails.push({
      mode: "CREATE",
      Id: updatedQuizQuestions[questionIndex].quizQuestionDetails.length + 1,
      Choice: "",
      Description: "",
      IsAnswer: false,
    });
    setNewQuiz({
      ...newQuiz,
      quizQuestions: updatedQuizQuestions,
    });
  };

  const removeChoice = (questionIndex, choiceIndex) => {
    const updatedQuizQuestions = [...newQuiz.quizQuestions];
    updatedQuizQuestions[questionIndex].quizQuestionDetails.splice(
      choiceIndex,
      1
    );
    setNewQuiz({
      ...newQuiz,
      quizQuestions: updatedQuizQuestions,
    });
  };

  const removeQuestion = questionIndex => {
    const updatedQuizQuestions = [...newQuiz.quizQuestions];
    updatedQuizQuestions.splice(questionIndex, 1);
    setNewQuiz({
      ...newQuiz,
      quizQuestions: updatedQuizQuestions.map((question, index) => ({
        ...question,
        Id: index + 1,
      })),
    });
  };

  return (
    <div className="tambah-kuis-container">
      <Navbar />
      <div className="tambah-kuis-content">
        <h2>Add Quiz</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Subject:
            <select
              value={newQuiz.MateriId}
              onChange={e =>
                setNewQuiz({ ...newQuiz, MateriId: parseInt(e.target.value) })
              }
            >
              <option value="">Pilih Mata pelajaran</option>
              {subjectNames.map(subject => (
                <option key={subject.Id} value={subject.Id}>
                  {subject.Name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Title:
            <input
              type="text"
              value={newQuiz.Title}
              onChange={e => setNewQuiz({ ...newQuiz, Title: e.target.value })}
            />
          </label>

          <label>
            Time Limit (minutes):
            <input
              type="number"
              value={newQuiz.TimeLimit}
              onChange={e =>
                setNewQuiz({
                  ...newQuiz,
                  TimeLimit: parseInt(e.target.value),
                })
              }
            />
          </label>

          {newQuiz.quizQuestions.map((question, questionIndex) => (
            <div className="question-container" key={questionIndex}>
              <label>
                Question:
                <input
                  type="text"
                  name="Question"
                  value={question.Question}
                  onChange={e => handleQuestionInputChange(e, questionIndex)}
                />
              </label>

              {question.quizQuestionDetails.map((choice, choiceIndex) => (
                <div className="choice-container" key={choiceIndex}>
                  <label>
                    Choice:
                    <input
                      type="text"
                      name="Choice"
                      value={choice.Choice}
                      onChange={e =>
                        handleChoiceInputChange(e, questionIndex, choiceIndex)
                      }
                    />
                  </label>

                  <label>
                    Description:
                    <input
                      type="text"
                      name="Description"
                      value={choice.Description}
                      onChange={e =>
                        handleChoiceInputChange(e, questionIndex, choiceIndex)
                      }
                    />
                  </label>

                  <label>
                    Is Correct Answer:
                    <input
                      type="checkbox"
                      name="IsAnswer"
                      checked={choice.IsAnswer}
                      onChange={e =>
                        handleChoiceInputChange(e, questionIndex, choiceIndex)
                      }
                    />
                  </label>

                  {/* Gambar ikon tempat sampah */}
                  <img
                    src={trashIcon}
                    alt="Delete"
                    onClick={() => removeChoice(questionIndex, choiceIndex)}
                    className="trash-icon"
                  />
                </div>
              ))}

              <button
                type="button"
                className="add-choice-button"
                onClick={() => addChoice(questionIndex)}
              >
                Add Choice
              </button>
              <button
                type="button"
                className="remove-question-button"
                onClick={() => removeQuestion(questionIndex)}
              >
                Remove Question
              </button>
              <button
                type="button"
                className="add-question-button"
                onClick={() => addQuestion(questionIndex)}
              >
                Add Question
              </button>
            </div>
          ))}

          <button type="submit" className="submit-button">
            Add Quiz
          </button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default TambahKuis;
