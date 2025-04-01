import React, { useState } from 'react';
import '../App.css';
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Register = () => {
  const navigate = useNavigate()
 const course=useSelector(state=>state.course.course)
  const createUser = async (data) => {
    
    try {
      const newUser = {
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        course:course._id
      }
      const res = await axios.post('http://localhost:5000/auth/register', newUser)
      console.log('succeed register user');
      navigate('/Login',{state:{
        course:course
      }})
    }
    catch (error) {

    }
  }
  //succeed to register
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSumbit = (data) => {
    console.log(data);
    createUser(data)
  }


  return (
    <div className='login'>
      <div className="app-container">
        <div className="form-container">
          <h2 className="form-title">Create an Account</h2>
          <form onSubmit={handleSubmit(onSumbit)}>

            <div className={`input-group${errors.name ? 'error' : ''}`}>
              <label >firstName</label>
              <input
                {...register("firstName", { required: true, minLength: 3, type: "text" })}
              />
            </div>

            <div className={`input-group${errors.name ? 'error' : ''}`}>
              <label >lastName</label>
              <input
                {...register("lastName", { required: true, minLength: 3, type: "text" })}
              />
            </div>

            <div className={`input-group${errors.name ? 'error' : ''}`}>
              <label >UserName</label>
              <input
                {...register("username", { required: true, minLength: 3, type: "text" })}
              />
            </div>

            <div className={`input-group ${errors.password ? 'error' : ''}`}
            >
              <label >Password *</label>
              <input
                type='password'
                {...register("password", { required: true, minLength: 3 })}
              />
            </div>

            <div className={`input-group ${errors.email ? 'error' : ''}`}>
              <label >Email Address</label>
              <input
                {...register("email", { required: true, minLength: 3, type: "text" })}
              />
            </div>
            <div className={`input-group ${errors.phone ? 'error' : ''}`}>
              <label >Phone</label>
              <input
                {...register("phone", { required: true, minLength: 3, type: "text" })}
              />
            </div>



            <button type="submit" className="submit-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
