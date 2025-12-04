import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shered/Footer/Footer";
import Navbar from "../Pages/Shered/Navber/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;