//////----------continue from here try to put an image and create a lesson after ask chat gpt how to get the design like in the ultracode homepage
import { Button } from "primereact/button"
import React, { useState, useRef } from "react";
import { Dialog } from 'primereact/dialog';
import axios from "axios";
import { InputText } from 'primereact/inputtext'
import { useSelector } from "react-redux";
import { FileUpload } from 'primereact/fileupload';
import { useNavigate } from "react-router-dom";

const ManagerAddCourse = () => {
    const [visible, setVisible] = useState(false);
    const token = useSelector(state => state.token.token)
    const navigate = useNavigate()
    const name = useRef('')
    const usernameSpeeker = useRef('')
    const information = useRef('')
    const [videoTriler, setVideoTriler] = useState(null)
    const [backgroundImage, setBackgroundImage] = useState(null)
    const [videoTrilerName, setVideoTrilerName] = useState('')
    const [backgroundImageName, setBackgroundImageName] = useState('')

    const unUploadBackgroundImage = (e) => {
        
        if (e.files[0]) {
            console.log('nnnnnnnnnnfileeeeeeeeee',e.files[0]);
            
            setBackgroundImage(e.files[0])
            setBackgroundImageName(e.files[0].name)
        }
        if(backgroundImage)
           console.log('yyyyyy');
        else 
        console.log('nnnnnnnnnnnnnn');
        
           
    }
        const onFileUpload = (e) => {
            console.log('upload the file', e.files[0]);
            setVideoTriler(e.files[0])
            setVideoTrilerName(e.files[0].name)
        }

        const createCourse = async () => {            
            const formData = new FormData()
            formData.append('name', name.current.value)
            formData.append('information', information.current.value)
            formData.append('pathTriler', videoTriler)
            formData.append('backgroundImage', backgroundImage)
            const usernamespeeker = usernameSpeeker.current.value            
            try {
                const resSpeeker = await axios.get(`http://localhost:5000/user/byUserName/${usernamespeeker}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log('speeker', resSpeeker.data);
                formData.append('speaker', resSpeeker.data._id)

                const resCourse = await axios.post('http://localhost:5000/course', formData,
                    {
                        headers: {
                            'Content-Type':'multipart/form-data',
                             Authorization: `Bearer ${token}`
                        }
                    }  
                )
                console.log('succeed create course,', resCourse.data);

                navigate('/CoursesPage')
            } catch (error) {
          console.log('error',error);
          
            }
        }

        return (
            <div className="card flex justify-content-center">
                <h2>create a new lesson</h2>
                <Button label="Create" onClick={() => setVisible(true)} />
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ hide }) => (
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="username" className="text-primary-50 font-semibold">
                                    name
                                </label>
                                <InputText ref={name} id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                            </div>
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="username" className="text-primary-50 font-semibold">
                                    usernameSpeeker
                                </label>
                                <InputText id="password" ref={usernameSpeeker} label="text" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text"></InputText>
                            </div>
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="username" className="text-primary-50 font-semibold">
                                    information
                                </label>
                                <InputText ref={information} id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                            </div>
                            <FileUpload accept='video/mp4' maxFileSize={500000000} name='video' mode="basic" url="/" customUpload uploadHandler={onFileUpload} chooseLabel="Upload Your Video" />
                            <FileUpload accept='image/*' maxFileSize={1000000} name='backgroundImage' mode="basic" url="/" customUpload uploadHandler={unUploadBackgroundImage} chooseLabel="Upload Your backgroundImage" />

                            <div className="flex align-items-center gap-2">
                                <Button label="Create" onClick={(e) => { hide(e); createCourse() }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            </div>

                        </div>
                    )}
                ></Dialog>
            </div>
        )
    }

    export default ManagerAddCourse