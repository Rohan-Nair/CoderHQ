import axios from "axios";
import toast from "react-hot-toast";
import { GiSadCrab } from "react-icons/gi";
import { useAuthStore, useUserPfpStore } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuGroup } from "../../@/components/ui/dropdown-menu";
import { PiSignOut } from "react-icons/pi";

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
                    const info = response.data.info;
                    useAuthStore.setState({
                        user: {
                            name: info.name,
                            email: info.email,
                            pfp: info.pfpUrl
                        }
                    })
                }
                console.log(user);

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
    const changeProfileImage = () => {
        console.log("changeProfileImage fn")
        console.log(fileipref.current)
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
        formData.set('udetails', JSON.stringify(user));
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
                            <button onClick={() => navigate('/add')} className='bg-amain hover:bg-amainhover text-mainbl text-md border-none font-medium py-2 px-2 rounded'>Add Question</button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    {
                                        user?.pfp ? (
                                            <img src={user.pfp} alt="" className=" aspect-square w-[40px] object-cover rounded-full" />
                                        ) : (
                                            <div className="bg-amainhover p-1 rounded-full">
                                                <GiSadCrab className="w-8 h-8 text-black" />
                                            </div>
                                        )
                                    }
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[20rem] bg-mainbl mt-4 border-none mr-2 text-white p-3">
                                    <DropdownMenuLabel className="text-xl text-center mt-1 mb-2">{user?.name}</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                        {
                                            user?.pfp ? (
                                                <DropdownMenuItem className="flex flex-col">
                                                    <div onClick={changeProfileImage}>
                                                        <img src={user.pfp} alt="" className=" aspect-square w-[120px] object-cover rounded-full" onClick={changeProfileImage} />
                                                        <p onClick={changeProfileImage} className="hover:underline cursor-pointer">Change Profile Image</p>
                                                        {/* <input type="file" ref={fileipref} style={{ display: "none" }} onChange={fileupload} /> */}
                                                    </div>
                                                    {/* <p>hello world</p> */}
                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem className="flex flex-col">
                                                    <input type="file" ref={fileipref} style={{ display: "none" }} onChange={fileupload} />
                                                    <p onClick={changeProfileImage} className="hover:underline cursor-pointer">Add Profile Image</p>
                                                </DropdownMenuItem>
                                            )
                                        }
                                    </DropdownMenuGroup>
                                    <DropdownMenuGroup className="flex flex-col items-center my-3">
                                        <div className="flex flex-col items-center w-16 h-16 rounded-md bg-crk text-amain ">
                                            <p className="text-3xl font-bold">130</p>
                                            <p>solved</p>
                                        </div>

                                    </DropdownMenuGroup>
                                    <DropdownMenuItem className="hover:outline-none outline-none border-none flex justify-center items-center mb-3">
                                        <button onClick={logoutFunction} className='bg-amain hover:bg-amainhover text-black text-md font-medium py-2 px-2 rounded flex justify-center items-center gap-2'>Logout<PiSignOut className="font-bold text-xl" /></button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>

                            </DropdownMenu>


                        </div>

                    </header>

                    {/* display the user info */}


                    <div className='items-center gap-2 text-xl p-2 relative w-full hidden'>
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

                    </div>

                </div >
            </div >
        </>
    );

}

export default Profile;

{/* <p onClick={() => { }} className="text-sm hover:underline hover:text-pmainhover cursor-pointer ">Edit Profile</p> */ }