import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter >
        <Routes>
            <Route path="/login" index={true} element = {<Login/>}></Route>
            <Route path="/home" element = {<Home/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App

