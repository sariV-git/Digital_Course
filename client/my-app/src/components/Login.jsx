import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { setToken, logOut } from '../store/reducer/tokenSlice'
import { useLocation, useNavigate } from 'react-router-dom';
import { setCourse } from '../store/reducer/courseSlice';
import { setIsManager } from '../store/reducer/tokenSlice';
import { setItemsInTheMenubar } from '../store/reducer/itemsInTheMenubarSlice';
// navigate('/Login', { state: { course: course } })

const Login = () => {
  const location = useLocation()
  const course = location.state.course
  const navigate = useNavigate();
  const token = useSelector(state => state.token.token)
  const dispatch = useDispatch()

  const loginUser = async (data) => {

    const username = data.username
    const password = data.password
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { username, password,course: course._id })
      console.log('success', res.data);

      if (res.status !== 200)//didnt succeed to login
      {
        navigate('/Register')
      }
      console.log(res.data.accessToken);
      dispatch(setToken(res.data))
      const token = res.data.accessToken
      
      if (res.data.role == 'Admin') {
        //write the users in a global file
        dispatch(setIsManager(true))
        //i want insert for the menubar some option that only manager can do
        dispatch(setItemsInTheMenubar({
          newItems: [{ label: 'Edit Lessons', icon: 'pi pi user', to: '/ManagerAddLesson' },
          { label: 'Edit Course', icon: 'pi pi-user', to: '/ManagerAddCourse' },{
            label:'Users Page',icon:'pi pi-user',to:'/ManagerUsersPage'
          }
          ]
        }))
      }

    }
    catch (e) {
      dispatch(setCourse({newCourse:course}))
      navigate('/Register')
      console.log(e);
      dispatch(setIsManager(false))
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
    dispatch(setCourse({ newCourse: course }))
    loginUser(data);
    //check if this user is already find in this course

    navigate('/CourseIntroduce', { state: { course: course } })
    // navigate('/CourseIntroduce',{state:{course:{_id:"67e84081175d3491a880e394",
    //   name:"FirstCouorse",description:"financialCourse",speeker:"67e83ac7c16a3f8030913e28"
    // }}})

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
