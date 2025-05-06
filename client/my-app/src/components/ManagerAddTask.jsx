// import axios from "axios"
// import { Button } from "primereact/button"
// import { Dialog } from "primereact/dialog"
// import { InputText } from "primereact/inputtext"
// import { useRef, useState } from "react"
// import { useSelector } from "react-redux"
// import { useLocation, useNavigate } from "react-router-dom"


// const ManagerAddTask = () => {
//     const navigate = useNavigate()
//     const token = useSelector(state => state.token.token)
//     const location = useLocation()
//     const currentLesson = location.state.lesson
//     const [visible, setVisible] = useState(false);

//     const title = useRef('')
//     const lesson = currentLesson._id
//     const createTask = async () => {
//         const newTask = {
//             title: title.current.value,
//             lesson: lesson
//         }
//         try {
//             const res = await axios.post('http://localhost:5000/task', newTask, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
//             const task = res.data
//             console.log('succeed create task', res.data);
//             navigate('/ManagerAddQuestions', { state:
//                 {
//                     task:task
//                 }
//             })
//         } catch (error) {
// console.log('error...',error);

//         }
//     }
//     return (<div className="card flex justify-content-center">
//         <br/> <br/>
//         <br/>
//         <br/>
//         <br/>
//         <br/>
//         create task for that lesson
//         <Button label="Create Task" onClick={() => setVisible(true)} />

//         <Dialog
//             visible={visible}
//             modal
//             onHide={() => { if (!visible) return; setVisible(false); }}
//             content={({ hide }) => (
//                 <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

//                     <div className="inline-flex flex-column gap-2">
//                         <label htmlFor="username" className="text-primary-50 font-semibold">
//                             title
//                         </label>
//                         <InputText ref={title} id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
//                     </div>

//                     <div className="flex align-items-center gap-2">
//                         <Button label="Create" onClick={(e) => { hide(e); createTask() }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
//                         <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
//                     </div>

//                 </div>
//             )}
//         ></Dialog>
//     </div>)
// }

// export default ManagerAddTask

import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ManagerAddTask = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.token.token);
    const location = useLocation();
    const currentLesson = location.state.lesson;
    const [visible, setVisible] = useState(false);

    const title = useRef("");
    const lesson = currentLesson._id;

    const createTask = async () => {
        const newTask = {
            title: title.current.value,
            lesson: lesson,
        };
        try {
            const res = await axios.post("http://localhost:5000/task", newTask, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const task = res.data;
            console.log("Successfully created task", res.data);
            navigate("/ManagerAddQuestions", {
                state: {
                    task: task,
                },
            });
        } catch (error) {
            console.log("Error creating task:", error);
        }
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Create a Task for the Lesson</h1>
            <Button
                label="Create Task"
                onClick={() => setVisible(true)}
                className="p-button-rounded p-button-purple p-button-large"
            />

            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                style={{ width: "500px", borderRadius: "15px" }}
            >
                <div className="dialog-container">
                    <h2 className="dialog-title">Create a New Task</h2>
                    <div className="input-group">
                        <label htmlFor="title">Task Title</label>
                        <InputText
                            ref={title}
                            id="title"
                            placeholder="Enter task title"
                            className="input-field"
                        />
                    </div>

                    <div className="button-group">
                        <Button
                            label="Create"
                            onClick={() => {
                                setVisible(false);
                                createTask();
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
                    padding: 20px;
                }

                .page-title {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #6a1b9a;
                    margin-bottom: 20px;
                }

                .dialog-container {
                    background-color: #f3e5f5;
                    border-radius: 15px;
                    padding: 20px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }

                .dialog-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #6a1b9a;
                    margin-bottom: 20px;
                    text-align: center;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-bottom: 20px;
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

                .button-group {
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
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

export default ManagerAddTask;