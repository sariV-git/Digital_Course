import React, { useState } from 'react';
import '../App.css';
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Register = () => {
  const navigate = useNavigate()
  const course = useSelector(state => state.course.course)
  const [usernameError, setUsernameError] = useState(""); 

  const createUser = async (data) => {

    try {
      const newUser = {
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        course: course._id
      }
      const res = await axios.post('http://localhost:5000/auth/register', newUser)
      console.log('succeed register user');
      navigate('/Login', {
        state: {
          course: course
        }
      })
    }
    catch (error) {
      if (error.response && error.response.status === 409) {
        setUsernameError(" שם המשתמש כבר קיים. נסה שם משתמש אחר.");
      } else {
        console.error("Error registering user:", error);
      }
    }
  }
  //succeed to register
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Enables form validation as the user types
  })

  const onSumbit = (data) => {
    setUsernameError("");
    createUser(data)
  }


  return (
    <div className='login'>
      <div className="app-container">
        <div className="form-container">
          <h2 className="form-title">Create an Account</h2>
          <form onSubmit={handleSubmit(onSumbit)}>
            <div className={`input-group${errors.name ? 'error' : ''}`}>
              <label >שם פרטי</label>
              <input
                {...register("firstName", { required: "First Name is required", minLength: { value: 2, message: "First Name must be at least 2 characters" } })}
              />
              {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
            </div>

            <div className={`input-group${errors.name ? 'error' : ''}`}>
              <label >שם משפחה</label>
              <input
                {...register("lastName", { required: "Last Name is required", minLength: { value: 2, message: "Last Name must be at least 2 characters" } })}
              />
              {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
            </div>

            <div className={`input-group${errors.name ? 'error' : ''}`}>
              <label >שם משתמש</label>
              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 6, message: "Username must be at least 6 characters" },
                  maxLength: { value: 9, message: "Username cannot exceed 9 characters" },
                  onChange: (e) => {
                    setUsernameError(""); // איפוס הודעת השגיאה
                  }
                })}
              />
               {usernameError && <span className="error-message">{usernameError}</span>}
              {errors.username && <span className="error-message">{errors.username.message}</span>}

            </div>

            <div className={`input-group ${errors.password ? 'error' : ''}`}
            >
              <label >סיסמא *</label>
              <input
                type='password'
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 4, message: "Password must be at least 4 characters" },
                })}
              />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>

            <div className={`input-group ${errors.email ? 'error' : ''}`}>
              <label >כתובת מייל</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className={`input-group ${errors.phone ? 'error' : ''}`}>
              <label >מספר פלאפון</label>
              <input
                {...register("phone", {
                  required: "Phone is required",
                  minLength: { value: 7, message: "Phone must be at least 7 digits" },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone must contain only numbers"
                  }
                })}
              />
              {errors.phone && <span className="error-message">{errors.phone.message}</span>}

            </div>



            <button type="submit" className="submit-btn" disabled={!isValid}>שלח</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
