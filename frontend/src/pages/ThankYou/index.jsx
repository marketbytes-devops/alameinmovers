import ThankYouBg from "../../assets/img-5.webp";
import { Link } from 'react-router-dom';

const ThankYou = () => {
    return (
        <div
            className='relative w-full h-screen flex items-center justify-center'
            style={{
                backgroundImage: `url(${ThankYouBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-black to-black bg-no-repeat bg-center bg-cover opacity-50">
            </div>
            <div className="text-center z-10">
                <h1 className="text-white text-4xl font-normal pb-4">
                    Thanks for submitting!</h1>
                <p className="text-white text-lg font-light pb-2">Your message has been sent!</p>
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

export default ThankYou;