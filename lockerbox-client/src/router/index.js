import {createBrowserRouter} from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import NotFoundView from "../views/NotFoundView";
import MyLockerView from "../views/MyLockerView";
import AccountView from "../views/AccountView";

const router = createBrowserRouter([
    {
        element: <PrivateRoute/>,
        children: [
            {
                path: "/",
                element: <HomeView/>
            },
            {
                path: "locker",
                element: <MyLockerView/>
            },
            {
                path: "account",
                element: <AccountView/>
            }
        ]
    },
    {
        path: "login",
        element: <LoginView/>
    },
    {
        path: "register",
        element: <RegisterView/>
    },
    {
        path: "*",
        element: <NotFoundView/>
    }
])

export default router