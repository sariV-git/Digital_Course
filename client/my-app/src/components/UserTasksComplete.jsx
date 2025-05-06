import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import UserTask from './UserTask'


const UserTasksComplete = () => {
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.user.user)
    const token = useSelector(state => state.token.token)
    const lessons = useSelector(state => state.lesson.lessons)
    const [userTasks,setUserTasks]=useState([])

    const loadData = async () => {//wrapping all in try and catch
        try{
        const finalArray = await Promise.all(lessons.map(async lesson => {
            const matchTaskRes = await axios.get(`http://localhost:5000/task/AccordingLesson/${lesson._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const task = matchTaskRes.data
            const matchUserTaskRes = await axios.get(`http://localhost:5000/userTask/getUserTaskAccordingUserAndTask/${user._id}/${task._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const userTask = matchUserTaskRes.data.userTask
            if (userTask) {
                const answers_id = userTask.answers

                const answers = await Promise.all(answers_id.map(async answer_id => {//the full answers
                    const answerRes = await axios.get(`http://localhost:5000/answer/${answer_id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    return answerRes.data
                }))
                const questionsRes = await axios.get(`http://localhost:5000/question/AccordingTask/${task._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                return {exist:true,numOfLesson:lesson.numOfLesson,titleTask:task.title,questions:questionsRes.data,answers:answers}
            }
            else{//ther is no users tasks
                 return{exist:false}
            }
        }))
        console.log("fffffinalArray",finalArray);
        setUserTasks(finalArray)

    }
    catch(e)
    {
        console.log("it failed--in load usertasks ",e);
    }
    setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])
    return (<>
        {
            loading?<>Loading</>:
            <>
            {userTasks.map(userTask=>{
                if(userTask.exist)
                return (<>lesson: {userTask.numOfLesson}<br/><UserTask title={userTask.titleTask}questions={userTask.questions}answers={userTask.answers}/></>)
                return <>not found!!</>
            })}
            </>

        }
    </>)
}

export default UserTasksComplete