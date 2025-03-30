import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import { setLesson } from "../store/reducer/lessonSlice";
import { useEffect } from "react";

const Lesson=()=>{
    const dispatch=useDispatch()
    const location=useLocation()
    const lesson=location.state.lesson    
    return(<>
    Lesson:{lesson.name}
    {/* {console.log(useSelector(state=>state.lesson.lesson)) */}
    </>)
}

export default Lesson