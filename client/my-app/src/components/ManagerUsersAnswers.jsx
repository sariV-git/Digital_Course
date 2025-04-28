import axios from "axios"
import { Accordion, AccordionTab } from "primereact/accordion"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useEffect, useState ,useRef} from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

//specific lesson(task)
const ManagerUsersAnswers = () => {
    const token = useSelector(state => state.token.token)
    const location = useLocation()
    const lesson = location.state.lesson//??check how should send it??
    const [usersTask, setUsersTask] = useState([])
    const [questions, setQuestions] = useState([])//the questions of this task
    const [load, setLoad] = useState(true)
    const FeedBackText=useRef(null)
    const [showInputFeedBack,setShowInputFeedback]=useState(false)
    useEffect(() => {
        const loadData = async () => {
            try {
                const taskRespond = await axios.get(`http://localhost:5000/task/AccordingLesson/${lesson._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log('taskRespond', taskRespond);

                const task = taskRespond.data._id//the id of the task
                console.log('task._id: ', taskRespond.data._id);

                //all the usertask which relate to this task
                const usersTaskRespond = await axios.get(`http://localhost:5000/userTask/AccordingTask/${task}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log('usersTaskRespond', usersTaskRespond);
                setUsersTask(usersTaskRespond.data.usersTask)

                const questionsRespond = await axios.get(`http://localhost:5000/question/AccordingTask/${taskRespond.data._id}`, {
                    // const questionsRespond=await axios.get(`http://localhost:5000/question/AccordingTask/${task._id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setQuestions(questionsRespond.data)
                console.log('the questions are: ', questionsRespond.data);

                setLoad(false)
            } catch (error) {
                console.log(' error in ManagerUsersAnswers: ', error);

            }
        }
        loadData()
    }, [])
const keepFeedback=async(userTask_id)=>{
    const newFeedback={
        userTask:userTask_id,
        text: FeedBackText.current.value
    }
 try {
    const feedbackResponse=await axios.post('http://localhost:5000/feedback',newFeedback,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    console.log('feedbackResponse: ',feedbackResponse);
    FeedBackText.current.value=""
    setShowInputFeedback(false)
    alert('your feedback keeped!')
 } catch (error) {
    console.log('error in saving feedback',error);
    
 }
}
    //for the design:
    const createDynamicTabs = () => {
        console.log('innnnnnnnnnnnnnnnnnnn createDynamicTabs');
        
        return usersTask.map((userTask, i) => {
            return (
                <AccordionTab key={userTask._id} header={`${userTask.user.name.firstName} ${userTask.user.name.lastName}`}>
                    <p>the questions and the answers:</p>
                    {questions.map(question => {
                        const matchAnswer = userTask.answers.find(answer => answer.question === question._id)
                        return (matchAnswer && <p>question: {question.text}, answer: {matchAnswer.text}</p>)
                    })}
                    <Button onClick={()=>setShowInputFeedback(true)}>FeedBack</Button>
                     {showInputFeedBack&&<InputText ref={FeedBackText} placeholder="your feedback..."></InputText>}
                     {showInputFeedBack&&<Button onClick={()=>{FeedBackText.current.value&&keepFeedback(userTask._id)}}>keep</Button>}
                </AccordionTab>
            )
        })
    }

    return (<>
        {load ? <>Loading</> :
            <>
                {/* {usersTask.map(usertask => (<>{usertask.user.name.firstName}</>))}
                {questions.map(question => (<>{question.text}</>))}


                {usersTask.map(userTask => {

                    return (<><h1>{`${userTask.user.name.firstName} ${userTask.user.name.lastName}`}</h1>

                    </>)
                })} */}
                <div className="card">
                    <Accordion>{createDynamicTabs()}</Accordion>
                </div>
            </>}



    </>)
}
export default ManagerUsersAnswers