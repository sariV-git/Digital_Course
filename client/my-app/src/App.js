import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
// import LinearDemo from './components/forManagerRespond';
import Counter from './components/forCounter';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import LessonList from './components/LessonList';
import { Route, Routes } from 'react-router-dom';
import CourseIntroduce from './components/CourseIntroduce';
import Lesson from './components/Lesson';
import { useEffect, useState } from 'react';
import TemplateDemo from './components/Menubar';
import IntroduceUsers from './components/forIntroduceUsers';
import CourseCard from './components/fixedCardsPage';
import CourseModuleList from './components/pageListLessons';
import Task from './components/taskPage';
import CoursesPage from './components/CoursesPage';
import ManagerAddLesson from './components/ManagerAddLesson';
import ChooseVideo from './components/forChooseVideo';
import ManagerAddTask from './components/ManagerAddTask';
import ManagerAddQuestions from './components/ManagerAddQuestions';
import ManagerAddCourse from './components/ManagerAddCourse';
import Register from './components/Register';
import ManagerUsersPage from './components/ManagerUsersPAge';
import LessonVideo from './components/LessonVideo';
import LogOut from './components/LogOut';
import ManagerDeleteCourse from './components/ManagerDeleteCourse';
import RespondUser from './components/respondUser';
import ManagerSetResponds from './components/ManagerSetResponds';
import UserTask from './components/UserTask'
import UserTasks from './components/UserTasks';
import FileExample from './components/File';
import { useSelector } from 'react-redux';
import Respond from './components/Respond';
import Edit from './components/Edit';
// import FileUploadTest from './components/FileUploadTest';
import Layout from './components/Layout';
import UserTasksComplete from './components/UserTasksComplete';


// import IntroduceLesson from './components/forIntroduceLesson';

function App() {
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    console.log('Token after rehydration:', token); // Debug log
  }, [token]);


  return (
    <div >
      <Layout>
      
      <Routes>
        {/* need do a homepage??--if there is only one course automally it pass to this course and if there is more automally he go to the many courses--coursePage */}
        <Route path='/' element={<Home/>} />
        <Route path='/LessonVideo' element={<LessonVideo />} />
        <Route path='/CourseIntroduce' element={<CourseIntroduce />} />
        <Route path='/LessonsList' element={<LessonList />} />
        <Route path='/Lesson' element={<Lesson />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Task' element={<Task />} />
        <Route path='/IntroduceCourse' element={<CourseIntroduce />} />
        {/* <Route path='/CoursesPage' element={<CoursesPage />} /> */}
        <Route path='/ManagerAddLesson' element={<ManagerAddLesson />} />
        <Route path='/ManagerAddTask' element={<ManagerAddTask />} />
        <Route path='/ManagerAddQuestions' element={<ManagerAddQuestions />} />
        <Route path='/ManagerAddCourse' element={<ManagerAddCourse />} />
        <Route path='/ManagerUsersPage' element={<ManagerUsersPage />} />
        <Route path='/ManagerDeleteCourse' element={<ManagerDeleteCourse />} />
        <Route path='/LogOut' element={<LogOut />} />
        <Route path='/respondUser' element={<RespondUser />} />
        <Route path='/ManagerSetResponds' element={<ManagerSetResponds />} />
        <Route path='/UserTask' element={<UserTask />} />
        <Route path='/UserTasks' element={<UserTasks />} />
        <Route path='/Respond' element={<Respond />} />
        <Route path='/UserTasksComplete' element={<UserTasksComplete/>}/>
      </Routes>
      </Layout>
    </div>
  );
}

export default App;
