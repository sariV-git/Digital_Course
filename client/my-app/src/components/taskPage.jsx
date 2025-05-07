import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";

const Task = () => {
  const [index, setIndex] = useState(0);
  const answer = useRef(null);
  const [lastIndex, setLastIndex] = useState(0);
  const location = useLocation();
  const task = location.state.task;
  const token = useSelector((state) => state.token.token);
  // const [user, setUser] = useState(null);
  const user=useSelector(state=>state.user.user)
  const [questions, setQuestions] = useState(null);
  const [load, setLoad] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [showCompletionAlert, setShowCompletionAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDataQuestion = async () => {
      try {
        const respond = await axios.get(`http://localhost:5000/question/AccordingTask/${task._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(respond.data);
        setCurrentQuestion(respond.data[0] || null);
        setLastIndex(respond.data.length - 1);

          } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setLoad(false);
      }
    };

    loadDataQuestion();
  }, [task._id, token]);

  const keepAnswer = async () => {
    if (answer.current || currentQuestion.type === "American") {
      try {
        const currentAnswer = {
          text: currentQuestion.type === "American" ? selectedOption.option : answer.current.value,
          question: questions[index]._id,
          user: user._id,
        };

        const respond = await axios.post("http://localhost:5000/answer", currentAnswer, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAnswers((prevAnswers) => [...prevAnswers, respond.data._id]);

        const nextIndex = index + 1;
        if (nextIndex <= lastIndex) {
          setIndex(nextIndex);
          setCurrentQuestion(questions[nextIndex]);
        } else {
          const userTask = {
            user: user._id,
            task: task._id,
            answers: [...answers, respond.data._id],
          };

          await axios.post("http://localhost:5000/userTask", userTask, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setShowCompletionAlert(true);
        }
      } catch (error) {
        console.log("Error saving answer: ", error);
      }
    } else {
      alert("Please provide an answer.");
    }
  };

  const showAmericanQuestion = (options) => {
    const arrayOptions = options.map((option, index) => ({
      option: option,
      key: index,
    }));

    return (
      <div className="card flex justify-content-center">
        <div className="flex flex-column gap-3">
          {arrayOptions.map((option) => (
            <div key={option.key} className="flex align-items-center">
              <RadioButton
                inputId={option.key}
                name="category"
                value={option}
                onChange={(e) => setSelectedOption(e.value)}
                checked={selectedOption.key === option.key}
              />
              <label htmlFor={option.key} className="ml-2">
                {option.option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-content-center align-items-center h-screen bg-light-purple">
        {load ? (
          <>Loading...</>
        ) : (
          <>
            {currentQuestion && (
              <Card
                className="p-4 shadow-3"
                style={{
                  width: "40rem",
                  borderRadius: "10px",
                  border: "1px solid #D8BFD8",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#8B008B" }}>
                  {currentQuestion.text}
                </p>

                {currentQuestion.type === "American" ? (
                  <>
                    <p style={{ fontSize: "1.2rem", color: "#8B008B" }}>Choose the correct answer:</p>
                    <div className="options-container">{showAmericanQuestion(currentQuestion.options)}</div>
                    <Button
                      onClick={keepAnswer}
                      label="Keep American Answer"
                      style={{
                        backgroundColor: "#8B008B",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        marginTop: "1rem",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <InputText
                      ref={answer}
                      type="text"
                      className="p-inputtext-lg"
                      placeholder="Your answer"
                      style={{
                        borderColor: "#D8BFD8",
                        borderRadius: "8px",
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                    />
                    <Button
                      label="Keep"
                      onClick={keepAnswer}
                      style={{
                        backgroundColor: "#8B008B",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        width: "100%",
                      }}
                    />
                  </>
                )}
              </Card>
            )}
          </>
        )}
      </div>

      {showCompletionAlert && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <h2 style={{ color: "#8B008B", marginBottom: "1rem" }}>🎉 Congratulations! 🎉</h2>
            <p style={{ fontSize: "1.2rem", color: "#333", marginBottom: "1.5rem" }}>
              You have completed all the questions!
            </p>
            <Button
              label="Go to Lessons List"
              onClick={() => navigate("/LessonsList")}
              style={{
                backgroundColor: "#8B008B",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;