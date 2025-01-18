import { useState } from "react";
import urlShortenerApi from "../api/api";

interface ApiResponse {
  shortUrl: string;
  qrCode: string;
}

const LinkPreview = () => {
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!link) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);
      const response = await urlShortenerApi.createShortLinkUnregistered({
        link: link,
      });

      if (response?.shortUrl && response?.qrCode) {
        setResponse(response as ApiResponse);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6">
        <h3 className="font-bold text-lg text-gray-800">GET CODE</h3>
        {response?.qrCode && (
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = response.qrCode;
              link.download = "qr-code.png";
              link.click();
            }}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-full w-full sm:w-auto"
          >
            Download PNG
          </button>
        )}
      </div>

      {/* QR Code Container */}
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">🔗</span>
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm text-gray-500 truncate max-w-[200px] sm:max-w-none">
                {response?.shortUrl || "Your shortened link will appear here"}
              </span>
              {response?.shortUrl && (
                <button
                  onClick={async () => {
                    if (await copyToClipboard(response.shortUrl)) {
                      setCopied(true);
                      // Reset the copied state after 2 seconds
                      setTimeout(() => setCopied(false), 2000);
                    }
                  }}
                  className={`p-1.5 rounded-full transition-colors ${
                    copied
                      ? "bg-green-50 text-green-600"
                      : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  title={copied ? "Copied!" : "Copy to clipboard"}
                >
                  {copied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                      />
                    </svg>
                  )}
                </button>
              )}
            </div>
            <span className="text-xs text-gray-400">
              {new Date().toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-center">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="w-36 h-36 sm:w-48 sm:h-48 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                {response?.qrCode ? (
                  <img
                    src={response.qrCode}
                    alt="QR Code"
                    className="w-32 h-32 sm:w-40 sm:h-40"
                  />
                ) : (
                  <img
                    src="/qr-placeholder.svg"
                    alt="QR Code Placeholder"
                    className="w-32 h-32 sm:w-40 sm:h-40"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Link Preview */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-3">
          CUSTOM/SHORTEN YOUR LINK
        </h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter your URL"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {loading ? "Shortening..." : "Shrtn"}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">💡</span>
            <p className="text-sm text-gray-500">
              Create your custom link for better branding
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkPreview;
