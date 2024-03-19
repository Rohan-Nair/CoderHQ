import './App.css'
import { MdOutlineHouseboat } from "react-icons/md";

function App() {

  return (
    <div>
      <header className='flex justify-between items-center p-3 shadow-sm shadow-gray-300'>
        {/* logo */}
        <a href="" className='flex items-center gap-2'>
          <MdOutlineHouseboat className='text-white bg-orange-500 flex justify-center items-center rounded-lg w-12 h-12' />
          <span className='font-bold font-sans text-xl'>FloatFind</span>
        </a>
        <div>
          Login
        </div>
      </header>
    </div>
  )
}

export default App
