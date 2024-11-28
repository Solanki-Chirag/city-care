import React from "react";

function About() {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* About Us Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-6 text-indigo-400">About Us</h1>
          <p className="text-lg mb-8 text-gray-400">
            At City Care, we are dedicated to providing a seamless platform for citizens to report, track, and resolve local utility issues. Our goal is to make your city a better place to live by improving the way utilities are handled and ensuring faster resolutions.
          </p>
          
          {/* Mission Statement */}
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-300 mb-8">
            Our mission is to empower citizens by providing a simple, user-friendly platform for reporting city issues, promoting community involvement, and improving transparency between local authorities and the residents.
          </p>
          
          {/* Vision Statement */}
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-300 mb-8">
            We envision a future where every citizen has a voice in maintaining their city's infrastructure, fostering a stronger community and a cleaner, safer environment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
