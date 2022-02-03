import {BrowserRouter as Router,element,Route,Routes} from 'react-router-dom'

//pages
import Login from './components/page/Auth/Login'
import Register from './components/page/Auth/Register'
import Home from './components/page/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login/>} />
        <Route path="/register" element={  <Register/>} />
        <Route path="/" element={ <Home/>}/>
      </Routes>
    </Router>
   
  );
}

export default App;
