import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { setToken, logOut } from '../store/reducer/tokenSlice'
import { setUser } from '../store/reducer/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCourse } from '../store/reducer/courseSlice';
import { setIsManager } from '../store/reducer/tokenSlice';
import { setItemsInTheMenubar } from '../store/reducer/itemsInTheMenubarSlice';
import { setBelongToTheCourses} from '../store/reducer/userSlice';

const Login = () => {
  const location = useLocation()
  const course = useSelector(state => state.course.course)
  const navigate = useNavigate();
  const token = useSelector(state => state.token.token)
  const dispatch = useDispatch()
  
let arrayWithIdOfCoursesUserBelong=[]//at this array i want to fill all the id of the courses which the user belong to.
  const fillArrayWithIdOfCoursesUserBelong = async (user, token) => {
    try {
      const res = await axios.get(`http://localhost:5000/userCourse/accordingUser/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`//because only user can get all the courseuser by user
        }
      })
      console.log('usercourse of the user--see in the data',res);
      
      const usercourses = res.data
      if (usercourses) {
         arrayWithIdOfCoursesUserBelong = usercourses.map(usercourse => {
          return usercourse.course
        })
      }
      else
        console.log('usercourses', usercourses);
      dispatch(setBelongToTheCourses({ newItems: arrayWithIdOfCoursesUserBelong }))
    } catch (error) {
      console.log('error', error);
    }
  }
  const loginUser = async (data) => {

    const username = data.username
    const password = data.password

    try {
      const res = await axios.post('http://localhost:5000/auth/login', { username, password,course:course?course._id:null})
      if (res.data.role != 'Admin')
        fillArrayWithIdOfCoursesUserBelong(res.data.user, res.data.accessToken)
      
      
      
      dispatch(setToken(res.data))
//to cancel the option that the login return user      
      if (res.data.role == 'Admin') {
        console.log('you are a manager!!!');
        dispatch(setIsManager(true))
        //i want insert for the menubar some option that only manager can do
      }
      else
      dispatch(setIsManager(false))//can remove it??

      //  navigate('/IntroduceCourse',{state:{course:course}})
    navigate('/CourseIntroduce', { state: { course: course } })

    }
    catch (e) {
      navigate('/Register')
      console.log('error in login user', e); 
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
    //keep the course which the user enter to
    loginUser(data);
    //check if this user is already find in this course

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
