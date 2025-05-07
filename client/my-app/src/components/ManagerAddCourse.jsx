
// import React, { useState, useEffect } from "react";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import { FileUpload } from "primereact/fileupload";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setCourses } from "../store/reducer/courseSlice";
// const ManagerAddCourse = (props) => {
//     const { visible, setVisible } = props;
//     const token = useSelector((state) => state.token.token);
//     const navigate = useNavigate();

//     const [courseName, setCourseName] = useState("");
//     const [speakerUsername, setSpeakerUsername] = useState("");
//     const [courseInfo, setCourseInfo] = useState("");
//     const [videoTriler, setVideoTriler] = useState(null);
//     const [backgroundImage, setBackgroundImage] = useState(null);
//     const [isCreateEnabled, setIsCreateEnabled] = useState(false);
//    const courses=useSelector(state=>state.course.courses)
//    const dispatch=useDispatch()
//     useEffect(() => {
//         const isNameValid = courseName.trim() !== "";
//         const isVideoValid = videoTriler !== null;
//         const isImageValid = backgroundImage !== null;
//         setIsCreateEnabled(isNameValid && isVideoValid && isImageValid);
//     }, [courseName, speakerUsername, courseInfo, videoTriler, backgroundImage]);

//     const handleVideoSelect = (e) => {
//         if (e.files && e.files.length > 0) {
//             setVideoTriler(e.files[0]);
//         }
//     };

//     const handleImageSelect = (e) => {
//         if (e.files && e.files.length > 0) {
//             setBackgroundImage(e.files[0]);
//         }
//     };

//     const createCourse = async () => {
//         const formData = new FormData();
//         formData.append("name", courseName);
//         formData.append("information", courseInfo);
//         formData.append("pathTriler", videoTriler);
//         formData.append("backgroundImage", backgroundImage);

//         try {
//             const speakerRes = await axios.get(
//                 `http://localhost:5000/user/byUserName/${speakerUsername}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             formData.append("speaker", speakerRes.data._id);
//        const courseRes=      await axios.post("http://localhost:5000/course", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             console.log("courseRes", courseRes.data);
//            dispatch(setCourses({newCourses:[...courses,courseRes.data]}))

//             console.log("setVisible------", visible);

//             setVisible(false)
//             console.log("after setVisible", visible);

//             // navigate("/CoursesPage");
//         } catch (error) {
//             console.error("Error creating course:", error);
//         }
//     };

//     return (
//         <div className="card flex justify-content-center">
//             <Dialog
//                 visible={visible}
//                 modal
//                 onHide={() => setVisible(false)}
//                 style={{ width: "500px", borderRadius: "15px" }}
//             >
//                 <div className="dialog-container">
//                     <div className="input-group">
//                         <label htmlFor="name">Course Name</label>
//                         <InputText
//                             id="name"
//                             className="input-field"
//                             value={courseName}
//                             onChange={(e) => setCourseName(e.target.value)}
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label htmlFor="usernameSpeeker">Speaker Username</label>
//                         <InputText
//                             id="usernameSpeeker"
//                             className="input-field"
//                             value={speakerUsername}
//                             onChange={(e) => setSpeakerUsername(e.target.value)}
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label htmlFor="information">Information</label>
//                         <InputText
//                             id="information"
//                             className="input-field"
//                             value={courseInfo}
//                             onChange={(e) => setCourseInfo(e.target.value)}
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label>Upload Video Trailer</label>
//                         <FileUpload
//                             name="video"
//                             accept="video/mp4"
//                             maxFileSize={5000000000}
//                             onSelect={handleVideoSelect}
//                             chooseLabel="Select Video"
//                             mode="basic"
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label>Upload Background Image</label>
//                         <FileUpload
//                             accept="image/*"
//                             maxFileSize={10000000}
//                             name="backgroundImage"
//                             onSelect={handleImageSelect}
//                             chooseLabel="Select Image"
//                             mode="basic"
//                         />
//                     </div>

