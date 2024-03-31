import { Editor } from "@monaco-editor/react"
import { useRef, useState } from "react"
import LangSelect from "./LangSelect";
import { SNIPPETS } from "../constants/snippets";
import { PlayIcon, ResetIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import axios from "axios";

interface CodeEditorProps {
    ipValue: string,
    setOpValue: (value: string) => void,
    problemId: string,
    user: {
        name: string,
        email: string,
        pfp: string,
    } | null
}


const CodeEditor = ({ ipValue, setOpValue, problemId, user }: CodeEditorProps) => {
    const editorRef = useRef<any | undefined>();
    const [value, setValue] = useState<string>("");
    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();
    };

    const [language, setLanguage] = useState<string>("cpp");
    const onSelectLanguage = (l: string) => {
        setLanguage(l);
        setValue(SNIPPETS[l as keyof typeof SNIPPETS])
    }

    const runCode = async () => {
        const code = editorRef.current.getValue();
        if (code === "") return;
        try {
            const response = await axios.post("/run", {
                code: code,
                language: language,
                inp: ipValue
            });
            if (response.status === 200) {
                const { run, compile } = response.data;
                if (compile.stderr) {
                    setOpValue(compile.stderr);
                    toast.error("Compilation Error");
                    return;
                } else if (run.stderr) {
                    setOpValue(run.stderr);
                    toast.error("Runtime Error");
                    return;
                } else {
                    setOpValue(run.stdout);
                }
            }
        } catch (e: any) {
            console.log(e);
            toast.error("Could not run code");
        }
    }

    const submitCode = async () => {
        const code = editorRef.current.getValue();
        if (code === "") return;
        const reqData = {
            code: code,
            language: language,
            problemId: problemId,
            user: user,
        }
        try {
            const response = await axios.post("/submit", reqData);
            if (response.status === 200) {
                const { message } = response.data;
                toast.success(message);
            }
        } catch (e: any) {
            console.log(e);
            toast.error("Could not submit code");
        }
    }


    return (
        <div className="flex flex-col lg:flex-row h-full">
            <div className="w-[100vw] px-3 lg:w-full">
                <div className="my-2 flex gap-2">
                    <LangSelect lang={language} onSelect={onSelectLanguage} />
                    <button className='bg-amain hover:bg-amainhover text-mainbl text-md border-none font-medium py-2 px-2 rounded flex items-center gap-1' onClick={runCode}><PlayIcon /><span>Run</span></button>
                    <button className='bg-amain hover:bg-amainhover text-mainbl text-md border-none font-medium py-2 px-2 rounded' onClick={submitCode}>Submit</button>
                    <button className='bg-amain hover:bg-amainhover text-mainbl text-md border-none font-medium py-2 px-2 rounded' onClick={() => setValue(SNIPPETS[language as keyof typeof SNIPPETS])}><ResetIcon /> </button>
                </div>
                <Editor
                    theme="vs-dark"
                    defaultLanguage={language}
                    language={language}
                    defaultValue={SNIPPETS[language as keyof typeof SNIPPETS]}
                    value={value}
                    onChange={(value: string | undefined) => setValue(value || "")}
                    onMount={onMount}
                    options={{
                        minimap: { enabled: false },
                        wordWrap: 'on'
                    }}
                />
            </div>

        </div>
    )

}

export default CodeEditor