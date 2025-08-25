import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from '../src/Routes/Signup.jsx'
import Signin from '../src/Routes/Signin.jsx'
import Dashboard from '../src/Routes/Dashboard.jsx'
import SendMoney from '../src/Routes/SendMoney.jsx'
import Appbar from '../src/components/Appbar.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
         <Routes>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/signin' element={<Signin/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/send' element={<SendMoney/>}></Route>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
