import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { setToken, logOut } from '../store/reducer/tokenSlice'


const Login = () => {
  const token = useSelector(state => state.token.token)

  const dispatch = useDispatch()

  const loginUser = async (data) => {
    const username = data.username
    const password = data.password
    const res = await axios.post('http://localhost:5000/auth/login', { username, password, course: '67ced00a033a88790183c9d0' })
    if (res.status !== 200)//didnt succeed to login
    {
      console.log('you cant login')
    }
    console.log(res.data.accessToken);
    dispatch(setToken(res.data))
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
          {token}
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
