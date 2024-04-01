import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import toast from "react-hot-toast";
import { Editor } from "@monaco-editor/react";

interface SubmissionType {
    code: string,
    language: string,
    problemName: string,
    status: string
}

const Submission = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentSubmission, setCurrentSubmission] = useState({} as SubmissionType);
    const [pfp, setPfp] = useState<string>("");
    useEffect(() => {
        (
            async () => {
                const user = await axios.get('/user', { withCredentials: true });
                if (user.status === 201) {
                    toast.error("Login to view your submission");
                    navigate('/login');
                }
                setPfp(user.data.info.pfpUrl);
                const response = await axios.post(`/submission/${id}`, { id }, { withCredentials: true });
                if (response.status === 200) {
                    const { code, language, problemName, status } = response.data.submission;
                    setCurrentSubmission({
                        code,
                        language,
                        problemName,
                        status,
                    })
                }
                else {
                    toast.error("Something went wrong");
                }
            }
        )()
    }, [])
    return (
        <>
            <div className="flex justify-center h-screen bg-mainbl">
                <div className='max-w-[1920px] w-full'>
                    <header className='bg-bground max-w-[1920px] w-full h-fit fixed backdrop-blur-3xl flex justify-between items-center p-3 shadow-sm shadow-amain'>
                        <Link to={"/"} className='flex items-center gap-2 outline-none'>
                            <img src={logo} className="w-12 h-12" />
                            <span className='font-medium font-sans text-3xl text-white'>CoderHQ</span>
                        </Link>

                        <div className='flex gap-4 justify-center items-end'>
                            <Link to={"/profile"}><img src={pfp} className="w-10 h-10 object-cover rounded-full" /></Link>
                            <button onClick={() => navigate('/add')} className='bg-amain hover:bg-amainhover text-mainbl text-md border-none font-medium py-2 px-2 rounded'>Add Question</button>
                        </div>
                    </header>

                    {/* this is the layout for the larger screens smaller screen design yet to be made */}
                    <section className="hidden sm:block mt-[5.5rem] h-full py-2 px-2 md:w-full md:h-[40rem] rounded-md border-none bg-mainbl mx-auto overflow-y-auto">
                        {
                            currentSubmission ? (
                                <div className="bg-crk p-4 rounded-md flex flex-col gap-4">
                                    <div className="flex justify-between">

                                        <div>
                                            <p className="text-stone-500 text-lg font-medium">Problem Name: {currentSubmission.problemName}</p>
                                        </div>
                                        <div>
                                            <p className="text-stone-500 text-lg font-medium">Status: {currentSubmission.status}</p>
                                        </div>
                                        <div>
                                            <p className="text-stone-500 text-lg font-medium">Language: {currentSubmission.language}</p>
                                        </div>
                                    </div>

                                    <Editor
                                        language={currentSubmission?.language}
                                        value={currentSubmission.code}
                                        theme="vs-dark"
                                        options={{
                                            readOnly: true,
                                            minimap: { enabled: false },
                                        }}
                                        height="30rem"
                                    />

                                </div>
                            ) : (
                                <div className="bg-crk p-4 rounded-md flex flex-col gap-4">
                                    <div>
                                        <p className="text-amain text-2xl font-medium">Loading...</p>
                                    </div>
                                </div>
                            )
                        }
                    </section>

                </div >
            </div >
        </>
    )
}

export default Submission