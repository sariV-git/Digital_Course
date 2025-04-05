import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";







const ManagerAddQuestions = () => {
    const token = useSelector(state => state.token.token)
    const text = useRef('')
    const type = useRef('')
    const options = useRef('')
    const numOfQuestion = useRef('')
    const location = useLocation()
    const navigate = useNavigate()
    const task = location.state.task
    const [visible, setVisible] = useState(false);
    const [flagOptions, setFlagOptions] = useState(false)

    const finishWriteQuestions = () => {
        alert('succeed to create full lesson succeffully--!!--')
        navigate('/LessonsList')
    }

    const handleInputChange = (e) => {
        const value = e.target.value
        if (value.toLowerCase() === 'american')
            setFlagOptions(true)
        else
            setFlagOptions(false)
    }
    const createQuestion = async () => {
        try {
            const question = {
                text: text.current.value,
                task: task._id,
                numOfQuestion: numOfQuestion.current.value,
                options: options.current.value ? (options.current.value).split(',') : null,
                type: options.current.value ? 'American' : 'Free'
            }
            console.log(question);
            setFlagOptions(false)
            const res = axios.post('http://localhost:5000/question', question, {
                headers: {  
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {

        }
        console.log('succeed create question!');
        
    }
    const create = () => {
        setVisible(true)
    }
    return (<div className="card flex justify-content-center">
        <Button onClick={create}>create Question</Button>
        <Dialog
            visible={visible}
            modal
            onHide={() => { if (!visible) return; setVisible(false); }}
            content={({ hide }) => (
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            text
                        </label>
                        <InputText ref={text} id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            numOfQuestion
                        </label>
                        <InputText ref={numOfQuestion} id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            type
                        </label>
                        <InputText onChange={handleInputChange} ref={type} id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                    </div>
                    {flagOptions && <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            options
                        </label>
                        <InputText ref={options} id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                    </div>}

                    <div className="flex align-items-center gap-2">
                        <Button label="Create" onClick={(e) => { hide(e); createQuestion() }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>

                </div>
            )}
        ></Dialog>
        <Button onClick={finishWriteQuestions}>Finish</Button>
    </div>)
}

export default ManagerAddQuestions