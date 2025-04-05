import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTask } from "../store/reducer/taskSlice"
import { useLocation } from "react-router-dom"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { MultiSelect } from 'primereact/multiselect';
import { Button } from "primereact/button"


const Task = () => {

  let index = 0;//this index for the number of the quesion which i need to show for the user
  const answer = useRef(null)//the current answer
  const [lastIndex, setLastIndex] = useState(0)
  const user=useSelector(state=>state.user.user)
  const location = useLocation()
  const task = location.state.task
  const dispatch = useDispatch()
  const token = useSelector(state => state.token.token)
  const lesson = useSelector(state => state.lesson.lesson)
  const [questions, setQuestions] = useState(null)
  const [load, setLoad] = useState(true)
  const [currentQuestion,setCurrentQuestion]=useState(null)
  const loadDataQuestion = async () => {
    try {
      const respond = await axios.get(`http://localhost:5000/question/AccordingTask/${task._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('quesions ', respond.data);
      setQuestions(respond.data)
      setCurrentQuestion(respond.data[0]?respond.data[0]:null)
      console.log('the number of the question:', respond.data.length, respond.data[0]);

      setLastIndex(respond.data.length - 1)
      setLoad(false)
    } catch (error) {
      console.log('error...........', error);
    }
  }

  useEffect(() => {
    console.log('user',user,token);
    
    console.log('task in task', task);
    loadDataQuestion()
  }, [])

  const keepAnswer = async () => {
    //if this last 
    if (answer) {
      const currentAnswer = {
        text: answer.current.value,
        question:questions[index],
        user:user._id
      }
    
      try {
          const respond = await axios.post('http://localhost:5000/answer',currentAnswer,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
         console.log(respond.data);
          index += 1
          setCurrentQuestion(questions[index])
      } catch(error) {
          console.log('error in keep answer', error);

        }
      }
    else {
      alert('waiting for your answer...')//the user didnt put an answer
    }

    if (index > lastIndex)
      alert('you are finish to answer on all the quesitons!!!')
  }


  return (<>
    {load ? <>Loading...</> : <>

      {currentQuestion&&
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


// const MyComponent = () => {
//   const elements = [];
//   let i = 0;

//   while (i < 5) {
//     elements.push(<p key={i}>Item #{i + 1}</p>);
//     i++;
//   }

//   return (
//     <>
//       <h2>Here!</h2>
//       {elements}
//     </>
//   );
// };


