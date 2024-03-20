import { Route, Routes } from 'react-router-dom';
import './App.css'
import IndexP from './pages/IndexP';
import Login from './pages/Login';
import Signup from './pages/Signup';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api';

function App() {

  return (
    <Routes>
      <Route index element={<IndexP />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default App
