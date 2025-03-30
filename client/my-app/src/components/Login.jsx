import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { setToken, logOut } from '../store/reducer/tokenSlice'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate=useNavigate();
  const token = useSelector(state => state.token.token)
  console.log("hhere",token);
  
  const dispatch = useDispatch()

  const loginUser = async (data) => {
    const username = data.username
    const password = data.password
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { username, password, course: '67e84081175d3491a880e394' })
      if (res.status !== 200)//didnt succeed to login
      {
        console.log('you cant login')
      }
      console.log(res.data.accessToken);
      dispatch(setToken(res.data)) 
    }
    catch (e) {
      console.log(e);
    }

  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const onSumbit = (data) => {
    console.log(data);
    loginUser(data);
    navigate('/CourseIntroduce',{state:{course:{_id:"67e84081175d3491a880e394",
      name:"FirstCouorse",description:"financialCourse",speeker:"67e83ac7c16a3f8030913e28"
    }}})
    // return(<>
    //    {navigate('/CourseIntroduce')} 
    //     </>)
  }

  return (
    <div className='login'>
      <div className="app-container">
        <div className="form-container">
          <h2 className="form-title">כניסה לקורס</h2>
          <form onSubmit={handleSubmit(onSumbit)}>

            <div className={`input-group${errors.name ? 'error' : ''}`}>
              <label >UserName</label>
              <input
                {...register("username", { required: true, minLength: 3, type: "text" })}
              />
            </div>
            <div className={`input-group ${errors.password ? 'error' : ''}`}>
              <label >Password *</label>
              <input
                type='password'
                {...register("password", { required: true, minLength: 3 })}
              />
            </div>

            <button type="submit" className="submit-btn">Sign in</button>
            {/* {token} */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
