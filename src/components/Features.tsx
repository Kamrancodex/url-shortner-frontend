const Features = () => {
  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8">SHORTEN YOUR LINK NOW</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="https://website.com/link/shorter"
            className="flex-1 bg-gray-800 px-4 py-3 rounded-lg"
          />
          <button className="ml-4 px-6 py-3 bg-blue-600 rounded-lg">
            Short Link →
          </button>
        </div>
      </div>
    </div>
  );
};
export default Features;
