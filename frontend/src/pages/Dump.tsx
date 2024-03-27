import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useUserPfpStore } from "../store/store";

const Dump = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleImageClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }
    const handleImageChange = async (e: any) => {
        console.log("fileupload fn");
        const file = e.target.files[0];
        const formData = new FormData();
        formData.set('udetails', JSON.stringify(user));
        formData.set('pfp', file);

        const response = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
        // const { data } = response;
        if (response.status === 200) {
            useUserPfpStore.setState({ pfp: response.data.pfp });
            toast.success("Profile Image Updated");
        } else {
            toast.error("Something went wrong");
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <p>open</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[20rem] bg-mainbl mt-4 border-none mr-2 text-white p-3">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleImageClick} className="flex flex-col">
                        <p>add profile phogo</p>
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} />
                    </DropdownMenuItem>

                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default Dump