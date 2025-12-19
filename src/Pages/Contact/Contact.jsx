const Contact = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Contact Us
      </h2>

      <p className="text-gray-600 text-lg text-center mb-10">
        Have questions or need support? Get in touch with us.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-5">
          <div>
            <h4 className="font-semibold text-lg">📍 Address</h4>
            <p className="text-gray-600">Tangail, Dhaka, Bangladesh</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg">📧 Email</h4>
            <p className="text-gray-600">support@garmentstracker.com</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg">📞 Phone</h4>
            <p className="text-gray-600">+880 1810-232-106</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
