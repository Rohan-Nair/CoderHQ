import { Editor } from "@monaco-editor/react"
import { useRef, useState } from "react"
import LangSelect from "./LangSelect";
import { SNIPPETS } from "../constants/snippets";
const CodeEditor = () => {
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

    return (
        <div className="flex flex-col lg:flex-row h-full">
            <div className="w-[100vw] px-3 lg:w-full">
                <div className="my-2">
                    <LangSelect lang={language} onSelect={onSelectLanguage} />
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