import NotFoundBg from "../../assets/img-4.webp";
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div
            className='relative w-full h-screen flex items-center justify-center'
            style={{
                backgroundImage: `url(${NotFoundBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-black to-black bg-no-repeat bg-center bg-cover opacity-50">
            </div>
            <div className="text-center z-10">
                <p className='text-white text-4xl font-normal pb-10'>PAGE ERROR</p>
                <h1 className="text-white text-7xl font-normal pb-4">404</h1>
                <p className="text-white text-lg font-light pb-2">Page not found</p>
                <p className="text-white text-sm font-light">We're sorry, something is not working here!</p>
                <div className="pt-10">
                    <Link
                        to="/"
                        className="bg-secondary text-black rounded-2xl px-4 py-2 text-base hover:bg-white hover:text-gray-900 transition-colors duration-300 inline-block"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default NotFound;