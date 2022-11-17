import Lottie from "lottie-react";
import notfound from "./json/notfound.json"
import {useNavigate} from "react-router-dom";

export default function NotFoundView() {
    const navigate = useNavigate()
    return (
        <div className={"flex flex-col justify-center items-center mx-auto mt-64 h-80 w-80"}>
            <Lottie animationData={notfound} loop={true} />
            <button onClick={() => navigate("/")} className={"border font-bold p-3 rounded-2xl hover:text-blue-500"}>Home</button>
        </div>
    )
}