// import { Button } from "primereact/button";
// import React, { useState, useRef, useEffect } from "react";
// import { Dialog } from "primereact/dialog";
// import axios from "axios";
// import { InputText } from "primereact/inputtext";
// import { useSelector } from "react-redux";
// import { FileUpload } from "primereact/fileupload";
// import { useNavigate } from "react-router-dom";

// const ManagerAddCourse = () => {
//     const [visible, setVisible] = useState(false);
//     const token = useSelector((state) => state.token.token);
//     const navigate = useNavigate();
//     const name = useRef("");
//     const usernameSpeeker = useRef("");
//     const information = useRef("");
//     const [videoTriler, setVideoTriler] = useState(null);
//     const [backgroundImage, setBackgroundImage] = useState(null);
//     const [isCreateEnabled, setIsCreateEnabled] = useState(false); // State for enabling/disabling the "Create" button


//     useEffect(()=>{console.log("the image or the triler changed");
//         checkCreateButtonState()
//     },[backgroundImage,videoTriler])
//     // Handle background image selection (immediate update after file selection)
//     const handleBackgroundImageSelect = (e) => {
//         if (e.files && e.files[0]) {
//             setBackgroundImage(e.files[0]);
//             console.log("Background image selected:", e.files[0]);
//             checkCreateButtonState(); // Check button state immediately
//         }
//     };
    

//     // Handle video trailer selection (immediate update after file selection)
//     const handleVideoSelect = (e) => {
//         if (e.files && e.files[0]) {
//             setVideoTriler(e.files[0]);
//             console.log("Video trailer selected:", e.files[0]);
//             checkCreateButtonState(); // Check button state immediately
//         }
//     };

//     // Check if the "Create" button should be enabled
//     const checkCreateButtonState = () => {
//         const isNameValid = name.current?.value && name.current.value.trim() !== "";
//         const isVideoValid = videoTriler !== null;
//         const isImageValid = backgroundImage !== null;

//         console.log("Name valid:", isNameValid);
//         console.log("Video valid:", isVideoValid);
//         console.log("Image valid:", isImageValid);

//         if (isNameValid && isVideoValid && isImageValid) {
//             setIsCreateEnabled(true); // Enable the button if all conditions are met
//         } else {
//             setIsCreateEnabled(false); // Disable the button otherwise
//         }
//     };

//     // Handle input changes
//     const handleInputChange = () => {
//         checkCreateButtonState();
//     };

//     const createCourse = async () => {
//         const formData = new FormData();
//         formData.append("name", name.current.value);
//         formData.append("information", information.current.value);
//         formData.append("pathTriler", videoTriler);
//         formData.append("backgroundImage", backgroundImage);
//         const usernamespeeker = usernameSpeeker.current.value;

//         try {
//             const resSpeeker = await axios.get(
//                 `http://localhost:5000/user/byUserName/${usernamespeeker}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             console.log("Speaker details:", resSpeeker.data);
//             formData.append("speaker", resSpeeker.data._id);

//             const resCourse = await axios.post(
//                 "http://localhost:5000/course",
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             console.log("Successfully created course:", resCourse.data);

//             navigate("/CoursesPage");
//         } catch (error) {
//             console.log("Error during course creation:", error);
//         }
//     };

//     return (
//         <div className="card flex justify-content-center">
//             <h2>Create a New Course</h2>
//             <Button label="Create" onClick={() => setVisible(true)} />
//             <Dialog
//                 visible={visible}
//                 modal
//                 onHide={() => {
//                     if (!visible) return;
//                     setVisible(false);
//                 }}
//             >
//                 <div
//                     className="flex flex-column px-8 py-5 gap-4"
//                     style={{
//                         borderRadius: "12px",
//                         backgroundImage:
//                             "radial-gradient(circle at left top, var(--primary-400), var(--primary-700))",
//                     }}
//                 >
//                     <div className="inline-flex flex-column gap-2">
//                         <label
//                             htmlFor="name"
//                             className="text-primary-50 font-semibold"
//                         >
//                             Name
//                         </label>
//                         <InputText
//                             ref={name}
//                             id="name"
//                             className="bg-white-alpha-20 border-none p-3 text-primary-50"
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div className="inline-flex flex-column gap-2">
//                         <label
//                             htmlFor="usernameSpeeker"
//                             className="text-primary-50 font-semibold"
//                         >
//                             Username Speeker
//                         </label>
//                         <InputText
//                             ref={usernameSpeeker}
//                             id="usernameSpeeker"
//                             className="bg-white-alpha-20 border-none p-3 text-primary-50"
//                             type="text"
//                         />
//                     </div>
//                     <div className="inline-flex flex-column gap-2">
//                         <label
//                             htmlFor="information"
//                             className="text-primary-50 font-semibold"
//                         >
//                             Information
//                         </label>
//                         <InputText
//                             ref={information}
//                             id="information"
//                             className="bg-white-alpha-20 border-none p-3 text-primary-50"
//                         />
//                     </div>
//                     <FileUpload
//                         accept="video/mp4"
//                         maxFileSize={500000000000000000}
//                         name="video"
//                         mode="basic"
//                         auto={false} // Disable default auto-upload
//                         onSelect={handleVideoSelect} // Handle file selection immediately
//                         chooseLabel="Upload Your Video"
//                     />
//                     <FileUpload
//                         accept="image/*"
//                         maxFileSize={10000000000000}
//                         name="backgroundImage"
//                         mode="basic"
//                         auto={false} // Disable default auto-upload
//                         onSelect={handleBackgroundImageSelect} // Handle file selection immediately
//                         chooseLabel="Upload Your Background Image"
//                     />