//                     <div className="button-group">
//                         <Button
//                             label="Create"
//                             onClick={() => {
//                                 console.log("createCourse()");
//                                 setVisible(false)
//                                 createCourse()
//                             }}
//                             disabled={!isCreateEnabled}
//                             className="p-button-rounded p-button-purple"
//                         />
//                         <Button
//                             label="Cancel"
//                             onClick={() => {console.log("in cancel button");
//                              setVisible(false)}}
//                             className="p-button-rounded p-button-secondary"
//                         />
//                     </div>
//                 </div>
//             </Dialog>

//             <style>{`
//                 .dialog-container {
//                     background-color: #f3e5f5;
//                     border-radius: 15px;
//                     padding: 20px;
//                     box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//                 }

//                 .input-group {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 8px;
//                     margin-bottom: 15px;
//                 }

//                 .input-group label {
//                     font-size: 1rem;
//                     font-weight: bold;
//                     color: #6a1b9a;
//                 }

//                 .input-field {
//                     background-color: #ffffff;
//                     border: 2px solid #ba68c8;
//                     border-radius: 8px;
//                     padding: 0.5rem;
//                     font-size: 1rem;
//                     color: #333;
//                     outline: none;
//                     transition: border-color 0.3s ease, box-shadow 0.3s ease;
//                 }

//                 .input-field:focus {
//                     border-color: #8e24aa;
//                     box-shadow: 0px 0px 5px rgba(142, 36, 170, 0.5);
//                 }

//                 .button-group {
//                     display: flex;
//                     justify-content: space-between;
//                     margin-top: 20px;
//                 }

//                 .p-button-purple {
//                     background-color:rgb(128, 61, 147);
//                     border: none;
//                     color: white;
//                 }

//                 .p-button-purple:hover {
//                     background-color: #6a1b9a;
//                 }

//                 .p-button-secondary {
//                     background-color: #f0f0f0;
//                     color: #333;
//                 }

//                 .p-button-secondary:hover {
//                     background-color: #e0e0e0;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default ManagerAddCourse;

import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../store/reducer/courseSlice";

