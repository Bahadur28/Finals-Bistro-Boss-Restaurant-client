import { useLoaderData } from "react-router-dom";
import About from "./About/About";
import Banner from "./Banner/Banner";
import Services from "./Sevices/Services";

const Home = () => {

    const services = useLoaderData() || []; 

    return (
        <div>
            <Banner />
            <About />
            <Services services={services} />
        </div>
    );
};

export default Home;
