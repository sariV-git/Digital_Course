import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
// import LinearDemo from './components/forManagerRespond';
import Counter from './components/forCounter';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import LessonList from './components/forLessonList';

function App() {

  return (
    <div >
    {/* <Login/> */}
    {/* <Home/> */}
    {/* <LinearDemo/> */}
    
<Menubar className='bg-blue-600 p-3 text 3xl text-red'start={'DIGITAL COURSE'}/>

    </div>
  );
}

export default App;
