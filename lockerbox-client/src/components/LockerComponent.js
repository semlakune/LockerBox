import lockerImg from "../views/img/locker.png";

export default function LockerComponent(props) {
    const { addCart, locker } = props
    return (
        <li>
            <button onClick={() => addCart(locker.id)} type={"button"} className={"transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"}>
                <img src={lockerImg} className={"card shadow"} alt=""/>
            <h1 className={"font-black text-lg"}>{locker.lockerNumber}</h1>
            </button>
        </li>
    )
}