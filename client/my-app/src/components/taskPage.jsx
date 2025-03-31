import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTask } from "../store/reducer/taskSlice"
import { useLocation } from "react-router-dom"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { MultiSelect } from 'primereact/multiselect';


const Task = () => {
  const location = useLocation()
  const task = location.state.task
  const dispatch = useDispatch()
  const token = useSelector(state => state.token.token)
  const lesson = useSelector(state => state.lesson.lesson)
  const [questions, setQuestions] = useState(null)
  const [load, setLoad] = useState(true)

  const loadDataQuestion = async () => {
    try {
      const respond = await axios.get(`http://localhost:5000/question/AccordingTask/${task._id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log('quesions ', respond.data);
      setQuestions(respond.data)
      setLoad(false)
    } catch (error) {
      console.log('error...........', error);
    }
  }
 
  useEffect(() => {
    console.log('task in task',task);
    loadDataQuestion()
  }, [])

  

  return (<>
    {load ? <>Loading...</> : <>
      {questions.map(question=>{
        return<Card>
          <h1>num:{question.numOfQuestion}</h1>
          <p>{question.text}</p>
          {question.type=='American'?<></>:
          <InputText type="text" className="p-inputtext-lg" placeholder="your answer" />}
        </Card>
      })}
      </>}

  </>)
}

export default Task
////////////////

// import React, { useState } from "react";

// export default function BasicDemo() {
   

//     return (
//         <div className="card flex justify-content-center">
//             <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name" 
//                 placeholder="Select Cities" maxSelectedLabels={3} className="w-full md:w-20rem" />
//         </div>
//     );
// }
        
