import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useRef } from "react";
import { useSelector } from "react-redux";

const ManagerUpdateLesson = (props) => {
    const token = useSelector(state => state.token.token)
    const lesson = useSelector(state => state.lesson.lesson)
    const { visible, setVisible, setLessons,lessons } = props
    const name = useRef('');
    const numOfLesson = useRef('')

    const updateLesson = async () => {
        try {
            const newLesson = {
                _id: lesson._id,
                name: name.current.value,
                numOfLesson: numOfLesson.current.value
            }
            const res = await axios.put('http://localhost:5000/lesson', newLesson,
                {
                    headers: {
                        Authorization: `Bearer ${token}`}
                })
            const currentLessons=lessons.filter(l=>l._id!=newLesson._id)
            setLessons([...currentLessons,res.data])
              console.log('succeed update lesson');
              
        } catch (error) {
console.log('error',error);

        }
    }
    return (
        <span className="card flex justify-content-center">


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
                            <InputText id="username" ref={name} label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                numOfLesson
                            </label>
                            <InputText id="password" ref={numOfLesson} label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text"></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="Update" onClick={(e) => { hide(e); updateLesson() }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>

                        </div>
                    </div>
                )}
            ></Dialog>
        </span>
    )
}

export default ManagerUpdateLesson
