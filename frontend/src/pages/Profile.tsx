import axios from "axios";
import toast from "react-hot-toast";
import { GiSadCrab } from "react-icons/gi";
import { useAuthStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

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

    // file input reference
    const fileipref = useRef<HTMLInputElement>(null);

    // function for when the profile image is clicked
    const changeProfileImage = async () => {
        if (fileipref.current) {
            fileipref.current.click();
        }
    }

    // function for when the file is uploaded
    const fileupload = async (e: any) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('pfp', file);

        const response = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });

        if (response.status === 200) {
            // useAuthStore.setState({ user: { ...user, pfp: response.data.url } })
            toast.success("Profile Image Updated")
        }
        else {
            toast.error("Something went wrong")
        }
    }

    return (
        <>
            <div className='flex justify-center'>
                <div className='max-w-[1920px] w-full flex flex-col items-center h-screen'>
                    <header className='w-full flex justify-between items-center p-3 shadow-sm shadow-gray-300'>
                        <a href="" className='flex items-center gap-2'>
                            <GiSadCrab className='text-black bg-pmain flex justify-center items-center rounded-lg w-12 h-12' />
                            <span className='font-medium font-sans text-xl'>FloatFind</span>
                        </a>

                        <div className='flex gap-2 justify-center items-center'>
                            <button onClick={() => navigate('/add')} className='bg-bground hover:bg-gray-200 text-pmain text-md border border-pmain font-medium py-2 px-2 rounded'>Add Question</button>
                            <button onClick={logoutFunction} className='bg-pmain hover:bg-pmainhover text-white text-md font-medium py-2 px-2 rounded'>Logout</button>
                        </div>

                    </header>

                    {/* display the user info */}
                    <div className="w-full flex justify-center h-1/4">
                        <div className='flex mt-3 border border-black rounded-sm w-3/4'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-2 text-xl'>
                                    {/* profile image */}
                                    {
                                        user?.pfp ? (
                                            <img src={user?.pfp} alt="" className='w-24 h-24 rounded-full' />
                                        ) : (
                                            <div className='w-24 h-24 rounded-full bg-gray-300 flex justify-center items-center' onClick={changeProfileImage}>
                                                <input type="file" ref={fileipref} style={{ display: "none" }} onChange={fileupload} />
                                                <GiSadCrab />
                                            </div>
                                        )
                                    }

                                    <span className='font-medium text-xl'>{user?.name}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Profile;
