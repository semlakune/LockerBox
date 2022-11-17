import LockerComponent from "../components/LockerComponent";

export default function ContentView(props) {
    const { greet, user } = props

    return (
        <div className={"basis-3/4 main h-screen overflow-hidden"}>
            <div className={"flex-initial px-8 py-8 my-16"}>
                <h1 className={"font-bold text-4xl mb-1"}>Good {greet}, {user.fullName}!</h1>
                <h1 className={"font-bold"}>Here you can choose your locker and save what you desire ;)</h1>
            </div>
            <div className={"hidden lg:block fixed z-20 inset-0 top-[12rem] left-auto right-auto px-8 overflow-y-auto scrollbar-hide"}>
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
            </div>
        </div>
    )
}