import { HomeIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png"
import Splitter, { SplitDirection } from "@devbookhq/splitter";
import CodeEditor from "../components/CodeEditor";
import { useAuthStore } from "../store/store";

interface ProblemType {
    description: string,
    input: string,
    name: string,
    output: string,
    title: string
}

const Problem = () => {
    const { problemId } = useParams();
    const [problem, setProblem] = useState<ProblemType>({
        description: "",
        input: "",
        name: "",
        output: "",
        title: ""
    });
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const [ipValue, setIpValue] = useState<string>("");
    const [opValue, setOpValue] = useState<string>("");

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
    }, [])

    useEffect(() => {
        if (!problemId) {
            navigate('/');
        }
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`/problems/${problemId}`);
                if (response.status === 200) {
                    setProblem(response.data.problem);
                    setIpValue(response.data.problem.input);
                    setOpValue(response.data.problem.output);
                }
            } catch (e: any) {
                if (e.response.status === 400) {
                    toast.error("Could not fetch problem");
                }
                console.log(e);
            }
        }
        fetchProblem();
    }, [problemId])
    if (!problem) {
        return (
            <div>Loading...</div>
        )
    }


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
                            <Link to={"/"}><HomeIcon color="white" className="w-5 h-5" /></Link>
                            <button onClick={() => navigate('/add')} className='bg-amain hover:bg-amainhover text-mainbl text-md border-none font-medium py-2 px-2 rounded'>Add Question</button>
                        </div>
                    </header>

                    {/* this is the layout for the larger screens smaller screen design yet to be made */}
                    <section className="hidden sm:block mt-[5.5rem] h-full py-2 px-2 md:w-full md:h-[40rem] rounded-md border-none bg-mainbl mx-auto overflow-y-auto">
                        <Splitter direction={SplitDirection.Horizontal} >
                            <Splitter direction={SplitDirection.Vertical}>
                                <div className="text-white h-full overflow-y-auto">
                                    <div className="p-2 flex items-end justify-between">
                                        <p className="text-3xl text-amain font-semibold">{problem.title}</p>
                                        <button onClick={() => navigate('/')} className='bg-amain hover:bg-amainhover text-mainbl text-md border-none font-medium py-2 px-2 rounded'>All Problems</button>
                                    </div>
                                    <p className="p-2">Contributed by <span className="text-amain text-md">{problem.name}</span></p>
                                    <div className="text-lg font-sans text-white p-2">
                                        <p>{problem.description}</p>
                                        <br />
                                        <div className="font-mono">
                                            Sample input:
                                            <br />
                                            <p className="bg-crk rounded-md p-2">
                                                {problem.input}
                                            </p>
                                        </div>
                                        <br />
                                        <div className="font-mono">
                                            Sample output:
                                            <br />
                                            <p className="bg-crk rounded-md p-2">
                                                {problem.output}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Splitter direction={SplitDirection.Vertical}>
                                    <div className=" text-white h-full overflow-y-auto flex flex-col gap-2">
                                        <div className="px-2 pt-2">
                                            <p className="text-xl text-amain font-semibold">Input</p>
                                            <textarea className="font-mono text-lg bg-crk rounded-md w-full h-fit p-4 mt-4" onChange={(e) => setIpValue(e.target.value)} value={ipValue}></textarea>
                                        </div>
                                        <div className="px-2 pt-2">
                                            <p className="text-xl text-amain font-semibold">Output</p>
                                            <textarea className="font-mono text-lg bg-crk rounded-md w-full p-4 mt-4 focus:border-none focus:outline-none " readOnly value={opValue}></textarea>
                                        </div>
                                    </div>
                                </Splitter>
                            </Splitter>
                            <div className="bg-mainbl h-full">
                                <CodeEditor user={user} problemId={problemId!} ipValue={ipValue} setOpValue={setOpValue} />
                            </div>
                        </Splitter>

                    </section>


                </div >
            </div >
        </>
    )
}

export default Problem