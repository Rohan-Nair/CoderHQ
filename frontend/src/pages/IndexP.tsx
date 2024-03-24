import axios from "axios";
import { useEffect } from "react";
import { GiSadCrab } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore, useProblemsStore } from "../store/store";
import toast from "react-hot-toast";
const IndexP = () => {
    const { user } = useAuthStore();
    const { problems } = useProblemsStore();
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
                const response2 = await axios.get('/problems', { withCredentials: true });
                if (response2.status === 201) {
                    toast.error("Something went wrong")
                    return;
                } else {
                    useProblemsStore.setState({ problems: response2.data.problems })
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
                        <Link to="/" className='flex items-center gap-2'>
                            <GiSadCrab className='text-black bg-pmain flex justify-center items-center rounded-lg w-12 h-12' />
                            <span className='font-medium font-sans text-xl'>FloatFind</span>
                        </Link>
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

                    {/* map the problems and make a card for each */}




                </div>
            </div>
        </>
    )
}

export default IndexP