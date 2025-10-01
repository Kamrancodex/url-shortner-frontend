const features = [
  {
    title: "Instant Short Links",
    desc: "Create branded short URLs in seconds.",
    icon: (
      <svg className="h-6 w-6 text-brand-600" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M11 12h2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "QR Codes",
    desc: "Auto-generate QR codes for every link.",
    icon: (
      <svg className="h-6 w-6 text-brand-600" viewBox="0 0 24 24" fill="none">
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
  },
  {
    title: "Basic Analytics",
    desc: "See visits and performance at a glance.",
    icon: (
      <svg
        className="h-6 w-6 text-brand-600"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <rect x="5" y="11" width="3" height="8" rx="1" />
        <rect x="10.5" y="7" width="3" height="12" rx="1" />
        <rect x="16" y="13" width="3" height="6" rx="1" />
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Everything you need to share better links
          </h2>
          <p className="mt-3 text-gray-600">
            Shorten links, get QR codes, and view basic stats.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-2xl">{f.icon}</div>
              <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;
