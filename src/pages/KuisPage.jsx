// KuisPage.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/Kuis.css";

const KuisPage = () => {
  const [quizData, setQuizData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { quizId } = useParams();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/quiz/detail/${quizId}`
        );
        const data = await response.json();
        setQuizData(data.body[0]);
        console.log(data.body[0]);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [questionId]: optionId,
    }));
  };

  const isOptionSelected = (questionId, optionId) => {
    return selectedOptions[questionId] === optionId;
  };

  const handleNext = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = {
      Id: quizData.Id,
      MateriId: quizData.MateriId,
      Title: quizData.Title,
      TimeLimit: quizData.TimeLimit,
      finishedTime: quizData.finishedTime,
      quizQuestions: quizData.quizQuestions.map(question => {
        const selectedOption = document.querySelector(
          `input[name="question_${question.Id}"]:checked`
        );

        const selectedOptionId = selectedOption
          ? parseInt(selectedOption.value, 10)
          : null;

        const isCorrect = question.quizQuestionDetails.every(option => {
          return option.IsAnswer === (option.Id === selectedOptionId);
        });

        return {
          Id: question.Id,
          Question: question.Question,
          quizQuestionDetails: question.quizQuestionDetails.map(option => ({
            Id: option.Id,
            Choice: option.Choice,
            Description: option.Description,
            IsAnswer: option.IsAnswer,
            isSelected: option.Id === selectedOptionId,
          })),
          isCorrect: isCorrect,
        };
      }),
    };

    console.log(formData);

    try {
      const response = await fetch("http://localhost:3000/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Submit response:", response);
      // You can add any additional logic you need after submission here
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
    window.location.href = "/Kelas";
  };

  return (
    <div className="border">
      <div className="quiz-container">
        {quizData && quizData.quizQuestions.length > 0 ? (
          <div>
            <h1>{quizData.Title}</h1>
            <p>
              Question {currentQuestionIndex + 1} of{" "}
              {quizData.quizQuestions.length}
            </p>
            <form onSubmit={handleSubmit}>
              {quizData.quizQuestions.map((question, index) => (
                <div
                  key={question.Id}
                  style={{
                    display: index === currentQuestionIndex ? "block" : "none",
                  }}
                >
                  <p className="quiz-question">{question.Question}</p>
                  <ul className="quiz-options">
                    {question.quizQuestionDetails.map(option => (
                      <li
                        key={option.Id}
                        className={`quiz-option ${
                          isOptionSelected(question.Id, option.Id)
                            ? "selected"
                            : ""
                        }`}
                      >
                        <label>
                          <input
                            type="radio"
                            name={`question_${question.Id}`}
                            value={option.Id}
                            onChange={() =>
                              handleOptionChange(question.Id, option.Id)
                            }
                          />
                          {option.Description}
                        </label>
                      </li>
                    ))}
                  </ul>
                  {question.isCorrect !== undefined && (
                    <p
                      className={`quiz-feedback ${
                        question.isCorrect ? "" : "incorrect"
                      }`}
                    >
                      {question.isCorrect ? "Correct" : "Incorrect"}
                    </p>
                  )}
                </div>
              ))}
              <div className="quiz-nav-buttons">
                {currentQuestionIndex > 0 && (
                  <button type="button" onClick={handlePrevious}>
                    Previous
                  </button>
                )}
                {currentQuestionIndex === quizData.quizQuestions.length - 1 ? (
                  <button className="quiz-submit-button" type="submit">
                    Submit
                  </button>
                ) : (
                  <button type="button" onClick={handleNext}>
                    Next
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default KuisPage;