//                     <div className="flex align-items-center gap-2">
//                         <Button
//                             label="Create"
//                             onClick={createCourse}
//                             disabled={!isCreateEnabled} // Button is enabled/disabled based on state
//                             className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
//                         />
//                         <Button
//                             label="Cancel"
//                             onClick={() => setVisible(false)}
//                             className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
//                         />
//                     </div>
//                 </div>
//             </Dialog>
//         </div>
//     );
// };

// export default ManagerAddCourse;

import { Button } from "primereact/button";
import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { useSelector } from "react-redux";
import { FileUpload } from "primereact/fileupload";
import { useLocation, useNavigate } from "react-router-dom";

const ManagerAddCourse = (props) => {
const {visible,setVisible}=props
    // const [visible, setVisible] = useState(false);
    const token = useSelector((state) => state.token.token);
    const navigate = useNavigate();
    const name = useRef("");
    const usernameSpeeker = useRef("");
    const information = useRef("");
    const [videoTriler, setVideoTriler] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [isCreateEnabled, setIsCreateEnabled] = useState(false);

    useEffect(() => {
        checkCreateButtonState();
    }, [backgroundImage, videoTriler]);

    const handleBackgroundImageSelect = (e) => {
        if (e.files && e.files[0]) {
            setBackgroundImage(e.files[0]);
            checkCreateButtonState();
        }
    };

    const handleVideoSelect = (e) => {
        if (e.files && e.files[0]) {
            setVideoTriler(e.files[0]);
            checkCreateButtonState();
        }
    };

    const checkCreateButtonState = () => {
        const isNameValid = name.current?.value && name.current.value.trim() !== "";
        const isVideoValid = videoTriler !== null;
        const isImageValid = backgroundImage !== null;

        setIsCreateEnabled(isNameValid && isVideoValid && isImageValid);
    };

    const handleInputChange = () => {
        checkCreateButtonState();
    };

    const createCourse = async () => {
        const formData = new FormData();
        formData.append("name", name.current.value);
        formData.append("information", information.current.value);
        formData.append("pathTriler", videoTriler);
        formData.append("backgroundImage", backgroundImage);
        const usernamespeeker = usernameSpeeker.current.value;

        try {
            const resSpeeker = await axios.get(
                `http://localhost:5000/user/byUserName/${usernamespeeker}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            formData.append("speaker", resSpeeker.data._id);

            const resCourse = await axios.post(
                "http://localhost:5000/course",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate("/CoursesPage");
        } catch (error) {
            console.error("Error during course creation:", error);
        }
    };

    return (
        <div className="card flex justify-content-center">
            {/* <h2>Create a New Course</h2>
            <Button label="Create" onClick={() => setVisible(true)} /> */}
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
                            ref={name}
                            id="name"
                            className="input-field"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="usernameSpeeker">Speaker Username</label>
                        <InputText
                            ref={usernameSpeeker}
                            id="usernameSpeeker"
                            className="input-field"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="information">Information</label>
                        <InputText
                            ref={information}
                            id="information"
                            className="input-field"
                            onChange={handleInputChange}
                        />
                    </div>
                    <FileUpload
                        accept="video/mp4"
                        maxFileSize={500000000}
                        name="video"
                        mode="basic"
                        auto={false}
                        onSelect={handleVideoSelect}
                        chooseLabel="Upload Video Trailer"
                        className="file-upload"
                    />
                    <FileUpload
                        accept="image/*"
                        maxFileSize={1000000}
                        name="backgroundImage"
                        mode="basic"
                        auto={false}
                        onSelect={handleBackgroundImageSelect}
                        chooseLabel="Upload Background Image"
                        className="file-upload"
                    />
                    <div className="button-group">
                        <Button
                            label="Create"
                            onClick={createCourse}
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
                    background-color:rgb(200, 154, 229); /* Darker purple */
                }

                /* Button group styling */
                .button-group {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                .p-button-purple {
                    background-color:rgb(128, 61, 147); /* Purple button */
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

export default ManagerAddCourse;