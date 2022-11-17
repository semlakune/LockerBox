import {useNavigate} from "react-router-dom";
import logo from "../logo.png"

export default function NavComponent() {
    const navigate = useNavigate()

    return (
        <div className={"basis-1/4 my-auto sidebar flex flex-col justify-center items-center"}>
            <div className={"flex-initial my-auto mt-24 pt-10"}>
                <button className={"absolute top-8 font-black text-2xl hover:text-amber-600 ml-1"}><span><img src={logo} className={"absolute right-32 mr-2 h-10 w-10"} alt=""/></span>LockerBox <span className={"text-emerald-600 text-3xl"}>.</span></button>
                <ul className={"space-y-10"}>
                    <li className={"flex flex-row justify-start items-center hover:text-emerald-600"}>
                        <i className="fa-sharp fa-solid fa-house mr-6"></i>
                        <button onClick={() => navigate("/")} type={"button"} className={"font-bold text-lg text-stone-400 hover:text-stone-800"}>Home</button>
                    </li>
                    <li className={"flex flex-row justify-start items-center hover:text-cyan-600"}>
                        <i className="fa-solid fa-box-archive focus:text-green-500 mr-6"></i>
                        <button onClick={() => navigate("/locker")} type={"button"} className={"font-bold text-lg text-stone-400 hover:text-stone-800"}>My Locker</button>
                    </li>
                    <li className={"flex flex-row justify-start items-center hover:text-indigo-400"}>
                        <i className="fa-solid fa-user focus:text-green-500 mr-6"></i>
                        <button onClick={() => navigate("/account")} type={"button"} className={"font-bold text-lg text-stone-400 hover:text-stone-800"}>Account</button>
                    </li>
                </ul>
            </div>
            <div className={"flex-initial"}>
                <button onClick={() => {
                    localStorage.clear()
                    navigate("/login")
                }} className={"font-bold text-lg text-stone-400 hover:text-red-500"}>
                    <i className="fa-solid fa-door-open mr-6"></i>Logout
                </button>
            </div>
        </div>
    )
}