const ManagerAddCourse = (props) => {
    const { visible, setVisible } = props;
    const token = useSelector((state) => state.token.token);
    const courses = useSelector((state) => state.course.courses);
    const dispatch = useDispatch();

    const [courseName, setCourseName] = useState("");
    const [speakerUsername, setSpeakerUsername] = useState("");
    const [courseInfo, setCourseInfo] = useState("");
    const [videoTriler, setVideoTriler] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [isCreateEnabled, setIsCreateEnabled] = useState(false);

    const [videoErrorMessage, setVideoErrorMessage] = useState(""); // הודעת שגיאה עבור וידאו
    const [imageErrorMessage, setImageErrorMessage] = useState(""); // הודעת שגיאה עבור תמונה

    // בדיקה אם ניתן להפעיל את כפתור היצירה

    useEffect(() => {
        const isNameValid = courseName.trim() !== "";
        const isVideoValid = videoTriler !== null;
        const isImageValid = backgroundImage !== null;
        setIsCreateEnabled(isNameValid && isVideoValid && isImageValid);
    }, [courseName, videoTriler, backgroundImage]);

    // טיפול בבחירת וידאו
    const handleVideoSelect = (e) => {
        if (e.files && e.files.length > 0) {
            const file = e.files[0];
            if (file.size > 2147483648) { // 2GB
                setVideoErrorMessage("The video file is too large. Maximum size is 2GB.");
                setVideoTriler(null);
            } else {
                setVideoErrorMessage(""); // נקה את הודעת השגיאה
                setVideoTriler(file);
            }
        }
    };

    // טיפול בבחירת תמונה
    const handleImageSelect = (e) => {
        if (e.files && e.files.length > 0) {
            const file = e.files[0];
            if (file.size > 10000000) { // 10MB
                setImageErrorMessage("The image file is too large. Maximum size is 10MB.");
                setBackgroundImage(null);
            } else {
                setImageErrorMessage(""); // נקה את הודעת השגיאה
                setBackgroundImage(file);
            }
        }
    };

    // יצירת קורס
    const createCourse = async () => {
        const formData = new FormData();
        formData.append("name", courseName);
        formData.append("information", courseInfo);
        formData.append("pathTriler", videoTriler);
        formData.append("backgroundImage", backgroundImage);

        try {
            // קבלת מידע על הדובר
            const speakerRes = await axios.get(
                `http://localhost:5000/user/byUserName/${speakerUsername}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            formData.append("speaker", speakerRes.data._id);
            const courseRes = await axios.post("http://localhost:5000/course", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("courseRes", courseRes.data);
            dispatch(setCourses({ newCourses: [...courses, courseRes.data] }));

            setVisible(false);
        } catch (error) {
            // טיפול בשגיאת גודל קובץ מהשרת
            if (error.response && error.response.status === 413) {
                console.error("File size exceeds limit.");
                alert("Error: File too large. Please upload files within the size limits.");
            } else {
                console.error("An error occurred while creating the course:", error);
                alert("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                style={{ width: "500px", borderRadius: "15px" }}
            >
                <div className="dialog-container">
                    <div className="input-group">
                        <label htmlFor="name">Course Name</label>
                        <InputText
                            id="name"
                            className="input-field"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="usernameSpeeker">Speaker Username</label>
                        <InputText
                            id="usernameSpeeker"
                            className="input-field"
                            value={speakerUsername}
                            onChange={(e) => setSpeakerUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="information">Information</label>
                        <textarea
                            id="information"
                            className="textarea-field"
                            value={courseInfo}
                            onChange={(e) => setCourseInfo(e.target.value)}
                            rows={5}
                            cols={30}
                            placeholder="Enter course information..."
                        />
                    </div>

                    <div className="input-group">
                        <label>Upload Video Trailer</label>
                        <FileUpload
                            name="video"
                            accept="video/mp4"
                            maxFileSize={2147483648} // 2GB
                            onSelect={handleVideoSelect}
                            onError={() => setVideoErrorMessage("The video file is too large. Maximum size is 2GB.")}
                            onClear={() => setVideoErrorMessage("")} // איפוס הודעת שגיאה
                            chooseLabel="Select Video"
                            mode="basic"
                        />
                        {videoErrorMessage && (
                            <p style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}>
                                {videoErrorMessage}
                            </p>
                        )}
                    </div>

                    <div className="input-group">
                        <label>Upload Background Image</label>
                        <FileUpload
                            accept="image/*"
                            maxFileSize={10000000} // 10MB
                            name="backgroundImage"
                            onSelect={handleImageSelect}
                            onError={() => setImageErrorMessage("The image file is too large. Maximum size is 10MB.")}
                            onClear={() => setImageErrorMessage("")} // איפוס הודעת שגיאה
                            chooseLabel="Select Image"
                            mode="basic"
                        />
                        {imageErrorMessage && (
                            <p style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}>
                                {imageErrorMessage}
                            </p>
                        )}
                    </div>

                    <div className="button-group">
                        <Button
                            label="Create"

                            onClick={() => {
                                setVisible(false);
                                createCourse();
                            }}
                            disabled={!isCreateEnabled}
                            className="p-button-rounded p-button-purple"
                        />
                        <Button
                            label="Cancel"

                            onClick={() => {
                                setVideoErrorMessage("");
                                setImageErrorMessage("");
                                setVisible(false);
                            }}
                            className="p-button-rounded p-button-secondary"

                        />
                    </div>
                </div>
            </Dialog>

            <style>{`
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

                .textarea-field {
                    background-color: #ffffff;
                    border: 2px solid #ba68c8;
                    border-radius: 8px;
                    padding: 0.5rem;
                    font-size: 1rem;
                    color: #333;
                    outline: none;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                    resize: none;
                }

                .textarea-field:focus {
                    border-color: #8e24aa;
                    box-shadow: 0px 0px 5px rgba(142, 36, 170, 0.5);
                }

                .input-field:focus {
                    border-color: #8e24aa;
                    box-shadow: 0px 0px 5px rgba(142, 36, 170, 0.5);
                }

                .button-group {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                .p-button-purple {
                    background-color: rgb(128, 61, 147);
                    border: none;
                    color: white;
                }

                .p-button-purple:hover {
                    background-color: #6a1b9a;
                }
            `}</style>
        </div>
    );
};

export default ManagerAddCourse;
