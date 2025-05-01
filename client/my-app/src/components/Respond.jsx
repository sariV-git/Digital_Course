import React, { useRef, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Respond() {

    const user = useSelector(state => state.user.user)
    const course = useSelector(state => state.course.course)
    const token=useSelector(state=>state.token.token)
    const [respondText, setRespondText] = useState('');
    const username = useRef(null);
    const [insertRespond, setInsertRespond] = useState(false);
    
    const saveRespond = async () => {
        const respondToCreate={
            text:respondText,
            course:course._id,
            user:user._id,
            username:username.current.value
        }
        try {
            const resRespond =await axios.post('http://localhost:5000/respond',respondToCreate,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log("succeed create respond" ,resRespond);
            

        } catch (error) {
            console.log("an error with keeping respond",error);
            
        }
    }
    return (
        <div className="flex justify-content-center align-items-center h-screen bg-light-purple">
            <div className="card p-4 shadow-3" style={{ width: '30rem', borderRadius: '10px', border: '1px solid #D8BFD8' }}>
                <div className="mb-4">
                    <FloatLabel>
                        <InputTextarea
                            id="description"
                            value={respondText}
                            onChange={(e) => {
                                setRespondText(e.target.value);
                                if (e.target.value !== "") setInsertRespond(true);
                                else setInsertRespond(false);
                            }}
                            rows={5}
                            cols={30}
                            style={{ borderColor: '#D8BFD8', borderRadius: '8px' }}
                        />
                        <label htmlFor="description" style={{ color: '#8B008B', fontWeight: 'bold' }}>Your Respond...</label>
                    </FloatLabel>
                </div>

                <div className="flex flex-column gap-3">
                    <div>
                        <label htmlFor="username" style={{ color: '#8B008B', fontWeight: 'bold' }}>Name</label>
                        {insertRespond ? (
                            <>
                                <InputText
                                    ref={username}
                                    id="username"
                                    aria-describedby="username-help"
                                    style={{ borderColor: '#D8BFD8', borderRadius: '8px', width: '100%' }}
                                />
                                <small id="username-help" style={{ color: '#8B008B' }}>
                                    Enter the name which you want to present for all
                                </small>
                            </>
                        ) : (
                            <InputText
                                disabled
                                placeholder="Name"
                                style={{
                                    borderColor: '#D8BFD8',
                                    borderRadius: '8px',
                                    width: '100%',
                                    backgroundColor: '#F5F5F5',
                                }}
                            />
                        )}
                    </div>

                    <Button
                        onClick={saveRespond}
                        label="Send"
                        style={{
                            backgroundColor: '#8B008B',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            width: '100%',
                        }}
                        disabled={!insertRespond}
                    />
                </div>
            </div>
        </div>
    );
}
