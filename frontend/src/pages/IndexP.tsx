import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore, useProblemsStore } from "../store/store";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
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
            <div className='flex justify-center h-screen bg-bground'>
                <div className='max-w-[1920px] w-full max-h-screen overflow-y-auto'>
                    <header className='w-full max-w-[1920px] h-fit fixed backdrop-blur-3xl flex justify-between items-center p-3 shadow-sm shadow-amain'>
                        <Link to={"/"} className='flex items-center gap-2 outline-none'>
                            <img src={logo} className="w-12 h-12" />
                            <span className='font-medium font-sans text-3xl text-white'>CoderHQ</span>
                        </Link>
                        {
                            user ? (<div className='flex gap-2 justify-center items-center text-amain'>
                                <Link to={"/profile"}>{user.name}</Link>
                                <button onClick={logoutFunction} className='bg-amain hover:bg-amainhover text-mainbl font-medium py-2 px-4 rounded'>Logout</button>
                            </div>) : (
                                <div className='flex gap-2'>
                                    <Link to={"/login"} className='bg-amain hover:bg-amainhover text-mainbl font-medium py-2 px-4 rounded'>Login</Link>
                                    <Link to={"/signup"} className='hidden sm:block bg-amain hover:bg-amainhover text-crk font-medium py-2 px-4 rounded'>Signup</Link>
                                </div>
                            )
                        }
                    </header>

                    <section className="mt-[5.5rem] pt-2 px-2 md:w-[50rem] h-fit md:h-[40rem] rounded-md border-2 border-none bg-crk md:mx-auto mx-2 overflow-y-auto">


                        {
                            problems.map((singleproblem: any) => {
                                return (
                                    <div key={singleproblem._id} className='flex flex-col gap-2 p-2 m-3 bg-mainbl rounded-md'>
                                        <div className='flex justify-between items-center gap-2'>
                                            <div className='flex flex-col md:flex-row items-start md:items-center justify-center gap-2'>
                                                <span className='text-amain font-bold'>{singleproblem.title}</span>
                                                <span className='text-md text-white'>by {singleproblem.name}</span>
                                            </div>
                                            <Link to={`/problem/${singleproblem._id}`} className='bg-smain hover:bg-amain text-black font-semibold py-2 px-4 rounded'>Solve</Link>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </section>








                </div>
            </div>
        </>
    )
}

export default IndexP