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
];

const HowWeWork = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="relative bg-gray-900 py-16">
      <div
        className="absolute top-0 left-0 right-0 w-full overflow-hidden"
        style={{ height: "80px" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="w-full h-[200%] bg-blue-600 origin-top-left"
            style={{
              transform: "rotate(-5deg) translateY(-25%)",
              marginTop: "-20px",
            }}
          >
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
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">HOW WE WORK ⚡</h2>
          <p className="text-gray-400">
            All the products you need to build brand connections, manage links
            and QR Codes, and connect with audiences everywhere, in a single
            unified platform.
          </p>
        </div>

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

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-xl">
            <img
              src={steps[activeStep - 1].image}
              alt={`Step ${activeStep}: ${steps[activeStep - 1].title}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
