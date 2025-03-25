import React, { useState } from 'react';
import '../App.css';
import { useForm } from "react-hook-form"
import axios from 'axios'

const Register=()=> {

    const createUser=async(data)=>{
        const newUser={
            username:data.username,
            password:data.password,
            firstName:data.firstName,
            lastName:data.lastName,
            email:data.email,
            phone:data.phone,
            course:'67ced00a033a88790183c9d0'
        }
    const res=await axios.post('http://localhost:5000/auth/register',newUser)
    if(res.status!==200)//didn't succeed to register
        {
          console.log("you can't register to this course!")
        }
    }
    //succeed to register
    const {
        register,
        handleSubmit,
        watch,
        formState:{errors},
    }=useForm()

      const onSumbit=(data)=>{console.log(data);
     createUser(data)}
    

  return (
    <div className='login'>
    <div className="app-container">
      <div className="form-container">
        <h2 className="form-title">Create an Account</h2>
        <form onSubmit={handleSubmit(onSumbit)}>
          
        <div className={`input-group${errors.name ? 'error' : ''}`}>
            <label >firstName</label>
            <input
              {...register("firstName",{required:true,minLength:3,type:"text"})}
            />
          </div>

          <div className={`input-group${errors.name ? 'error' : ''}`}>
            <label >lastName</label>
            <input
              {...register("lastName",{required:true,minLength:3,type:"text"})}
            />
          </div>

          <div className={`input-group${errors.name ? 'error' : ''}`}>
            <label >UserName</label>
            <input
              {...register("username",{required:true,minLength:3,type:"text"})}
            />
          </div>

          <div className= {`input-group ${errors.password ? 'error' : ''}`}
>
            <label >Password *</label>
            <input
                type='password'
              {...register("password",{required:true,minLength:3})}
            />
          </div>

          <div className={`input-group ${errors.email ? 'error' : ''}`}>
            <label >Email Address</label>
            <input
              {...register("email",{required:true,minLength:3,type:"text"})}
            />
          </div>
          <div className={`input-group ${errors.phone ? 'error' : ''}`}>
            <label >Phone</label>
            <input
              {...register("phone",{required:true,minLength:3,type:"text"})}
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
