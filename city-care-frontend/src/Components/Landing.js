import React from "react";
import { Link } from "react-router-dom";


function Landing() {
    return (
        <>
            
            <div className="bg-gray-700 text-white min-h-screen flex flex-col justify-center items-center">
                <div className="text-center px-6 py-12">
                    <h1 className="text-4xl font-bold mb-4">Welcome to City Care</h1>
                    <p className="text-lg mb-6">
                        Help us maintain the city's infrastructure by reporting issues and keeping your surroundings safe and clean.
                    </p>
                    <Link to="/SignIn">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
            
        </>
    );
}

export default Landing;
