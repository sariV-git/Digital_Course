// import { Button } from "primereact/button"
// import React, { useState, useRef, useEffect } from "react";
// import { Dialog } from 'primereact/dialog';
// import axios from "axios";
// import { InputText } from 'primereact/inputtext'
// import { useDispatch, useSelector } from "react-redux";
// import { FileUpload } from 'primereact/fileupload';
// import { useNavigate } from "react-router-dom";
// import { setItemsInTheMenubar } from '../store/reducer/itemsInTheMenubarSlice';

// const ManagerAddLesson = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [visible, setVisible] = useState(false);

//     const currentCourse = useSelector(state => state.course.course)
//     const token = useSelector(state => state.token.token)

//     const [videoLesson, setVideoLesson] = useState(null)//instead of the file??
//     const [isCreateEnabled, setIsCreateEnabled] = useState(null)
//     const name = useRef('')
//     const numOfLesson = useRef('')


//     const handleVideoSelect = (e) => {//on filupload
//         console.log('upload the file', e.files[0]);
//         setVideoLesson(e.files[0])

//     }

//     const checkCreateButtonState = () => {
//         const isNameValid = name.current?.value && name.current.value.trim() !== ""
//         const isNumOfLessonValid = numOfLesson.current?.value
//         const isVideoValid = videoLesson != null
//         if (isNameValid && isVideoValid && isNumOfLessonValid) {
//             setIsCreateEnabled(true); // Enable the button if all conditions are met
//         } else {
//             setIsCreateEnabled(false); // Disable the button otherwise
//         }
//     }

//     useEffect(() => { checkCreateButtonState() }, [videoLesson])
//     //create
//     const CreateLesson = async () => {
//         const formData = new FormData()
//         formData.append('name', name.current.value)
//         formData.append('numOfLesson', numOfLesson.current.value)
//         formData.append('path', videoLesson)
//         formData.append('course', currentCourse._id)

//         try {
//             const res = await axios.post('http://localhost:5000/lesson', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${token}`
//                 }
//             })
//             console.log('Lesson created successfully:', res.data);
//             const lesson = res.data
//             navigate('/ManagerAddTask', {
//                 state: {
//                     lesson: lesson
//                 }
//             })
//         }
//         catch (e) {
//             console.error('There was an error uploading the lesson:', e);
//         }
//     }

//     useEffect(() => {
//         dispatch(setItemsInTheMenubar({
//             newItems: [{ label: 'Edit Lessons', icon: 'pi pi user', to: '/ManagerAddLesson' },
//             { label: 'Edit Course', icon: 'pi pi-user', to: '/ManagerAddCourse' }, {
//                 label: 'Users Page', icon: 'pi pi-user', to: '/ManagerUsersPage'
//             },
//             { label: 'Lessons List', icon: 'pi pi-user', to: '/LessonsList' }]
//         }))
//     }, [])



//     return (
//         <div className="card flex justify-content-center">
//             <h2>create a new lesson</h2>
//             <Button label="Create" onClick={() => setVisible(true)} />
//             <Dialog
//                 visible={visible}
//                 modal
//                 onHide={() => { if (!visible) return; setVisible(false); }}
//                 content={({ hide }) => (
//                     <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

//                         <div className="inline-flex flex-column gap-2">
//                             <label htmlFor="username" className="text-primary-50 font-semibold">
//                                 name
//                             </label>
//                             <InputText ref={name} id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
//                         </div>
//                         <div className="inline-flex flex-column gap-2">
//                             <label htmlFor="username" className="text-primary-50 font-semibold">
//                                 numOfLesson
//                             </label>
//                             <InputText id="password" ref={numOfLesson} label="text" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text"></InputText>
//                         </div>
//                         <FileUpload
//                             accept="video/mp4"
//                             maxFileSize={500000000000000000}
//                             name="video"
//                             mode="basic"
//                             auto={false} // Disable default auto-upload
//                             onSelect={handleVideoSelect} // Handle file selection immediately
//                             chooseLabel="Upload Your Video"
//                         />
//                         <div className="flex align-items-center gap-2">
//                             <Button label="Create"disabled={!isCreateEnabled} onClick={(e) => { hide(e); CreateLesson() }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
//                             <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
//                         </div>

//                     </div>
//                 )}
//             ></Dialog>
//         </div>
//     )
// }


// export default ManagerAddLesson

import { Button } from "primereact/button";
import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { FileUpload } from "primereact/fileupload";
import { useNavigate } from "react-router-dom";
import { setItemsInTheMenubar } from "../store/reducer/itemsInTheMenubarSlice";

