import LinkPreview from "./LinkPreview";

const Hero = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
        {/* Left side - Text content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            BIO LINK & LINK SHORTENER FOR BUSINESS NEEDS
          </h1>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            On a single platform, you'll find all the tools you need to connect
            audiences worldwide, manage links with QR Codes, and custom
            redirection clicks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
              Get Started For Free
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto">
              Start Quote
            </button>
          </div>
        </div>
        {/* Right side - Link Preview */}
        <div className="w-full lg:w-1/2">
          <LinkPreview />
        </div>
      </div>
    </div>
  );
};

export default Hero;
