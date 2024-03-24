import axios from "axios";
import toast from "react-hot-toast";
import { GiSadCrab } from "react-icons/gi";
import { useAuthStore, useUserPfpStore } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuGroup, } from "../../@/components/ui/dropdown-menu";


const Profile = () => {
    const { user } = useAuthStore();
    const { pfp } = useUserPfpStore();
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
        console.log("changeProfileImage fn")
        if (fileipref.current) {
            fileipref.current.click();
            console.log("cp")
        }
    }

    // function for when the file is uploaded
    const fileupload = async (e: any) => {
        console.log("fileupload fn")
        const file = e.target.files[0];
        const formData = new FormData();
        formData.set('pfp', file);

        const response = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
        const { data } = response;
        console.log(data);
        if (response.status === 200) {
            useUserPfpStore.setState({ pfp: response.data.pfp })
            toast.success("Profile Image Updated")
        }
        else {
            toast.error("Something went wrong")
        }
    }

    return (
        <>
            <div className='flex justify-center'>
                <div className='max-w-[1920px] w-full flex flex-col items-center h-screen bg-bground'>
                    <header className='w-full flex justify-between items-center p-3 shadow-sm shadow-gray-300'>
                        <Link to="/" className='flex items-center gap-2'>
                            <GiSadCrab className='text-black bg-pmain flex justify-center items-center rounded-lg w-12 h-12' />
                            <span className='font-medium font-sans text-xl hidden md:block'>FloatFind</span>
                        </Link>

                        <div className='flex gap-2 justify-center items-center'>
                            <button onClick={changeProfileImage}>temp</button>
                            <button onClick={() => navigate('/add')} className='bg-bground hover:bg-gray-200 text-pmain text-md border border-pmain font-medium py-2 px-2 rounded'>Add Question</button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    {
                                        pfp ? (
                                            < img src={`http://localhost:4000/uploads/${pfp}`} alt="" className=" aspect-square w-[40px] object-cover rounded-full" />
                                        ) : <GiSadCrab className="w-8 h-8 text-black" />

                                    }
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[20rem] mr-3 mt-3 md:w-[25rem] text-white bg-black p-10 pt-5">
                                    <DropdownMenuLabel
                                        className="w-full"
                                    >
                                        <p className='font-medium text-white text-center w-full text-2xl underline'>{user?.name}</p>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup className="flex w-full justify-center items-center">
                                        <DropdownMenuItem>
                                            {
                                                pfp ? (
                                                    <>
                                                        <input type="file" ref={fileipref} style={{ display: "none" }} onChange={fileupload} />
                                                        <img src={`http://localhost:4000/uploads/${pfp}`} className=" aspect-square w-[120px] object-cover rounded-full" onClick={changeProfileImage} />
                                                    </>
                                                ) : (
                                                    <div className='w-24 md:w-36 h-24 md:h-36 rounded-full bg-pmainhover flex justify-center items-center relative cursor-pointer' onClick={changeProfileImage}>
                                                        <GiSadCrab className="w-12 h-12 text-black" />
                                                    </div>
                                                )
                                            }
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <p><span className="font-bold text-pmain text-4xl">120</span> solved</p>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup className="flex justify-center">
                                        <DropdownMenuItem onClick={changeProfileImage}>
                                            <input type="file" ref={fileipref} style={{ display: "none" }} onChange={fileupload} />
                                            <button onClick={changeProfileImage} className='bg-pmain hover:bg-pmainhover text-white text-md font-medium py-2 px-2 rounded'>Change Profile Image</button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <button onClick={logoutFunction} className='bg-pmain hover:bg-pmainhover text-white text-md font-medium py-2 px-2 rounded'>Logout</button>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                </DropdownMenuContent>
                            </DropdownMenu>
                            {/* <button onClick={logoutFunction} className='bg-pmain hover:bg-pmainhover text-white text-md font-medium py-2 px-2 rounded'>Logout</button> */}
                        </div>

                    </header>

                    {/* display the user info */}

                    <div className="w-full flex justify-center h-1/4">
                        <div className='flex mt-3 border border-black bg-black text-white rounded-sm w-3/4 md:w-1/4'>
                            {/* <div className='flex flex-col justify-center items-center bg-green-200 w-full gap-4'> */}

                            <div className='flex items-center gap-2 text-xl p-2 relative w-full'>
                                {
                                    pfp ? (

                                        <>
                                            <input type="file" ref={fileipref} style={{ display: "none" }} onChange={fileupload} />
                                            <img src={`http://localhost:4000/uploads/${pfp}`} alt="" className=" aspect-square w-[120px] object-cover rounded-full" onClick={changeProfileImage} />
                                        </>

                                    ) : (

                                        <div className='w-24 md:w-36 h-24 md:h-36 rounded-full bg-pmainhover flex justify-center items-center relative cursor-pointer' onClick={changeProfileImage}>
                                            <input type="file" ref={fileipref} style={{ display: "none" }} onChange={fileupload} />
                                            <GiSadCrab className="w-12 h-12 text-black" />
                                        </div>

                                    )
                                }
                                {/* <div className="">
                                    <span className='font-medium text-pmainhover text-xl underline'>{user?.name}</span>
                                    <p onClick={() => { }} className="text-sm hover:underline hover:text-pmainhover cursor-pointer ">Edit Profile</p>
                                    <p><span className="font-bold text-pmain">120</span> solved</p>

                                </div> */}
                            </div>
                            {/* </div> */}

                        </div>
                    </div>
                </div >
            </div >
        </>
    );

}

export default Profile;

{/* <p onClick={() => { }} className="text-sm hover:underline hover:text-pmainhover cursor-pointer ">Edit Profile</p> */ }