import LinkPreview from "./LinkPreview";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-10 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute top-20 -right-10 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <span>New</span>
              <span>QR codes for every link</span>
            </div>
            <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-b from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Share shorter links
              </span>
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-brand-600 to-sky-400 bg-clip-text text-transparent">
                  that do more
                </span>
                <span className="absolute inset-x-0 -bottom-2 h-[6px] rounded-full bg-gradient-to-r from-brand-600/20 to-sky-400/20 blur" />
              </span>
            </h1>
            <p className="mt-4 text-gray-600 sm:text-lg">
              Shortie helps you shorten, customize, and track links with
              built-in QR codes.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
              <a
                href="#features"
                className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors w-full sm:w-auto text-center"
              >
                Explore features
              </a>
              <a
                href="#how"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto text-center"
              >
                See how it works
              </a>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <LinkPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
