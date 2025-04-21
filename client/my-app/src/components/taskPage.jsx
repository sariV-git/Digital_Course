import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTask } from "../store/reducer/taskSlice"
import { useLocation, useNavigate } from "react-router-dom"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { MultiSelect } from 'primereact/multiselect';
import { Button } from "primereact/button"
import { RadioButton } from 'primereact/radiobutton';
const Task = () => {
  const [index, setIndex] = useState(0)
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
  const [answers, setAnswers] = useState([])
  const [options, setOptions] = useState([])
  const [initOptions, setInitOptions] = useState(false)//for the options of the american
  const navigate = useNavigate()


  
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
        setCurrentQuestion(respond.data[0] ? respond.data[0] : null)//the current question
        console.log('the number of the questions: ', respond.data.length);
        setLastIndex(respond.data.length - 1)
        const userResponse = await axios.get('http://localhost:5000/user/byToken', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(userResponse.data)//the user
        console.log('user', userResponse.data);

      } catch (error) {
        console.log('error fetching data: ', error);
      }
      finally {
        setLoad(false)
      }
    }
    setLoad(true)//can erase it??
    loadDataQuestion()
  }, [])


  const keepAnswer = async () => {
    if (answer.current) {//if there is a answer i keep it
      const currentAnswer = {
        text: answer.current.value,
        question: questions[index]._id,
        user: user._id
      };

      try {
        const respond = await axios.post('http://localhost:5000/answer', currentAnswer, {//try to keep the answer
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
          const userTaskrespond = await axios.post(`http://localhost:5000/userTask`, userTask, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log('userTaskrespond', userTaskrespond);

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


  //init the array if the question is american
  const initializationOptionsArray = () => {
    let numOfOption = -1;
    const array = currentQuestion.options.map((option) => {
      numOfOption++
      return { option: option, key: numOfOption }
    })
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", array)
    setOptions(array);
    console.log("?????????????????", options)
    setInitOptions(true)
  }
  const [selectedOPtion, setSelectedOPtion] = useState(options.length<0?options[0]:null);


  return (
    <>
      {load ?
        (<>Loading...</>) : <>

          {currentQuestion &&
            <Card>

              <p>{currentQuestion.text}</p>
              {currentQuestion.type === 'American' ? <>
                {//this function intial an array of the options and their keys and insert it to options
                  initializationOptionsArray()}
                
                  {<div className="card flex justify-content-center">
                    <div className="flex flex-column gap-3">
                    {options.length != 0 && options.map((option) => {
                        return (
                          <div key={option.key} className="flex align-items-center">{console.log('oooooooooption', option)}
                            <RadioButton inputId={option.key} name="options" value={option} onChange={(e) => setSelectedOPtion(e.value)} checked={selectedOPtion.key === option.key} />
                            <label htmlFor={option.key} className="ml-2">{option.name}</label>
                          </div>
                        );
                      })}
                    </div>
                  </div>}
              </> :
                <InputText ref={answer} type="text" className="p-inputtext-lg" placeholder="your answer" />}
              <Button onClick={() => { keepAnswer() }}>keep</Button>

            </Card>
          }
        </>}

    </>)
}

export default Task



