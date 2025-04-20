import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const RespondsAccordingCourse = (props) => {
    const [load, setLoad] = useState(true)
    const course = props.course
    const [responds, setResponds] = useState([])
    const token = useSelector(state => state.token.token)
    const loadResponds = async () => {
        try {
            const resResponds = await axios.get(`http://localhost:5000/respond/getAccordingIntroduceAndCourse/${course._id}`)

            console.log('succeed load the responds of this course ', resResponds);
            setResponds(resResponds.data)
            setLoad(false)
        } catch (error) {
            console.log('an error in loadResponds', error);
        }
    }
    useEffect(
        () => { loadResponds() }
        , [])
    return (<>
        {load ? <>Loading...</> : <>
            { responds.map(respond=>{
                return(<>
                name:{respond.username}
                respond:{respond.text}
                </>)
            })}
        </>}
    </>)
}

export default RespondsAccordingCourse