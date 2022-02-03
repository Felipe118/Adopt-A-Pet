import {BrowserRouter as Router,element,Route,Routes} from 'react-router-dom'

//componets 
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
//pages
import Login from './components/page/Auth/Login'
import Register from './components/page/Auth/Register'
import Home from './components/page/Home'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={ <Login/>} />
        <Route path="/register" element={  <Register/>} />
        <Route path="/" element={ <Home/>}/>
      </Routes>
      <Footer/>
    </Router>
   
  );
}

export default App;