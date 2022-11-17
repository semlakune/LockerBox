import Lottie from "lottie-react";
import NavComponent from "../components/NavComponent";
import LockerComponent from "../components/LockerComponent";
import nodata from "./json/nodata.json"

export default function MyLockerView(props) {
    const data = false
    return (
        <div className={"flex flex-row main"}>
            {/*SIDE NAVIGATION*/}
            <NavComponent/>

            {/*CONTENT*/}
            <div className={"basis-3/4 main h-screen overflow-hidden"}>
                <div className={"flex-initial px-8 py-8 my-16"}>
                    {data && <h1 className={"font-bold text-4xl"}>You have 0 Locker</h1>}
                </div>
                <div className={"hidden lg:block fixed z-20 inset-0 top-[12rem] left-auto right-auto px-8 overflow-y-auto w-full scrollbar-hide"}>
                    {
                        !data ?
                            <div className={"flex flex-col justify-center items-center mr-80"}>
                                <Lottie animationData={nodata} loop={true} className={"w-60 h-60"} />
                                <h1 className={"font-bold text-2xl text-stone-400"}>You have no locker yet</h1>
                            </div>
                            :
                            <nav className="text-sm leading-6 relative">
                                <div className="sticky top-0 -ml-0.5 pointer-events-none">
                                    <div className="bg-white pointer-events-auto">
                                    </div>
                                    <div className="h-10 bg-gradient-to-b from-stone-200 rounded-r-3xl rounded-l-3xl"></div>
                                </div>

                                <LockerComponent/>

                                <div className="sticky bottom-0 -ml-0.5 pointer-events-none">
                                    <div className="h-12 bg-gradient-to-t from-stone-200 rounded-r-3xl rounded-l-3xl"></div>
                                    <div className="bg-white pointer-events-auto">
                                    </div>
                                </div>
                            </nav>
                    }
                </div>
            </div>

            <div className={"basis-3/6 overflow-hidden pr-8"}>
            </div>
        </div>
    )
}