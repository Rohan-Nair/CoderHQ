import { LANGS } from "../constants/langs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../@/components/ui/select";

const langs = Object.entries(LANGS);
type LangSelectProps = {
    lang: string;
    onSelect: (l: string) => void;
};

const LangSelect: React.FC<LangSelectProps> = ({ lang, onSelect }) => {
    // const handler = (value: string | string[]) => {
    //     console.log(value);
    //     if (typeof value === 'string') {
    //         onSelect(value);
    //     } else {
    //         onSelect(value[0]);
    //     }
    // }
    return (
        // <Select placeholder={lang} onChange={handler} >
        //     {langs.map(([key]) => (
        //         <Select.Option key={key} value={key}>
        //             <Text>
        //                 {key}
        //             </Text>
        //         </Select.Option>
        //     ))}
        // </Select>

        <Select onValueChange={onSelect}>
            <SelectTrigger className="bg-amain w-32 outline-none border-none font-semibold">
                <SelectValue placeholder={lang} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className="bg-amainhover p-3 rounded-md">
                    {langs.map(([key]) => (
                        <SelectItem className="bg-crk cursor-pointer text-amain p-2 my-1 rounded-md w-32" key={key} value={key}>{key}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default LangSelect