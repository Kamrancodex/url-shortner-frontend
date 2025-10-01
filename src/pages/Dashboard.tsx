import { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { useNavigate } from "react-router-dom";
import urlShortenerApi from "../api/api";
import type { RegisteredLink } from "../api/types";
import { CheckIcon, ClipboardIcon, TrashIcon } from "@heroicons/react/16/solid";
import LoadingSkeleton from "../components/LoadingSkeleton";
import DeleteModal from "../components/DeleteModal";

const Dashboard = () => {
  const [links, setLinks] = useState<RegisteredLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newLink, setNewLink] = useState("");
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const fetchLinks = async () => {
    try {
      const data = await urlShortenerApi.getRegisteredLinks();
      setLinks(Array.isArray(data) ? data : []);
    } catch (error) {
      if (error instanceof Error && error.message.includes("401")) {
        navigate("/signin");
      }
      setError(
        error instanceof Error ? error.message : "Failed to fetch links"
      );
      setLinks([]);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchLinks();
      setLoading(false);
    })();
  }, [navigate]);

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const newLinkData = await urlShortenerApi.createRegisteredLink(newLink);

      setLinks((prevLinks) => [...prevLinks, newLinkData]);
      console.log(links);

      setNewLink("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create link"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteLink = async (shortCode: string) => {
    try {
      await urlShortenerApi.deleteRegisteredLink(shortCode);
      fetchLinks();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete link"
      );
    }
  };

  const confirmDelete = () => {
    if (linkToDelete) {
      handleDeleteLink(linkToDelete);
      setShowDeleteModal(false);
      setLinkToDelete(null);
    }
  };

  const totalVisits =
    links?.reduce((sum, link) => sum + (link.visitCount || 0), 0) || 0;
  const averageClicks = links?.length
    ? Math.round(totalVisits / links.length)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Dashboard — Shortie"
        canonical="https://sh0rtly.ink/dashboard"
      />
      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Shortie" className="h-6" />
              <span className="font-semibold">Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setLoading(true);
                  fetchLinks().finally(() => setLoading(false));
                }}
                className="text-gray-600 hover:text-gray-900"
                title="Refresh"
              >
                🔄
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("auth_token");
                  navigate("/signin");
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur ring-1 ring-gray-200 rounded-2xl mb-6 p-4">
          <form onSubmit={handleCreateLink} className="flex gap-4">
            <input
              type="url"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="Paste a long URL (https://...)"
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
            <button
              type="submit"
              disabled={creating}
              className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:bg-blue-400"
            >
              {creating ? "Creating..." : "Create Link"}
            </button>
          </form>
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/80 backdrop-blur ring-1 ring-gray-200 rounded-2xl p-6">
            <h3 className="text-gray-500 text-sm">Total Links</h3>
            <p className="text-3xl font-bold">{links.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur ring-1 ring-gray-200 rounded-2xl p-6">
            <h3 className="text-gray-500 text-sm">Total Visits</h3>
            <p className="text-3xl font-bold">{totalVisits}</p>
          </div>
          <div className="bg-white/80 backdrop-blur ring-1 ring-gray-200 rounded-2xl p-6">
            <h3 className="text-gray-500 text-sm">Average Clicks</h3>
            <p className="text-3xl font-bold">{averageClicks}</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur ring-1 ring-gray-200 rounded-2xl overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-medium">Your Links</h2>
            <span className="text-xs text-gray-500">{links.length} total</span>
          </div>
          {loading ? (
            <div className="p-4">
              <LoadingSkeleton />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Original URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Short URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {links.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No links yet. Create your first one!
                      </td>
                    </tr>
                  ) : (
                    links.map((link) => (
                      <tr key={link._id || `link-${link.shortCode}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="truncate max-w-xs">
                            {link.longUrl}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center space-x-2">
                            <a
                              href={`${window.location.origin}/${link.shortCode}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-600 hover:text-brand-700"
                            >
                              {link.shortCode}
                            </a>
                            <button
                              onClick={() =>
                                handleCopy(
                                  `${window.location.origin}/${link.shortCode}`,
                                  link.shortCode
                                )
                              }
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                              title="Copy URL"
                            >
                              {copiedId === link.shortCode ? (
                                <CheckIcon className="h-4 w-4 text-green-500" />
                              ) : (
                                <ClipboardIcon className="h-4 w-4 text-gray-500" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {link.visitCount || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {new Date(link.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => {
                              setLinkToDelete(link.shortCode);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          >
                            <TrashIcon className="h-4 w-4" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete short link?"
        message="This action cannot be undone."
      />
    </div>
  );
};

export default Dashboard;
