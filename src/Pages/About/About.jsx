const About = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        About Us
      </h2>

      <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
        The{" "}
        <span className="font-semibold">
          Garments Order and Production Tracker System
        </span>
        is designed to help garment factories manage orders, track production
        progress, and improve workflow efficiency.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="p-6 rounded-xl shadow-md bg-white">
          <h3 className="text-xl font-semibold mb-3">📦 Order Management</h3>
          <p className="text-gray-600">
            Easily manage buyer orders, quantities, deadlines, and order status
            from a single platform.
          </p>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-white">
          <h3 className="text-xl font-semibold mb-3">🏭 Production Tracking</h3>
          <p className="text-gray-600">
            Monitor cutting, sewing, finishing, and shipment stages in real time
            to reduce delays and errors.
          </p>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-white">
          <h3 className="text-xl font-semibold mb-3">📊 Smart Reporting</h3>
          <p className="text-gray-600">
            Generate production reports, efficiency insights, and delivery
            summaries to support better decision-making.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
