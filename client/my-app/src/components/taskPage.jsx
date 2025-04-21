import axios from "axios"
import {  useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTask } from "../store/reducer/taskSlice"
import { useLocation, useNavigate } from "react-router-dom"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { MultiSelect } from 'primereact/multiselect';
import { Button } from "primereact/button"

const Task = () => {
  const[index,setIndex]=useState(0)
  const answer = useRef(null)//the current answer
  const [lastIndex, setLastIndex] = useState(0)
  const location = useLocation()
  const task = location.state.task
  const dispatch = useDispatch()
  const token = useSelector(state => state.token.token)
  const [user, setUser] = useState(null);
  const lesson = useSelector(state => state.lesson.lesson)
  const [questions, setQuestions] = useState(null)
  const [load, setLoad] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const[answers,setAnswers]=useState([])
  // const newArrayAnswers=[]
const navigate=useNavigate()

  useEffect(() => {

    const loadDataQuestion = async () => {
      try {
        const respond = await axios.get(`http://localhost:5000/question/AccordingTask/${task._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('question', respond.data);
        setQuestions(respond.data)
        setCurrentQuestion(respond.data[0] ? respond.data[0] : null)
        console.log('the number of the questions: ', respond.data.length);
        setLastIndex(respond.data.length - 1)
        const userResponse = await axios.get('http://localhost:5000/user/byToken', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(userResponse.data)
        console.log('user', userResponse.data);

      } catch (error) {
        console.log('error fetching data: ', error);
      }
      finally {
        setLoad(false)
      }
    }
    setLoad(true)
    loadDataQuestion()
  }, [])

  const keepAnswer = async () => {
    if (answer.current) {
      const currentAnswer = {
        text: answer.current.value,
        question: questions[index]._id,
        user: user._id
      };
  
      try {
        const respond = await axios.post('http://localhost:5000/answer', currentAnswer, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAnswers(prevAnswers => {
          const newAnswers = [...prevAnswers, respond.data._id];
          console.log('Updated Answers: ', newAnswers); // Now logs the updated state
          return newAnswers;
        });

        // setAnswers(prevAnswers=>[...prevAnswers,respond.data._id])
        // console.log('Answer saved: ', respond.data);
          const nextIndex = index + 1;
        // Check if there are more questions
        if (nextIndex <= lastIndex) {
          setIndex(nextIndex); // Update the index to the next one
          setCurrentQuestion(questions[nextIndex]); // Set the next question
        } else {
          console.log('ffffffffffinal answersBefore: ',answers);
          console.log('ffffffffffinal answersAfter: ',[...answers,respond.data._id]);

          const userTask={
            user:user._id,
            task:task._id,
            answers:[...answers,respond.data._id]
          }
          const userTaskrespond=await axios.post(`http://localhost:5000/userTask`,userTask,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          console.log('userTaskrespond',userTaskrespond);
          
          alert('You have completed all the questions!');
          navigate('/LessonsList')
        }
      } catch (error) {
        console.log('Error saving answer: ', error);
      }
    } else {
      alert('Please provide an answer');
    }
    console.log('Index:', index, ' Last Index:', lastIndex);
  };
  
  return (
    <>
      {load ?
        (<>Loading...</>) : <>

          {currentQuestion &&
            <Card>
              <p>{currentQuestion.text}</p>
              {currentQuestion.type == 'American' ? <></> :
                <InputText ref={answer} type="text" className="p-inputtext-lg" placeholder="your answer" />}
              <Button onClick={() => { keepAnswer() }}>keep</Button>
            </Card>
          }
        </>}

    </>)
}

export default Task



