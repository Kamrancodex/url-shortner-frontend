// src/components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-white" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8">
          {/* Contact */}
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-semibold mb-2">Call</h4>
                <p className="text-gray-600">+91 8493092218</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">Email</h4>
                <p className="text-gray-600">najarkamran212@gmail.com</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">Social</h4>
                <div className="space-y-2 text-gray-600">
                  <a
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-brand-700"
                    href="https://x.com/kamran11011"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X profile @kamran11011"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 4L20 20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M20 4L4 20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>
                      X: <span className="text-brand-600">@kamran11011</span>
                    </span>
                  </a>
                  <a
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-brand-700"
                    href="https://instagram.com/kamran_islamey"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram profile @kamran_islamey"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="5"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                    </svg>
                    <span>
                      Instagram:{" "}
                      <span className="text-brand-600">@kamran_islamey</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <a href="#" className="flex items-center gap-2">
            <img src="/logo-html.png" alt="Shortie" className="h-6" />
            <span className="font-semibold">Shortie</span>
          </a>
          <p className="text-sm text-gray-600">
            © 2025 Shortie. All rights reserved.
          </p>
          <div className="flex gap-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
