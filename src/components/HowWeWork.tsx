// src/components/HowWeWork.tsx
import { useState } from "react";

const steps = [
  {
    id: 1,
    icon: "🔗",
    title: "Put Link",
    image: "/dashboard-1.png",
  },
  {
    id: 2,
    icon: "🖱️",
    title: "Click Shortener",
    image: "/dashboard-2.png",
  },
  {
    id: 3,
    icon: "✏️",
    title: "Create Custom URL",
    image: "/dashboard-3.png",
  },
  {
    id: 4,
    icon: "📱",
    title: "Create QR Code",
    image: "/dashboard-4.png",
  },
  {
    id: 5,
    icon: "📊",
    title: "Put Tracker Link",
    image: "/dashboard-5.png",
  },
];

const HowWeWork = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="relative bg-gray-900 py-16">
      {/* Tilted Banner */}
      <div
        className="absolute top-0 left-0 right-0 w-full overflow-hidden"
        style={{ height: "80px" }}
      >
        {/* Background tilted stripes */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="w-full h-[200%] bg-blue-600 origin-top-left"
            style={{
              transform: "rotate(-5deg) translateY(-25%)",
              marginTop: "-20px",
            }}
          >
            {/* Scrolling text */}
            <div className="whitespace-nowrap animate-marquee pt-6">
              <span className="inline-block text-white/90 text-xl font-semibold px-4">
                SHORTLINK • MICROSITE • CUSTOM LINK • MANAGE • SHORTLINK •
                MICROSITE • CUSTOM LINK • MANAGE •
              </span>
              <span className="inline-block text-white/90 text-xl font-semibold px-4">
                SHORTLINK • MICROSITE • CUSTOM LINK • MANAGE • SHORTLINK •
                MICROSITE • CUSTOM LINK • MANAGE •
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">HOW WE WORK ⚡</h2>
          <p className="text-gray-400">
            All the products you need to build brand connections, manage links
            and QR Codes, and connect with audiences everywhere, in a single
            unified platform.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-wrap justify-start gap-4 mb-12 overflow-x-auto pb-4">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex items-center px-6 py-3 rounded-full transition-all whitespace-nowrap
               ${
                 activeStep === step.id
                   ? "bg-blue-600 text-white"
                   : "bg-gray-800 text-gray-400 hover:bg-gray-700"
               }`}
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-opacity-20 bg-white mr-2">
                {step.id}
              </span>
              <span className="mr-2">{step.icon}</span>
              <span>{step.title}</span>
            </button>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-xl">
            <div className="bg-white w-full h-full">
              {/* Mockup Dashboard UI */}
              <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8">
                      <img
                        src="/logo.svg"
                        alt="Logo"
                        className="w-full h-full"
                      />
                    </div>
                    <span className="font-bold text-xl">SHORTIE</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">URL SHORTENER</span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Stats */}
                  <div className="col-span-2">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">
                        PERFORMANCE
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold">2,280</div>
                          <div className="text-gray-500">Total Clicks</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold">1,756</div>
                          <div className="text-gray-500">Unique Visitors</div>
                        </div>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-gray-50 p-4 rounded-lg h-64">
                      {/* Replace with actual chart */}
                      <div className="w-full h-full flex items-end justify-between gap-2">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="w-full bg-blue-600 rounded-t"
                            style={{ height: `${Math.random() * 100}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Panel */}
                  <div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">
                        CREATE NEW LINK
                      </h3>
                      {/* Form placeholder */}
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="https://"
                          className="w-full p-2 border rounded"
                        />
                        <button className="w-full bg-blue-600 text-white py-2 rounded">
                          Create Link →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
