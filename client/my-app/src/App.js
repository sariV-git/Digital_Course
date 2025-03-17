import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';

import 'primereact/resources/themes/saga-blue/theme.css'; // נושא PrimeReact
import 'primereact/resources/primereact.min.css'; // סגנון ה-PrimeReact
// import 'primeicons/primeicons.css'; // אייקונים של PrimeIcons


function App() {
  return (
    <div className="App">
    <Login/>
    {/* <Home/> */}
    </div>
  );
}

export default App;
