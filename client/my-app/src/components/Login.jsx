import React, { useState } from 'react';
import '../App.css';
import { useForm } from "react-hook-form"
import axios from 'axios';


const  Login=() =>{

    const loginUser=async(data)=>{
        const username=data.username
        const password=data.password
        const res=await axios.post('http://localhost:5000/auth/login',{username,password,course:'67ced00a033a88790183c9d0'})
        if(res.status!==200)//didnt succeed to login
          {
            console.log('you cant login')
          } 
          console.log(res.data.accessToken); 
    }
    const {
        register,
        handleSubmit,
        watch,
        formState:{errors},
    }=useForm()

    const onSumbit=(data)=>{
          loginUser(data); 
}
    

  return (
    <div className="app-container">
      <div className="form-container">
        <h2 className="form-title">Create an Account</h2>
        <form onSubmit={handleSubmit(onSumbit)}>
          
        <div className={`input-group${errors.name ? 'error' : ''}`}>
            <label >UserName</label>
            <input
              {...register("username",{required:true,minLength:3,type:"text"})}
            />
          </div>
          <div className= {`input-group ${errors.password ? 'error' : ''}`}>
            <label >Password *</label>
            <input
                type='password'
              {...register("password",{required:true,minLength:3})}
            />
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
