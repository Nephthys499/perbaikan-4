import React, { useState, useEffect } from "react";

const TambahKuis = () => {
  const [newQuiz, setNewQuiz] = useState({
    mode: "CREATE",
    Id: null,
    MateriId: null, // Initialize to null
    Title: "Quiz tentang Matematika1234",
    TimeLimit: 120,
    quizQuestions: [
      {
        mode: "CREATE",
        Id: null,
        Question: "Soal PART 2",
        quizQuestionDetails: [
          {
            mode: "CREATE",
            Id: null,
            Choice: "a",
            Description: "Ini opsi A1",
            IsAnswer: false,
          },
          {
            mode: "CREATE",
            Id: null,
            Choice: "b",
            Description: "Ini opsi B1",
            IsAnswer: false,
          },
          {
            mode: "CREATE",
            Id: null,
            Choice: "c",
            Description: "Ini opsi C1",
            IsAnswer: false,
          },
          {
            mode: "CREATE",
            Id: null,
            Choice: "d",
            Description: "Ini opsi D1",
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

  return (
    <div>
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
            <option value="">Select Subject</option>
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
              setNewQuiz({ ...newQuiz, TimeLimit: parseInt(e.target.value) })
            }
          />
        </label>

        {newQuiz.quizQuestions.map((question, questionIndex) => (
          <div key={questionIndex}>
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
              <div key={choiceIndex}>
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
              </div>
            ))}

            <button type="button" onClick={() => addChoice(questionIndex)}>
              Add Choice
            </button>
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
          Add Question
        </button>

        <button type="submit">Add Quiz</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default TambahKuis;
