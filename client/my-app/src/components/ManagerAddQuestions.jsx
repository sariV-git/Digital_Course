





import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert2 for beautiful alerts

const ManagerAddQuestions = () => {
    const token = useSelector((state) => state.token.token);
    const location = useLocation();
    const navigate = useNavigate();
    const task = location.state.task;

    const [visible, setVisible] = useState(false);
    const [flagOptions, setFlagOptions] = useState(false);
    const [text, setText] = useState("");
    const [numOfQuestion, setNumOfQuestion] = useState("");
    const [type, setType] = useState("");
    const [options, setOptions] = useState("");

    const questionTypes = [
        { label: "American", value: "American" },
        { label: "Regular", value: "Free" },
    ];

    const finishWriteQuestions = () => {
        Swal.fire({
            title: "Success!",
            text: "You have successfully created the full lesson!",
            icon: "success",
            confirmButtonText: "Go to Lessons List",
            confirmButtonColor: "#8e24aa",
        }).then(() => {
            navigate("/LessonsList");
        });
    };

    const handleTypeChange = (e) => {
        const value = e.value;
        setType(value);
        setFlagOptions(value === "American");
    };

    const createQuestion = async () => {
        try {
            const question = {
                text,
                task: task._id,
                numOfQuestion,
                options: type === "American" ? options.split(",") : null,
                type,
            };
            console.log(question);
            setFlagOptions(false);
            await axios.post("http://localhost:5000/question", question, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Successfully created question!");
        } catch (error) {
            console.error("Error creating question:", error);
        }
    };

    const create = () => {
        setVisible(true);
    };

    return (
        <div className="page-container">
            <div className="button-container">
                <Button
                    label="Create Question"
                    onClick={create}
                    className="p-button-rounded p-button-purple p-button-large"
                />
                <Button
                    label="Finish"
                    onClick={finishWriteQuestions}
                    className="p-button-rounded p-button-purple p-button-large"
                />
            </div>

            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                style={{ width: "500px", borderRadius: "15px" }}
            >
                <div className="dialog-container">
                    <div className="input-group">
                        <label htmlFor="text">Question Text</label>
                        <InputText
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="numOfQuestion">Question Number</label>
                        <InputText
                            id="numOfQuestion"
                            value={numOfQuestion}
                            onChange={(e) => setNumOfQuestion(e.target.value)}
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="type">Question Type</label>
                        <Dropdown
                            id="type"
                            value={type}
                            options={questionTypes}
                            onChange={handleTypeChange}
                            placeholder="Select a type"
                            className="dropdown-field"
                        />
                    </div>

                    {flagOptions && (
                        <div className="input-group">
                            <label htmlFor="options">Options (comma-separated)</label>
                            <InputText
                                id="options"
                                value={options}
                                onChange={(e) => setOptions(e.target.value)}
                                className="input-field"
                            />
                        </div>
                    )}

                    <div className="button-group">
                        <Button
                            label="Create"
                            onClick={() => {
                                setVisible(false);
                                createQuestion();
                            }}
                            className="p-button-rounded p-button-purple p-button-large"
                        />
                        <Button
                            label="Cancel"
                            onClick={() => setVisible(false)}
                            className="p-button-rounded p-button-secondary p-button-large"
                        />
                    </div>
                </div>
            </Dialog>

            <style>{`
                .page-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background-color: #f3e5f5;
                }

                .button-container {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .dialog-container {
                    background-color: #f3e5f5;
                    border-radius: 15px;
                    padding: 20px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-bottom: 15px;
                }

                .input-group label {
                    font-size: 1rem;
                    font-weight: bold;
                    color: #6a1b9a;
                }

                .input-field {
                    background-color: #ffffff;
                    border: 2px solid #ba68c8;
                    border-radius: 8px;
                    padding: 0.5rem;
                    font-size: 1rem;
                    color: #333;
                    outline: none;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }

                .input-field:focus {
                    border-color: #8e24aa;
                    box-shadow: 0px 0px 5px rgba(142, 36, 170, 0.5);
                }

                .dropdown-field {
                    background-color: #ffffff;
                    border: 2px solid #ba68c8;
                    border-radius: 8px;
                    padding: 0.5rem;
                    font-size: 1rem;
                    color: #333;
                    outline: none;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }

                .button-group {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                .p-button-purple {
                    background-color: #8e24aa;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    padding: 15px 30px;
                }

                .p-button-purple:hover {
                    background-color: #6a1b9a;
                }

                .p-button-secondary {
                    background-color: #f0f0f0;
                    color: #333;
                    font-size: 1.2rem;
                    padding: 15px 30px;
                }

                .p-button-secondary:hover {
                    background-color: #e0e0e0;
                }

                .p-button-large {
                    font-size: 1.2rem;
                    padding: 15px 30px;
                }
            `}</style>
        </div>
    );
};

export default ManagerAddQuestions;