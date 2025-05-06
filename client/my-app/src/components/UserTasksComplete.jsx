import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const UserTasksComplete = () => {
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.user.user)
    const token = useSelector(state => state.token.token)
    const loadData = async () => {
        try {
            //first, need get all the task of this user
            const userTaskRes = await axios.get(`http://localhost:5000/userTask/AllUserTasksAccordingUser/${user?._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const userTasks = userTaskRes.data.userTasks
            console.log(userTasks);
            const finalArray = await Promise.all(userTasks.map(async userTask => {//see it can i wrapp in try and catch
                const answers_id = userTask.answers
                const answersRes = await Promise.all(answers_id.map(async answer_id => {//the full answers
                    const answerRes=await axios.get(`http://localhost:5000/answer/${answer_id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                return answerRes.data
                }))//the end of the map of finding the answers
                const answers=answersRes
                return "aaaa"
            }))


            console.log("answers data: ");
        } catch (error) {
            console.log("error in loadData for all user tasks", error);
        }
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])
    return (<>

    </>)
}

export default UserTasksComplete