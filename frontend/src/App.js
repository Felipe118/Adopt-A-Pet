import {BrowserRouter as Router,element,Route,Routes} from 'react-router-dom'

//componets 
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'
//pages
import Login from './components/page/Auth/Login'
import Register from './components/page/Auth/Register'
import Home from './components/page/Home'

//context
import { UserProvider  } from '../context/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar/>
        <Container>
        <Routes>
          <Route path="/login" element={ <Login/>} />
          <Route path="/register" element={  <Register/>} />
          <Route path="/" element={ <Home/>}/>
        </Routes>
        </Container>
      <Footer/>
      </UserProvider>
    </Router>
   
  );
}

export default App;
