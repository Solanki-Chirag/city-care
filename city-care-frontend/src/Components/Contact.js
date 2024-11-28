import React from "react";

function Contact() {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Contact Us Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-6 text-indigo-400">Contact Us</h1>
          <p className="text-lg mb-8 text-gray-400">
            We would love to hear from you! Whether you have a question, suggestion, or need support, feel free to reach out to us.
          </p>

          {/* Contact Form */}
          <form className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-md mx-auto space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-300">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 mt-2 bg-gray-600 text-white border border-gray-500 rounded-lg"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-300">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 mt-2 bg-gray-600 text-white border border-gray-500 rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-300">Message</label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 mt-2 bg-gray-600 text-white border border-gray-500 rounded-lg"
                placeholder="Write your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer should stay at the bottom */}
      <div className="mb-0"></div>
    </div>
  );
}

export default Contact;
