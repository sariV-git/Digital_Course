import { Button } from "primereact/button"
import React, { useState, useRef, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import axios from "axios";
import { InputText } from 'primereact/inputtext'
import { useDispatch, useSelector } from "react-redux";
import { FileUpload } from 'primereact/fileupload';
import { useNavigate } from "react-router-dom";
import { setItemsInTheMenubar } from '../store/reducer/itemsInTheMenubarSlice';

const ManagerAddLesson = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const currentCourse = useSelector(state => state.course.course)
    const token = useSelector(state => state.token.token)

    const [file, setFile] = useState(null)
    const name = useRef('')
    const numOfLesson = useRef('')

    const onFileUpload = (e) => {
        console.log('upload the file', e.files[0]);
        setFile(e.files[0])
    }

    //create
    const CreateLesson = async () => {
        const formData = new FormData()
        formData.append('name', name.current.value)
        formData.append('numOfLesson', numOfLesson.current.value)
        formData.append('path', file)
        formData.append('course', currentCourse._id)

        try {
            const res = await axios.post('http://localhost:5000/lesson', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('Lesson created successfully:', res.data);
            const lesson = res.data
            navigate('/ManagerAddTask', {
                state: {
                    lesson: lesson
                }
            })
        }
        catch (e) {
            console.error('There was an error uploading the lesson:', e);
        }
    }

    useEffect(()=>{dispatch(setItemsInTheMenubar({
        newItems:[{ label: 'Edit Lessons', icon: 'pi pi user', to: '/ManagerAddLesson' },
            { label: 'Edit Course', icon: 'pi pi-user', to: '/ManagerAddCourse' }, {
                label: 'Users Page', icon: 'pi pi-user', to: '/ManagerUsersPage'},
            {label:'Lessons List',icon:'pi pi-user',to:'/LessonsList'}]
    }))},[])
        


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
                                numOfLesson
                            </label>
                            <InputText id="password" ref={numOfLesson} label="text" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text"></InputText>
                        </div>
                        <FileUpload accept='video/mp4' maxFileSize={500000000} name='video' mode="basic" url="/api/upload" customUpload uploadHandler={onFileUpload} chooseLabel="Upload Your Video"
                        />

                        <div className="flex align-items-center gap-2">
                            <Button label="Create" onClick={(e) => { hide(e); CreateLesson() }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>

                    </div>
                )}
            ></Dialog>
        </div>
    )
}


export default ManagerAddLesson




