import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchUserDetail} from "../store/actions/actionUser";
import LockerComponent from "../components/LockerComponent";
import NavComponent from "../components/NavComponent";
import CartBalance from "../components/CartBalance";
import {fetchAllLocker} from "../store/actions/actionLocker";
import {addToCart, fetchCart} from "../store/actions/actionUserLocker";
import {ToastContainer,toast} from "react-toastify";

export default function HomeView() {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.userReducer)
    const { lockers } = useSelector((state) => state.lockerReducer)
    const { carts } = useSelector((state) => state.userLockerReducer)

    const [greet, setGreet] = useState("")
    const [itemArray, setItemArray] = useState([])

    const addCart = (lockerId) => {
        if (carts.length >= 3) return toast.error("Maximum order is 3", {position: toast.POSITION.TOP_LEFT})
        dispatch(addToCart(lockerId))
            .then((_) => {
                toast.success("Added to cart", {position: toast.POSITION.TOP_LEFT})
                dispatch(fetchAllLocker())
                dispatch(fetchCart())
                carts.forEach(c => {
                    setItemArray([...itemArray, { LockerId: c.LockerId, dayCount: 1 }])
                })
            })
    }
    const getGreet = () => {
        const now = new Date();
        const isMorning   = now.getHours() > 5  && now.getHours() <= 12;
        const isAfternoon = now.getHours() > 12 && now.getHours() <= 18;
        const isEvening   = now.getHours() > 18 && now.getHours() <= 22;
        const isNight     = now.getHours() > 22 || now.getHours() <= 5;

        if (isMorning) setGreet("Morning")
        else if (isAfternoon) setGreet("Afternoon")
        else if (isEvening) setGreet("Evening")
        else if (isNight) setGreet("Night")
    }

    useEffect(() => {
        dispatch(fetchUserDetail())
        dispatch(fetchAllLocker())
        dispatch(fetchCart())
        getGreet()
    // eslint-disable-next-line
    }, [])

    return (
        <div className={"flex flex-row main"}>
            {/*SIDE NAVIGATION*/}
            <NavComponent/>

            {/*CONTENT*/}
            <div className={"basis-3/4 main h-screen overflow-hidden"}>
                <div className={"flex-initial px-8 py-8 my-16"}>
                    <h1 className={"font-bold text-4xl mb-1"}>Good {greet}, {user.fullName}!</h1>
                    <h1 className={"font-bold"}>Here you can choose your locker and save what you desire ;)</h1>
                </div>
                <div className={"hidden lg:block fixed z-20 inset-0 top-[14rem] left-auto right-auto px-8 overflow-y-auto scrollbar-hide"}>
                    <nav className="text-sm leading-6 relative">
                        <div className="sticky top-0 -ml-0.5 pointer-events-none">
                            <div className="bg-white pointer-events-auto">

                            </div>
                            <div className="h-10 bg-gradient-to-b from-stone-200 rounded-r-3xl rounded-l-3xl"></div>
                        </div>
                        <ul className={"flex flex-row flex-wrap items-center"}>
                        {
                            lockers?.map((locker) => {
                                return <LockerComponent locker={locker} key={locker.id} addCart={addCart} />
                            })
                        }
                        </ul>
                        <div className="sticky bottom-0 -ml-0.5 pointer-events-none">
                            <div className="h-12 bg-gradient-to-t from-stone-200 rounded-r-3xl rounded-l-3xl"></div>
                            <div className="bg-white pointer-events-auto">

                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/*CART AND BALANCE*/}
            <CartBalance balance={user?.balance} item={itemArray} carts={carts}/>
            <ToastContainer/>
        </div>
    )
}