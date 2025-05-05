import axios from "axios"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"


const ManagerAddTask = () => {
    const navigate = useNavigate()
    const token = useSelector(state => state.token.token)
    const location = useLocation()
    const currentLesson = location.state.lesson
    const [visible, setVisible] = useState(false);

    const title = useRef('')
    const lesson = currentLesson._id
    const createTask = async () => {
        const newTask = {
            title: title.current.value,
            lesson: lesson
        }
        try {
            const res = await axios.post('http://localhost:5000/task', newTask, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const task = res.data
            console.log('succeed create task', res.data);
            navigate('/ManagerAddQuestions', { state:
                {
                    task:task
                }
            })
        } catch (error) {
console.log('error...',error);

        }
    }
    return (<div className="card flex justify-content-center">
        <br/> <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        create task for that lesson
        <Button label="Create Task" onClick={() => setVisible(true)} />

        <Dialog
            visible={visible}
            modal
            onHide={() => { if (!visible) return; setVisible(false); }}
            content={({ hide }) => (
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            title
                        </label>
                        <InputText ref={title} id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                    </div>

                    <div className="flex align-items-center gap-2">
                        <Button label="Create" onClick={(e) => { hide(e); createTask() }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>

                </div>
            )}
        ></Dialog>
    </div>)
}

export default ManagerAddTask