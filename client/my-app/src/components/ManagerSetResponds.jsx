import axios from "axios"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const ManagerSetResponds = () => {
    const course = useSelector(state => state.course.course)
    const [loadData, setLoadData] = useState(true)
    const [responds, setResponds] = useState([])
    const token = useSelector(state => state.token.token)

    useEffect(() => {
        const loadResponds = async () => {
            const resResponds = await axios.get(`http://localhost:5000/respond/accordingCourse/${course._id}`, {//get all the responds according a specific course
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setResponds(resResponds.data)
            setLoadData(false)
        }
        loadResponds()

    }, [])
    //show resopond
    const showRespond = async (respond) => {
        try {

            const newRespond = {
                _id: respond._id,
                introduce: true
            }
            console.log(newRespond);

            const resRespond = await axios.put('http://localhost:5000/respond', newRespond, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
          const updatedResponds= responds.map(r=>{
            if(r._id===respond._id)
                return ({...respond,introduce:newRespond.introduce})
            return r
          })
          setResponds(updatedResponds)
            console.log('succeed show respond', resRespond);

        } catch (error) {
            console.log('an error with show respond', error);

        }
    }

    //hide respond
    const hideRespond = async (respond) => {
        try {
            const newRespond = {
                _id: respond._id,
                introduce: false
            }

            const resRespond = await axios.put('http://localhost:5000/respond', newRespond, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const updatedResponds= responds.map(r=>{
                if(r._id===respond._id)
                    return ({...respond,introduce:newRespond.introduce})
                return r
              })
              setResponds(updatedResponds)
            console.log('succeed hide respond', resRespond);
        } catch (error) {
            console.log('an error with hide respond', error);

        }
    }
    // const footer = (//??how can i aproach to some details that in the card when i use with map??
    //     <></>
    // )

    return (<>{loadData ? <>Loading...</> :
        <> {responds.map(respond => {
            return (<Card><p>respond: {respond.text}</p>
                <p>username: {respond.username}</p>
                <>{respond.introduce ? <Button key={respond._id} label="don't show me" severity="danger" onClick={() => { hideRespond(respond) }} /> : <Button severity="success" label="show me" onClick={() => showRespond(respond)} />}</>
            </Card>)
        })}

        </>}</>)
}

export default ManagerSetResponds