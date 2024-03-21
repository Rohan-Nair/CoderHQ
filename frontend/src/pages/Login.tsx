import { MdOutlineHouseboat } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners"
import { WavyBackground } from "../components/ui/Wavy";
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post('/login', {
                email,
                password
            }, { withCredentials: true })
            if (response.status === 200) {
                toast.success("Logged in successfully");
                navigate('/');
            } else if (response.status === 404) {
                toast.error("You need to signup first");
                navigate('/signup');
            } else if (response.status === 401) {
                toast.error("Invalid credentials");
            }
        } catch (e: any) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false)
        }

    }

    return (
        <div>
            <div className='flex justify-center items-center h-screen bg-bground'>
                <WavyBackground backgroundFill="#f8fefc">

                    <div className='flex flex-col items-center justify-center gap-4 p-6 bg-gray-200 min-w-[20rem] min-h-[400px] shadow-lg rounded-lg'>
                        <a href="" className='flex items-center gap-2'>
                            <MdOutlineHouseboat className='text-white bg-pmain flex justify-center items-center rounded-lg w-12 h-12' />
                            <span className='font-medium font-sans text-3xl'>FloatFind</span>
                        </a>
                        <h1 className='text-2xl font-medium'>Login</h1>
                        <form className='flex flex-col gap-4 w-full' onSubmit={login}>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' className='p-2 rounded-md bg-bground' />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='p-2 rounded-md bg-bground' />
                            <button type="submit" className='flex justify-center items-center bg-pmainhover hover:bg-pmainhover text-white font-medium py-2 rounded-md'>{loading ? <ClipLoader color="#fff" size={24} /> : "Login"}</button>
                        </form>
                        <p className="text-center">Don't have an account? <Link className="text-pmainhover font-medium hover:underline" to={"/signup"}>Signup</Link></p>
                    </div>
                </WavyBackground>
            </div>
        </div>
    )
}

export default Login