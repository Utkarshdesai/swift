import './App.css'
import Comment from './components/Comment'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import { Routes ,Route } from "react-router-dom";


function App() {
 

  return (
    <div className='w-full h-full '>
      <div>
      <Navbar></Navbar>
      </div>
    
    <Routes> 
      <Route path='/' element={<Profile/>}></Route>
      <Route path='/dashboard' element={<Comment></Comment>}></Route>
    </Routes>
     
      {/* <Comment></Comment> */}
       
  
    </div>
  )
}

export default App
