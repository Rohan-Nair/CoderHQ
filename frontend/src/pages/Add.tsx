import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiSadCrab } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

const Add = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

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

    // function for adding a new question
    const addQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !question || !input || !output) {
            toast.error("Please fill all the fields")
            return;
        }
        const qn = {
            title,
            question,
            input,
            output,
            username: user!.name
        }
        const response = await axios.post('/add', qn, { withCredentials: true });
        if (response.status === 400) {
            toast.error("Something went wrong")
            return;
        }
        else if (response.status === 200) {
            toast.success("Question added successfully")
            setTitle('');
            setQuestion('');
            setInput('');
            setOutput('');
        } else if (response.status === 201) {
            toast.error("Question already exists")
        }
    }

    return (
        <>
            <div className='flex justify-center'>
                <div className='max-w-[1920px] w-full h-screen flex flex-col items-center bg-bground'>
                    <header className='w-full flex justify-between items-center p-3 shadow-sm shadow-gray-300'>
                        <Link to={"/"} className='flex items-center gap-2'>
                            <GiSadCrab className='text-black bg-pmain flex justify-center items-center rounded-lg w-12 h-12' />
                            <span className='font-medium font-sans text-xl'>FloatFind</span>
                        </Link>

                        <div className='flex gap-2 justify-center items-center'>
                            <Link to={"/profile"}><p className="text-amain">{user?.name}</p></Link>
                            <button onClick={logoutFunction} className='bg-amain hover:bg-amainhover text-black font-medium py-2 px-4 rounded'>Logout</button>
                        </div>

                    </header>

                    <div className='w-1/2 flex flex-col justify-center items-center gap-4 mt-10 py-10 rounded-md  shadow-lg bg-crk'>
                        <p className="font-medium text-xl underline text-amain">Add a new question</p>
                        <form className='flex flex-col gap-4 w-full max-w-[500px]' onSubmit={addQuestion}>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' className='w-full p-2 rounded bg-bground text-amain' />
                            <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='Question' className='w-full p-2 rounded bg-bground text-amain' />
                            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='Input' className='w-full p-2 rounded bg-bground text-amain' />
                            <textarea value={output} onChange={(e) => setOutput(e.target.value)} placeholder='Expected Output' className='w-full p-2 rounded bg-bground text-amain' />
                            <button className='bg-amain hover:bg-amainhover text-black font-medium py-2 px-4 rounded'>Add</button>
                        </form>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Add