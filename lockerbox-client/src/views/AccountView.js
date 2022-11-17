import NavComponent from "../components/NavComponent";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDetail, topUpBalance} from "../store/actions/actionUser";
import {ToastContainer,toast} from "react-toastify";

export default function AccountView() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userReducer)

    const [amount, setAmount] = useState("")
    const [showModal, setShowModal] = useState(false)

    const idRupiah = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    });

    const topUpAction = (e) => {
        e.preventDefault()
        dispatch(topUpBalance(amount))
            .then((_) => {
                setShowModal(false)
                dispatch(fetchUserDetail())
                toast.success("Success add balance")
                setAmount("")
            })
            .catch((e) => {
                toast.error(JSON.parse(e.message).message)
            })
    }

    useEffect(() => {
        dispatch(fetchUserDetail())
    }, [])
    return (
        <div className={"flex flex-row main"}>
            <NavComponent/>
            <div className={"basis-3/4 main h-screen overflow-hidden"}>
                <div className={"flex-initial px-8 py-8 my-16"}>
                    <h1 className={"font-bold text-4xl"}>Account Detail</h1>
                </div>
                <div className={"px-8"}>
                    <div className={"bg-stone-50 shadow h-auto w-96 rounded-3xl p-10"}>
                        <div className={"grid grid-cols-3 mb-8"}>
                            <h1 className={"font-bold text-stone-400"}>Name</h1>
                            <h1 className={"font-bold text-stone-600"}>{user?.fullName}</h1>
                        </div>
                        <div className={"grid grid-cols-3 mb-8"}>
                            <h1 className={"font-bold text-stone-400"}>Email</h1>
                            <h1 className={"font-bold text-stone-600"}>{user?.email}</h1>
                        </div>
                        <div className={"grid grid-cols-3 mb-3"}>
                            <h1 className={"font-bold text-stone-400"}>Balance</h1>
                            <h1 className={"font-bold text-stone-600"}>{idRupiah.format(user?.balance)}
                            <span>
                                <button onClick={() => {
                                    setAmount("")
                                    setShowModal(true)
                                }} className={"w-full text-white bg-stone-700 hover:bg-stone-900 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-2 mt-5 py-2.5 text-center"}><span><i className="fa-solid fa-wallet mr-2"></i></span>Topup</button>
                            </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/*TOPUP MODAL*/}
            <div onClick={() => setShowModal(false)} className={`${!showModal && 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full backdrop-blur-md`}>
                <div onClick={(e) => e.stopPropagation()} className={"m-auto mt-64 p-4 w-full max-w-md h-full md:h-auto"}>
                    <div className="relative bg-stone-50 rounded-lg shadow">
                        <button onClick={() => {
                            setAmount("")
                            setShowModal(false)
                        }} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">

                                </path>
                            </svg>
                        </button>
                        <div className="py-6 px-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900">Add balance</h3>
                            <form onSubmit={topUpAction} className={"space-y-6"}>
                                <div>
                                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" name="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Rp. 10.000, 00" min={0}/>
                                </div>
                                <button type="submit" className="w-full text-white bg-stone-700 hover:bg-stone-900 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Top Up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"basis-3/6 overflow-hidden pr-8"}>
            </div>
            <ToastContainer/>
        </div>

    )
}