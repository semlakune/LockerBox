import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {useDispatch} from "react-redux";
import {registerHandler} from "../store/actions/actionUser";

export default function RegisterView() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false)
    const [secondVisible, setSecondVisible] = useState(false)
    const [isEqual, setIsEqual] = useState(null)
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: ""
    })
    const [secondPassword, setSecondPassword] = useState("")

    const registerAction = (e) => {
        e.preventDefault()
        if (form.password !== secondPassword) {
            setIsEqual(false)
            toast.error("Password did not match")
        }
        else {
            dispatch(registerHandler(form))
                .then((data) => {
                    localStorage.setItem("access_token", data.access_token)
                    navigate("/")
                })
                .catch((e) => {
                    toast.error(JSON.parse(e.message).message)
                })
        }
    }

    if (localStorage.access_token) return <Navigate to={"/"} />
    return (
        <div className={"flex flex-row"}>
            <div className={"basis-1/2 h-screen bg-stone-300 left-side"}>

            </div>
            <div className={"basis-1/2 h-screen flex items-center"}>
                <div className={"mx-auto"}>
                    <h1 className={"font-bold text-3xl mb-3"}>Create an account</h1>
                    <h1 className={"text-neutral-500 mb-10"}>Hi! Please register your account</h1>
                    <form className={"bg-white"} onSubmit={registerAction}>
                        <div className={"mb-3"}>
                            <input onChange={(e) => setForm({...form, fullName: e.target.value})} value={form.fullName} type="text" name={"fullName"} placeholder={"Your name"} className={"shadow p-3 input bg-neutral-200 focus:placeholder:text-transparent"}/>
                        </div>
                        <div className={"mb-3"}>
                            <input onChange={(e) => setForm({...form, email: e.target.value})} value={form.email} type="email" name={"email"} placeholder={"Email"} className={"shadow p-3 input bg-neutral-200 focus:placeholder:text-transparent"}/>
                        </div>
                        <div className={"mb-3 flex flex-row"}>
                            <input onChange={(e) => setForm({...form, password: e.target.value})} onFocus={() => setIsEqual(null)} type={isVisible ? 'text' : 'password'} placeholder={"Password"} name={"password"} className={`shadow p-3 input bg-neutral-200 focus:placeholder:text-transparent ${(!isEqual && isEqual !== null) && 'border-2 border-rose-600'}`}/>
                            {isVisible ?
                                <span onClick={() => setIsVisible(!isVisible)}><i className="fa-solid fa-eye absolute mt-3 pt-1 left-2/3 ml-60 pl-1 text-lg"></i></span>
                                :
                                <span onClick={() => setIsVisible(!isVisible)}><i className="fa-solid fa-eye-slash absolute mt-3 pt-1 left-2/3 ml-60 pl-1 text-lg"></i></span>
                            }
                        </div>
                        <div className={"mb-5 flex flex-row"}>
                            <input onChange={(e) => setSecondPassword(e.target.value)} value={secondPassword} onFocus={() => setIsEqual(null)} type={secondVisible ? 'text' : 'password'} placeholder={"Confirm password"} name={"secondPassword"} className={`shadow p-3 input bg-neutral-200 focus:placeholder:text-transparent ${(!isEqual && isEqual !== null) && 'border-2 border-rose-600'}`}/>
                            {secondVisible ?
                                <span onClick={() => setSecondVisible(!secondVisible)}><i className="fa-solid fa-eye absolute mt-3 pt-1 left-2/3 ml-60 pl-1 text-lg"></i></span>
                                :
                                <span onClick={() => setSecondVisible(!secondVisible)}><i className="fa-solid fa-eye-slash absolute mt-3 pt-1 left-2/3 ml-60 pl-1 text-lg"></i></span>
                            }
                        </div>
                        <button type={"submit"} className={"button h-10 text-stone-400 font-bold"}>Register</button>
                    </form>
                    <p className={"mt-5 text-center text-neutral-500"}>Already have an account? <button onClick={() => navigate("/login")} className={"text-stone-400 font-bold hover:text-slate-900"}>Sign in</button></p>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}