import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import { setLesson } from "../store/reducer/lessonSlice";
import { useEffect, useState } from "react";
import LessonVideo from "./LessonVideo";
import { Button } from "primereact/button";
import axios from "axios";
const Lesson = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [task, setTask] = useState(null)
  const token = useSelector(state => state.token.token)
  const lesson = location.state.lesson
  const [user, setUser] = useState(null);
  const [showTask, setShowTask] = useState(false)


  useEffect(() => {
    dispatch(setLesson({ newLesson: lesson }))//??realy need it??

    const loadData = async () => {
      try {
        //load the data about the task
        const taskResponse = await axios.get(`http://localhost:5000/task/AccordingLesson/${lesson._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        //load the data about the user
        const userResponse = await axios.get('http://localhost:5000/user/byToken', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(userResponse.data)
        console.log('userResponse',userResponse);
        
        setTask(taskResponse.data)
        console.log('task', taskResponse.data)
        //load this data to check if already the user did this task
        const respondUserTask = await axios.get(`http://localhost:5000/userTask/ByUserAndTask/${userResponse.data._id}/${taskResponse.data._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log('respondUserTask', respondUserTask.data);

        if (!respondUserTask.data.userTask)
          setShowTask(true)
      } catch (error) {
        console.log('error in loaddata in lessonpage', error);
      }
    }
    loadData()

  }, [])

  const goToTask = () => {
    navigate('/Task', { state: { task: task } })
  }

  
  return (<>
    <h2>Lesson:{lesson.name}</h2>
    
    <LessonVideo path={lesson.path} />
    {task && task.title}
    {showTask && task && <Button onClick={() => { goToTask() }}>do the task</Button>}
  <Button onClick={()=>{navigate('/ManagerUsersAnswers',{state:{lesson:lesson}})}}>usersTask</Button>
  </>)
}

export default Lesson