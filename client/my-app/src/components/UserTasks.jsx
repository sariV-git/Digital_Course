import { useLocation } from "react-router-dom"
import axios from "axios"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Accordion, AccordionTab } from "primereact/accordion"
import { InputText } from "primereact/inputtext"
//introduce all the tasks of one User
const UserTasks = () => {

    const location = useLocation()
    const user_id = location.state.user_id
    const token = useSelector(state => state.token.token)
    const [loading, setLoading] = useState(true)
    const [tabsTask, setTabsTask] = useState([])
    const [showInputFeedback, setShowInputFeedback] = useState(false)
    const feedbackText = useRef(null)

    useEffect(() => {
        const loadTasksUserData = async () => {//get the _id of the user
            try {
                const resUsersTask = await axios.get(`http://localhost:5000/userTask/AllUserTasksAccordingUser/${user_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                )
                const dataTabs = await Promise.all(resUsersTask.data.usersTask.map(async userTask => {//pass on all the tasks of the user
                    try {
                        const taskRespond = await axios.get(`http://localhost:5000/task/${userTask.task}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        console.log('the task: ', taskRespond);
                        const questionsRespond = await axios.get(`http://localhost:5000/question/AccordingTask/${taskRespond.data._id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        const fullAnswers = await Promise.all(userTask.answers.map(async answer => {
                            const answerRespond = await axios.get(`http://localhost:5000/answer/${answer}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                            return answerRespond.data
                        }))
                        const feedbackRespond = await axios.get(`http://localhost:5000/feedback/AccordingUserTask/${userTask._id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        console.log('feedbackRespond--------', feedbackRespond.data);
                        return {
                            userTask_id: userTask._id,
                            task: taskRespond.data.title,
                            questions: questionsRespond.data,
                            answers: fullAnswers,
                            feedback: feedbackRespond.data.text ? { _id: feedbackRespond.data._id, text: feedbackRespond.data.text } : null
                        }
                    } catch (error) {
                        console.log('error in the loop map of usersTask', error)
                    }
                }))

                setTabsTask(dataTabs)
                setLoading(false)

            } catch (error) {
                console.log('error in resUserTask', error);
                setLoading(false)
            }
        }
        loadTasksUserData()
    }, [])

    const keepFeedback = async (userTask_id) => {
        const newFeedback = {
            userTask: userTask_id,
            text: feedbackText.current.value
        }
        try {
            const feedbackResponse = await axios.post('http://localhost:5000/feedback', newFeedback, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('feedbackResponse: ', feedbackResponse);
            feedbackText.current.value = ""
            setShowInputFeedback(false)
            alert('your feedback keeped!')
        } catch (error) {
            console.log('error in saving feedback', error);
        }
    }

    const updateFeedback = async (feedback_id) => {
        const updateFeedback = {
            _id: feedback_id,
            text: feedbackText.current.value
        }
        const feedbackUpdateRespond = await axios.put('http://localhost:5000/feedback', updateFeedback, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log('feedbackUpdateRespond', feedbackUpdateRespond);

    }

    if(loading)
        return(<>Loading...</>)
    
    return (<> 
    <div className="card">
        <Accordion>
            {tabsTask.map((tabTask, index) => {
                return (
                    <AccordionTab key={index} header={tabTask.task}>
                        {
                            tabTask.questions.map(question => {
                                const matchAnswer = tabTask.answers.find(answer => answer.question === question._id)
                                return (<div key={question._id}>
                                    <p>quesiton:{question.text}</p>
                                    {matchAnswer && <p>Answer:{matchAnswer.text}</p>}
                                </div>)
                            })
                        }
                        {/* if there is no feedback */}
                        {!tabTask.feedback ? (<> <Button onClick={() => setShowInputFeedback(true)}>FeedBack</Button>
                            {showInputFeedback && <InputText ref={feedbackText} placeholder="your feedback..."></InputText>}
                            {showInputFeedback && <Button onClick={() => { feedbackText.current.value && keepFeedback(tabTask.userTask_id) }}>
                                keep</Button>}</> ): (<>
                            <Button onClick={() => setShowInputFeedback(true)}>update FeedBack</Button>
                            {/* ??to change the placeholder to realy place */}
                            {showInputFeedback && <InputText ref={feedbackText} placeholder={`${tabTask.feedback.text}`}></InputText>}
                            {showInputFeedback && <Button onClick={() => { feedbackText.current.value && updateFeedback(tabTask.feedback._id) }}>
                                update</Button>}
                        </>)}
                    </AccordionTab>)
            }
            )}
        </Accordion>
    </div>
</>)
}



//delete-->
// if (loading) {
//     return <div>Loading...</div>;
// }



export default UserTasks