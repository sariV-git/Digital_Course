import axios from "axios"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"


export default function RespondUser() {
    const location=useLocation()
    const {user,course}=location.state
    const token=useSelector(state=>state.token.token)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    const onSubmit = async(data) => {
        const newRespond={
            user:user,
            course:course,
            text:data.text,
            username:data.username,
        }
        try {
            console.log('newRespond',newRespond);
            
            const res=await axios.post('http://localhost:5000/respond',newRespond,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
         alert('you succeed create respond')
        } catch (error) {
            console.log('error in create respond ',error);  
        }         
    }
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
           <p>by which name do you want that your respond will introduce to all</p>
            <input defaultValue='ע"ש' {...register("username")} />

            {/* include validation with required or other standard HTML validation rules */}
            <p>write here your respond about this course</p>
            <input {...register("text", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.text && <span>This field is required</span>}

           <br/>
            <input type="submit"/>
        </form>
    )
}
