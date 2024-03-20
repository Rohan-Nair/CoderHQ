import axios from "axios";
import { useEffect } from "react";
import { MdOutlineHouseboat } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
import toast from "react-hot-toast";
const IndexP = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();


    useEffect(() => {
        (
            async () => {
                const response = await axios.get('/user', { withCredentials: true });
                if (response.status === 201) {
                    useAuthStore.setState({ user: null })
                }
                if (response.status === 200) {
                    useAuthStore.setState({ user: response.data.info })
                }
            }
        )()
    }, [])

    const logoutFunction = async () => {
        const response = await axios.post('/logout', {}, { withCredentials: true });
        if (response.status !== 200) {
            toast.error("Something went wrong")
            return;
        }
        else {
            useAuthStore.setState({ user: null })
            toast.success("Logged out")
        }
        navigate('/login');
    }

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
                        {
                            user ? (<div className='flex gap-2 justify-center items-center'>
                                <Link to={"/profile"}>{user.name}</Link>
                                <button onClick={logoutFunction} className='bg-pmain hover:bg-pmainhover text-white font-medium py-2 px-4 rounded'>Logout</button>
                            </div>) : (
                                <div className='flex gap-2'>
                                    <Link to={"/login"} className='bg-pmain hover:bg-pmainhover text-white font-medium py-2 px-4 rounded'>Login</Link>
                                    <Link to={"/signup"} className='hidden sm:block bg-pmain hover:bg-pmainhover text-white font-medium py-2 px-4 rounded'>Signup</Link>
                                </div>
                            )
                        }
                    </header>
                </div>
            </div>
        </>
    )
}

export default IndexP