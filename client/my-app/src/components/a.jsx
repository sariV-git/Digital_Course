
import { Button } from "primereact/button";
import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { useSelector } from "react-redux";
import { FileUpload } from "primereact/fileupload";
import { useLocation, useNavigate } from "react-router-dom";



const A=(props)=>{

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

    return(
        <>
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
        </>
    )
}
export default A;