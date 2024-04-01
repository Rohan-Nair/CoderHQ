import { Route, Routes } from 'react-router-dom';
import './App.css'
import IndexP from './pages/IndexP';
import Login from './pages/Login';
import Signup from './pages/Signup';
import axios from 'axios';
import Add from './pages/Add';
import Pfile from './pages/Profile';
import Problem from './pages/Problem';
import Submission from './pages/Submission';

// axios.defaults.baseURL = 'http://localhost:4000/api';
axios.defaults.baseURL = "https://coderhq-api.vercel.app/api"

function App() {

  return (
    <Routes>
      <Route index element={<IndexP />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/profile' element={<Pfile />} />
      <Route path='/add' element={<Add />} />
      <Route path='/problem/:problemId' element={<Problem />} />
      <Route path='/submissions/:id' element={<Submission />} />
    </Routes>
  )
}

export default App
