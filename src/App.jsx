import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Homepage from './components/HomePage/Homepage'
import Profile from './components/Profile'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/profile' element={<Profile/>}/>


      </Routes>
    </Router>
    
    </>
  )
}

export default App
