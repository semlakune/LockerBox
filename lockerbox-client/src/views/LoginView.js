import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginHandler} from "../store/actions/actionUser";
import { ToastContainer, toast } from 'react-toastify';


export default function LoginView() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false)
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })

    const loginAction = (e) => {
        e.preventDefault()
        dispatch(loginHandler(loginForm))
            .then((data) => {
                localStorage.setItem("access_token", data.access_token)
                navigate("/")
            })
            .catch((e) => {
                toast.error(JSON.parse(e.message).message, {position: toast.POSITION.TOP_LEFT})
            })
    }

    if (localStorage.access_token) return <Navigate to={"/"} />
    return (
        <div className={"flex flex-row"}>
            <div className={"basis-1/2 h-screen flex items-center"}>
                <div className={"mx-auto"}>
                    <h1 className={"font-bold text-3xl mb-3"}>Welcome back!</h1>
                    <h1 className={"text-neutral-500 mb-10"}>Please sign in to your account</h1>
                    <form onSubmit={loginAction} className={"bg-white"}>
                        <div className={"mb-3"}>
                            <input onChange={(e) => setLoginForm({...loginForm, email: e.target.value})} value={loginForm.email} type="email" placeholder={"Email"} className={"shadow p-3 input bg-neutral-200 focus:placeholder:text-transparent"}/>
                        </div>
                        <div className={"mb-5 flex flex-row"}>
                            <input onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} value={loginForm.password} type={isVisible ? 'text' : 'password'} placeholder={"Password"} className={"shadow p-3 input bg-neutral-200 focus:placeholder:text-transparent"}/>
                            {isVisible ?
                                <span onClick={() => setIsVisible(!isVisible)}><i className="fa-solid fa-eye absolute mt-3 pt-1 right-2/3 mr-3 text-lg"></i></span>
                                :
                                <span onClick={() => setIsVisible(!isVisible)}><i className="fa-solid fa-eye-slash absolute mt-3 pt-1 right-2/3 mr-3 text-lg"></i></span>
                            }
                        </div>
                        <button type={"submit"} className={"button h-10 text-stone-400 font-bold"}>Login</button>
                    </form>
                    <p className={"mt-5 text-center text-neutral-500"}>Don't have account yet? <button onClick={() => navigate("/register")} className={"text-stone-400 font-bold hover:text-slate-900"}>Sign up</button></p>
                </div>
            </div>
            <div className={"basis-1/2 h-screen bg-stone-300 right-side"}>

            </div>
            <ToastContainer/>
        </div>
    )
}