import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners"
import logo from "../assets/logo.png";
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
            } else if (response.status === 202) {
                toast("This username has been taken");
            }

        } catch (e: any) {
            console.log(e);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <div className='flex justify-center items-center h-screen bg-bground'>
                {/* <WavyBackground backgroundFill="#101112"> */}
                <div className='flex flex-col items-center justify-center gap-4 p-6 bg-crk min-w-[20rem] min-h-[400px] shadow-lg rounded-lg'>
                    <Link to={"/"} className='flex items-center gap-2 outline-none'>
                        {/* <GiSadCrab className='text-black bg-amain flex justify-center items-center rounded-lg w-12 h-12' /> */}
                        <img src={logo} className="w-16 h-16" />
                        <span className='font-medium font-sans text-3xl text-white'>CoderHQ</span>
                    </Link>
                    <h1 className='text-2xl font-medium text-amainhover'>Signup</h1>
                    <form className='flex flex-col gap-4 w-full' onSubmit={registerUser}>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder='Name'
                            className='p-2 rounded-md bg-bground text-amain'
                            required
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder='Email'
                            className='p-2 rounded-md bg-bground text-amain'
                            required
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Password'
                            className='p-2 rounded-md bg-bground text-amain'
                            required
                        />
                        <button type="submit" className='bg-amainhover hover:bg-amainhover text-white font-medium py-2 rounded-md'>{loading ? <ClipLoader color="#000" size={24} /> : "Register Now"}</button>
                    </form>
                    <p className="text-center text-white">Already have an account? <Link className="text-amainhover font-medium hover:underline" to={"/login"}>Login</Link></p>
                </div>
                {/* </WavyBackground> */}
            </div>
        </div>
    )

}
export default Signup