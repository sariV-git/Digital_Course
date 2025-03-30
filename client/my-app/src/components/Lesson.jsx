import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import { setLesson } from "../store/reducer/lessonSlice";
import { useEffect, useState } from "react";
import LessonVideo from "./LessonVideo";
import { Button } from "primereact/button";
import axios from "axios";
const Lesson=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const location=useLocation()
    const [task,setTask]=useState(null)
    const[token,setToken]=useState(useSelector(state=>state.token.token))
    const lesson=location.state.lesson  
    useEffect(() => {
        dispatch(setLesson({newLesson:lesson}))
    }, [])

    const goToTask=async()=>{
            try {
              const respond = await axios.get(`http://localhost:5000/task/AccordingLesson/${lesson._id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              setTask(respond.data)
              console.log('task',respond.data)
             if(task) navigate('/Task',{state:{task:task}})
            } catch (error) {
        
            }

          }
    
    return(<>
    <h2>Lesson:{lesson.name}</h2>
    <LessonVideo/>
    <Button onClick={()=>{goToTask()}}>do the task</Button>
    </>)
}

export default Lesson