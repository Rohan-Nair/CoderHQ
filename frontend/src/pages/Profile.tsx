import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { PiSignOut } from "react-icons/pi";
import logo from "../assets/logo.png";
import { HomeIcon } from "@radix-ui/react-icons";

const Profile = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [ping, setPing] = useState(false);

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
                    useAuthStore.setState({
                        user: {
                            name: response.data.info.name,
                            email: response.data.info.email,
                            pfp: response.data.info.pfpUrl
                        }
                    })
                }
            }
        )()
    }, [ping])

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
    const changeProfileImage = () => {
        if (fileipref.current) {
            fileipref.current.click();
        }
    }

    // function for when the file is uploaded
    const fileupload = async (e: any) => {
        console.log("fileupload fn")
        const file = e.target.files[0];
        const formData = new FormData();
        formData.set('udetails', JSON.stringify(user));
        formData.set('pfp', file);

        const response = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
        if (response.status === 200) {
            useAuthStore.setState({ user: response.data.updatedProfile })
            setPing(!ping);
            toast.success("Profile Image Updated")
        }
        else {
            toast.error("Something went wrong")
        }
    }


    return (
        <>
            <div className="flex justify-center h-screen bg-mainbl">
                <div className='max-w-[1920px] w-full '>
                    <header className='bg-bground w-full max-w-[1920px] h-fit fixed backdrop-blur-3xl flex justify-between items-center p-3 shadow-sm shadow-amain'>
                        <Link to={"/"} className='flex items-center gap-2 outline-none'>
                            {/* <GiSadCrab className='text-black bg-amain flex justify-center items-center rounded-lg w-12 h-12' /> */}
                            <img src={logo} className="w-12 h-12" />
                            <span className='font-medium font-sans text-3xl text-white'>CoderHQ</span>
                        </Link>

                        <div className='flex gap-2 justify-center items-end'>
                            <Link to={"/"}><HomeIcon color="white" className="w-5 h-5" /></Link>
                            <button onClick={() => navigate('/add')} className='bg-amain hover:bg-amainhover text-mainbl text-md border-none font-medium py-2 px-2 rounded'>Add Question</button>
                        </div>

                    </header>


                    <div className="bg-mainbl px-3 mt-[4.5rem] w-full grid sm:grid-cols-12 gap-4">
                        <div className="bg-mainbl  pt-3 sm:col-span-3 flex flex-col">
                            <div>
                                <p className="text-amain font-medium text-center text-2xl">{user?.name}</p>
                            </div>
                            <div className="bg-crk flex items-end justify-evenly p-4 rounded-md">
                                <div className="flex flex-col gap-3">
                                    <div>
                                        {
                                            user?.pfp ? (
                                                <div className="flex flex-col">
                                                    <div className="flex flex-col items-center" onClick={changeProfileImage}>
                                                        <input type="file" ref={fileipref} style={{ display: "none" }} onChange={fileupload} />
                                                        <img src={user.pfp} alt="" className=" aspect-square w-[120px] object-cover rounded-full" />
                                                        <p className="hidden sm:block hover:underline cursor-pointer text-center text-amain underline">Change Profile Image</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col">
                                                    <input type="file" ref={fileipref} style={{ display: "none" }} onChange={fileupload} />
                                                    <p onClick={changeProfileImage} className="hover:underline cursor-pointer text-center text-amain underline">Add Profile Image</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col items-center my-3">
                                        <div className="flex flex-col items-center w-16 h-16 rounded-md bg-mainbl text-amain ">
                                            <p className="text-3xl font-bold">130</p>
                                            <p>solved</p>
                                        </div>

                                    </div>
                                    <div className="hover:outline-none outline-none border-none flex justify-center items-center mb-3">
                                        <button onClick={logoutFunction} className='bg-amain hover:bg-amainhover text-black text-md font-medium py-2 px-2 rounded flex justify-center items-center gap-2 '> <span className="hidden md:inline">Logout</span><PiSignOut className="font-bold text-xl" /></button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="min-h-30 sm:mt-[2.73rem] bg-crk rounded-md sm:pt-3  sm:col-span-9">
                            <p className="text-center text-2xl font-medium text-amain">Submissions</p>
                            <div className="bg-stone-500 flex flex-col p-4 my-2 mx-2 rounded-md">
                                <p>hello world</p>
                            </div>


                        </div>
                    </div >

                </div >
            </div >
        </>
    )

}

export default Profile;
