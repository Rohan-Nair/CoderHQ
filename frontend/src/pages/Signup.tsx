import { MdOutlineHouseboat } from "react-icons/md";
import { Spotlight } from "../components/ui/Spotlight";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners"
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/signup', {
                name,
                email,
                password
            })
            if (response.status === 200) {
                toast.success("You can now login");
                navigate('/login');
            } else if (response.status === 201) {
                toast("You are already registered");
                navigate('/login');
            }

        } catch (e: any) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <div className='flex justify-center items-center h-screen bg-bground'>
                <Spotlight fill="#239679" />
                <div className='flex flex-col items-center justify-center gap-4 p-6 bg-gray-200 min-w-[20rem] min-h-[400px] shadow-lg rounded-lg'>
                    <a href="" className='flex items-center gap-2'>
                        <MdOutlineHouseboat className='text-white bg-pmain flex justify-center items-center rounded-lg w-12 h-12' />
                        <span className='font-medium font-sans text-3xl'>FloatFind</span>
                    </a>
                    <h1 className='text-2xl font-medium'>Signup</h1>
                    <form className='flex flex-col gap-4 w-full' onSubmit={registerUser}>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder='Name'
                            className='p-2 rounded-md bg-bground'
                            required
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder='Email'
                            className='p-2 rounded-md bg-bground'
                            required
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Password'
                            className='p-2 rounded-md bg-bground'
                            required
                        />
                        <button type="submit" className='bg-pmainhover hover:bg-pmainhover text-white font-medium py-2 rounded-md'>{loading ? <ClipLoader color="#fff" size={24} /> : "Register Now"}</button>
                    </form>
                    <p className="text-center">Already have an account? <Link className="text-pmainhover font-medium hover:underline" to={"/login"}>Login</Link></p>
                </div>
            </div>
        </div>
    )

}
export default Signup