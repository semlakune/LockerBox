import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {deleteItemCart, fetchCart} from "../store/actions/actionUserLocker";
import {ToastContainer, toast} from "react-toastify";
import {fetchAllLocker} from "../store/actions/actionLocker";

export default function CartBalance(props) {
    const { carts, balance, item } = props
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false)
    const [orderForm, setOrderForm] = useState([])

    const idRupiah = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    });

    const removeCartItem = useCallback((lockerId) => {
        if (carts.length < 1) {
            setShowModal(false)
        }
        dispatch(deleteItemCart(lockerId))
            .then((_) => {
                toast.success("Item deleted from cart", {position: toast.POSITION.TOP_LEFT})
                dispatch(fetchCart())
                dispatch(fetchAllLocker())
            })
            .catch((e) => {
                toast.error(JSON.parse(e.message).message, {position: toast.POSITION.TOP_LEFT})
            })

    }, [carts])

    useEffect(() => {
        carts.forEach(c => {
            setOrderForm([...orderForm, { LockerNumber: c.LockerNumber, dayCount: 1 }])

        })
    }, [])

    return (
        <div className={"basis-3/6 overflow-hidden pr-8"}>
            <div className={"flex flex-row justify-end w-auto mt-6"}>
                {/*WALLET BALANCE*/}
                <div className={`shadow bg-stone-50 w-auto p-3 border-stone-200 border rounded-2xl ${carts.length > 0 && 'grid grid-cols-2 divide-x-2'}`}>
                    <button onClick={() => navigate("/account")} className={"mx-3 font-bold text-stone-400 hover:text-stone-800"}>
                        <i className="fa-solid fa-wallet mr-2"></i>
                        {idRupiah.format(balance)}
                    </button>
                    {carts.length > 0 &&
                        <button onClick={() => setShowModal(true)} className={"mx-3 font-bold text-stone-400 hover:text-stone-800"}>
                            <i className="fa-solid fa-cart-shopping mr-2"></i>
                            {carts.length}
                        </button>
                    }
                </div>
            </div>

            {/*CART MODAL*/}
            <div onClick={() => setShowModal(false)} className={`${!showModal && 'hidden'} overflow-y-hidden fixed z-50 w-full md:inset-0 backdrop-blur-md`}>
                <div onClick={(e) => e.stopPropagation()} className={"m-auto mt-24 p-4 w-full max-w-sm h-full mr-3"}>
                    <div className="relative bg-stone-50 rounded-2xl shadow">
                        <button onClick={() => setShowModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">

                                </path>
                            </svg>
                        </button>

                        <div className="p-6">
                            <h3 className="mb-4 text-xl font-medium text-gray-900">Cart</h3>
                            <form className={"space-y-6"}>
                                    {
                                        carts.map((cart, i) => {
                                            return (
                                                <div key={cart.id} className={"grid grid-cols-2"}>
                                                    <div className={"grid grid-rows-2 gap-1"}>
                                                        <h1 className="text-sm font-medium text-stone-800 w-max">Locker Number {cart.Locker.lockerNumber}
                                                        </h1>
                                                        <h1 className="text-sm font-medium text-stone-800 w-max">Day
                                                        <span className={"ml-5"}>
                                                            <button type={"button"}><i className="fa-solid fa-square-minus"></i></button>
                                                            <input value={orderForm[i]?.dayCount} className={"w-10 text-center rounded-xl border mx-2"} type="number"/>
                                                            <button type={"button"}><i className="fa-solid fa-square-plus"></i></button>
                                                        </span>
                                                        </h1>
                                                    </div>
                                                    <div>
                                                        <h1 className={"text-right font-medium text-sm"}>Rp10.000,00
                                                            <span className={"ml-3"}>
                                                                <button type={"button"} onClick={() => removeCartItem(cart.LockerId)} className={"hover:text-rose-500"}><i className="fa-solid fa-trash-can"></i></button>
                                                            </span>
                                                        </h1>
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                <div className={"grid grid-cols-2"}>
                                    <h1 className={"text-left font-bold"}>Total</h1>
                                    <h1 className={"text-right font-bold"}>Rp30.000,00</h1>
                                </div>
                                <button type="submit" className="w-full text-white bg-stone-700 hover:bg-stone-900 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Order
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}