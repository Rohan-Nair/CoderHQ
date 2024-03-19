import { MdOutlineHouseboat } from "react-icons/md";
import { Link } from "react-router-dom";
const IndexP = () => {
    return (
        <>
            <div className='flex justify-center'>
                <div className='max-w-[1920px] w-full'>
                    <header className='w-full flex justify-between items-center p-3 shadow-sm shadow-gray-300'>
                        {/* logo */}
                        <a href="" className='flex items-center gap-2'>
                            <MdOutlineHouseboat className='text-white bg-pmain flex justify-center items-center rounded-lg w-12 h-12' />
                            <span className='font-medium font-sans text-xl'>FloatFind</span>
                        </a>
                        <div className='flex gap-2'>
                            <Link to={"/login"} className='bg-pmain hover:bg-pmainhover text-white font-medium py-2 px-4 rounded'>Login</Link>
                            <button className='hidden sm:block bg-pmain hover:bg-pmainhover text-white font-medium py-2 px-4 rounded'>Signup</button>
                        </div>
                    </header>
                </div>
            </div>
        </>
    )
}

export default IndexP