const ManagerAddLesson = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [visible, setVisible] = useState(false);
    const{visible,setVisible}=props
    const currentCourse = useSelector((state) => state.course.course);
    const token = useSelector((state) => state.token.token);

    const [videoLesson, setVideoLesson] = useState(null);
    const [isCreateEnabled, setIsCreateEnabled] = useState(false);
    const name = useRef("");
    const numOfLesson = useRef("");

    const handleVideoSelect = (e) => {
        console.log("Video selected:", e.files[0]);
        setVideoLesson(e.files[0]);
    };

    const checkCreateButtonState = () => {
        const isNameValid = name.current?.value && name.current.value.trim() !== "";
        const isNumOfLessonValid = numOfLesson.current?.value?.trim() !== "";
        const isVideoValid = videoLesson != null;

        setIsCreateEnabled(isNameValid && isVideoValid && isNumOfLessonValid);
    };

    useEffect(() => {
        checkCreateButtonState();
    }, [videoLesson]);

    const CreateLesson = async () => {
        const formData = new FormData();
        formData.append("name", name.current.value);
        formData.append("numOfLesson", numOfLesson.current.value);
        formData.append("path", videoLesson);
        formData.append("course", currentCourse._id);

        try {
            const res = await axios.post("http://localhost:5000/lesson", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Lesson created successfully:", res.data);
            const lesson = res.data;
            navigate("/ManagerAddTask", {
                state: {
                    lesson: lesson,
                },
            });
        } catch (e) {
            console.error("There was an error uploading the lesson:", e);
        }
    };

    useEffect(() => {
        dispatch(
            setItemsInTheMenubar({
                newItems: [
                    { label: "Edit Lessons", icon: "pi pi-user", to: "/ManagerAddLesson" },
                    { label: "Edit Course", icon: "pi pi-user", to: "/ManagerAddCourse" },
                    { label: "Users Page", icon: "pi pi-user", to: "/ManagerUsersPage" },
                    { label: "Lessons List", icon: "pi pi-user", to: "/LessonsList" },
                ],
            })
        ); 
    }, [dispatch]);

    return (
        <div className="card flex justify-content-center">
            {/* <h2>Create a New Lesson</h2>
            <Button label="Create" onClick={() => setVisible(true)} /> */}
            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                style={{ width: "500px", borderRadius: "15px" }}
            >
                <div className="dialog-container">
                    <div className="input-group">
                        <label htmlFor="name">Lesson Name</label>
                        <InputText
                            ref={name}
                            id="name"
                            className="input-field"
                            onChange={checkCreateButtonState}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="numOfLesson">Lesson Number</label>
                        <InputText
                            ref={numOfLesson}
                            id="numOfLesson"
                            className="input-field"
                            onChange={checkCreateButtonState}
                        />
                    </div>
                    <FileUpload
                        accept="video/mp4"
                        maxFileSize={500000000}
                        name="video"
                        mode="basic"
                        auto={false}
                        onSelect={handleVideoSelect}
                        chooseLabel="Upload Lesson Video"
                        className="file-upload"
                    />
                    <div className="button-group">
                        <Button
                            label="Create"
                            onClick={CreateLesson}
                            disabled={!isCreateEnabled}
                            className="p-button-rounded p-button-purple"
                        />
                        <Button
                            label="Cancel"
                            onClick={() => setVisible(false)}
                            className="p-button-rounded p-button-secondary"
                        />
                    </div>
                </div>
            </Dialog>
            <style>{`
                /* Form container */
                .dialog-container {
                    background-color: #f3e5f5; /* Light purple background */
                    border-radius: 15px;
                    padding: 20px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }

                /* Input group styling */
                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-bottom: 15px;
                }

                .input-group label {
                    font-size: 1rem;
                    font-weight: bold;
                    color: #6a1b9a; /* Purple label */
                }

                .input-field {
                    background-color: #ffffff; /* White background */
                    border: 2px solid #ba68c8; /* Purple border */
                    border-radius: 8px;
                    padding: 0.5rem;
                    font-size: 1rem;
                    color: #333;
                    outline: none;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }

                .input-field:focus {
                    border-color: #8e24aa; /* Darker purple on focus */
                    box-shadow: 0px 0px 5px rgba(142, 36, 170, 0.5); /* Purple glow */
                }

                /* File upload styling */
                .file-upload .p-button {
                    background-color: #8e24aa; /* Purple */
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    color: white;
                }

                .file-upload .p-button:hover {
                    background-color: #6a1b9a; /* Darker purple */
                }

                /* Button group styling */
                .button-group {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                .p-button-purple {
                    background-color: #8e24aa; /* Purple button */
                    border: none;
                    color: white;
                }

                .p-button-purple:hover {
                    background-color: #6a1b9a; /* Darker purple */
                }

                .p-button-secondary {
                    background-color: #f0f0f0; /* Light gray button */
                    color: #333;
                }

                .p-button-secondary:hover {
                    background-color: #e0e0e0; /* Darker gray */
                }
            `}</style>
        </div>
    );
};

export default ManagerAddLesson;


