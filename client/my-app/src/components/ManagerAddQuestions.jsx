import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useRef } from "react";


    

    


const ManagerAddQuestions = () => {
   
    const text=useRef('')
    const location = useLocation()
    const navigate = useNavigate()
    const task = location.state.task
    const [visible, setVisible] = useState(false);

    const finishWriteQuestions = () => {
        alert('succeed to create full lesson succeffully--!!--')
    }

    const createQuestion=()=>{
        console.log(text);
        
    }
    const create = () => {
        setVisible(true)
    }
    return (<div className="card flex justify-content-center">
        create Questin for that task
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