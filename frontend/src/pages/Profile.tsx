import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineHouseboat } from "react-icons/md";
import { useAuthStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    // checking if user has logged in or not
    useEffect(() => {
        (
            async () => {
                const response = await axios.get('/user', { withCredentials: true });
                if (response.status === 201) {
                    useAuthStore.setState({ user: null })
                    if (!user) {
                        toast.error("You need to login first");
                        navigate('/login')
                    }
                }
                if (response.status === 200) {
                    useAuthStore.setState({ user: response.data.info })
                }
            }
        )()
    }, [])

    // function for when the logout button is clicked
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

                        <div className='flex gap-2 justify-center items-center'>
                            <button onClick={logoutFunction} className='bg-pmain hover:bg-pmainhover text-white font-medium py-2 px-4 rounded'>Logout</button>
                        </div>

                    </header>
                </div>
            </div>
        </>
    );

}

export default Profile;
