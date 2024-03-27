import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { GiSadCrab } from "react-icons/gi";
import { PiSignOut } from "react-icons/pi";

const Pfile = () => {
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


    // const inputRef = useRef<HTMLInputElement>(null);
    // const handleImageClick = (e: any) => {
    //     e.stopPropagation();
    //     if (inputRef.current) {
    //         inputRef.current.click();
    //     }
    // }

    // // function for when the file is uploaded
    // const handleImageChange = async (e: any) => {
    //     console.log("fileupload fn")
    //     const file = e.target.files[0];
    //     const formData = new FormData();
    //     formData.set('udetails', JSON.stringify(user));
    //     formData.set('pfp', file);

    //     const response = await axios.post('/upload', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         },
    //         withCredentials: true
    //     });
    //     const { data } = response;
    //     console.log(data);
    //     if (response.status === 200) {
    //         useUserPfpStore.setState({ pfp: response.data.pfp })
    //         toast.success("Profile Image Updated")
    //     }
    //     else {
    //         toast.error("Something went wrong")
    //     }
    // }

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
            <div className="flex justify-center h-screen bg-bground">
                <div className='max-w-[1920px] w-full  overflow-hidden'>
                    <header className='w-full h-fit fixed backdrop-blur-3xl flex justify-between items-center p-3 shadow-sm shadow-amain'>
                        <Link to="/" className='flex items-center gap-2'>
                            <GiSadCrab className='text-black bg-pmain flex justify-center items-center rounded-lg w-12 h-12' />
                            <span className='font-medium font-sans text-xl hidden md:block'>FloatFind</span>
                        </Link>

                        <div className='flex gap-2 justify-center items-center'>
                            <button onClick={() => navigate('/add')} className='bg-amain hover:bg-amainhover text-mainbl text-md border-none font-medium py-2 px-2 rounded'>Add Question</button>
                            {/* <DropdownMenu>
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
                                                <DropdownMenuItem onClick={handleImageClick} className="flex flex-col">
                                                    <img src={user.pfp} alt="" className=" aspect-square w-[120px] object-cover rounded-full" />
                                                    <p className="hover:underline cursor-pointer">Change Profile Image</p>
                                                    <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleImageChange} />

                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem onClick={handleImageClick} className="flex flex-col">
                                                    <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleImageChange} />
                                                    <p className="hover:underline cursor-pointer">Add Profile Image</p>
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

                            </DropdownMenu> */}


                        </div>

                    </header>
                    {/* 
                    <div className="mt-[5.5rem] pt-2 px-2 md:w-[50rem] h-screen md:h-[40rem] rounded-md bg-bground mx-3 ">
                        <div className="sidebar rounded-md  bg-pink-900 overflow-hidden">
                            hello
                        </div>
                        <div className="content rounded-md  bg-red-900 overflow-y-scroll">
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p><p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p><p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p><p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            hi
                        </div>
                    </div> */}

                    <div className="bg-mainbl px-3 mt-[4.5rem] w-full h-full grid sm:grid-cols-12 gap-4">
                        <div className="bg-manbl pt-3 sm:col-span-3  flex flex-col">
                            <div className="bg-crk  p-4 rounded-md">
                                <div>
                                    <div>
                                        <p className="text-amain font-medium text-center text-2xl">{user?.name}</p>
                                    </div>
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
                                <div className="flex flex-col items-center my-3">
                                    <div className="flex flex-col items-center w-16 h-16 rounded-md bg-mainbl text-amain ">
                                        <p className="text-3xl font-bold">130</p>
                                        <p>solved</p>
                                    </div>

                                </div>
                                <div className="hover:outline-none outline-none border-none flex justify-center items-center mb-3">
                                    <button onClick={logoutFunction} className='bg-amain hover:bg-amainhover text-black text-md font-medium py-2 px-2 rounded flex justify-center items-center gap-2'>Logout<PiSignOut className="font-bold text-xl" /></button>
                                </div>
                            </div>
                        </div>

                        <div className="min-h-30 bg-lime-500 overflow-y-auto sm:col-span-9">
                            <p>submissons</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p><p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p><p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p><p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>
                            <p className="text-4xl">hello</p>

                        </div>
                    </div >

                </div >
            </div >
        </>
    )

}

export default Pfile;
