import { useState, useEffect } from "react";

const steps = [
  {
    id: 1,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M8 12a4 4 0 014-4h1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 12a4 4 0 01-4 4h-1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M13 12h-2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Put Link",
    image: "/dashboard-1.png",
  },
  {
    id: 2,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="8" r="2" fill="currentColor" />
        <path
          d="M20 20l-6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "Click Shortener",
    image: "/dashboard-2.png",
  },
  {
    id: 3,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 21l6-2 9-9a2.828 2.828 0 10-4-4L5 15l-2 6z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "Create Custom URL",
    image: "/dashboard-3.png",
  },
  {
    id: 4,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect x="16" y="16" width="3" height="3" fill="currentColor" />
      </svg>
    ),
    title: "Create QR Code",
    image: "/dashboard-4.png",
  },
];

const HowWeWork = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const totalSteps = steps.length;

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveStep((prev) => (prev % totalSteps) + 1);
    }, 2500);
    return () => clearInterval(id);
  }, [isPaused, totalSteps]);

  return (
    <section className="relative bg-gray-900 py-20">
      {/* Subtle animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">
            How it works ⚡
          </h2>
          <p className="text-gray-400">
            Shorten links, customize slugs, and get QR codes instantly.
          </p>
        </div>

        <div className="flex flex-wrap justify-start gap-3 mb-6 overflow-x-auto pb-2">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex items-center px-4 py-2.5 rounded-full transition-all whitespace-nowrap ring-1 ring-inset
              ${
                activeStep === step.id
                  ? "bg-blue-600 text-white ring-blue-500"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 ring-gray-700"
              }`}
            >
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 mr-2 text-sm">
                {step.id}
              </span>
              <span className="mr-2 text-white/90">{step.icon}</span>
              <span>{step.title}</span>
            </button>
          ))}
        </div>

        {/* Animated preview with progress and subtle transitions */}
        <div
          className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <div className="ml-3 flex-1 text-xs text-gray-500 truncate">
              shortie.app/demo
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-1 bg-gray-100">
              <div
                key={activeStep}
                className="h-1 bg-blue-600 animate-[stepProgress_2.5s_linear]"
              />
            </div>
            <div className="p-3 sm:p-6 overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${(activeStep - 1) * 100}%)` }}
              >
                {steps.map((s) => (
                  <div key={s.id} className="w-full shrink-0">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={s.image}
                        alt={`Step ${s.id}: ${s.title}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
