import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import urlShortenerApi from "../api/api";
import type { RegisteredLink } from "../api/types";
import { CheckIcon, ClipboardIcon, TrashIcon } from "@heroicons/react/16/solid";

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
    fetchLinks();
    setLoading(false);
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
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl">Shortie</span>
            </div>
            <div className="flex items-center">
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
        <div className="bg-white shadow rounded-lg mb-6 p-4">
          <form onSubmit={handleCreateLink} className="flex gap-4">
            <input
              type="url"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="Enter URL to shorten"
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={creating}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {creating ? "Creating..." : "Create Link"}
            </button>
          </form>
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500 text-sm">Total Links</h3>
            <p className="text-3xl font-bold">{links.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500 text-sm">Total Visits</h3>
            <p className="text-3xl font-bold">{totalVisits}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500 text-sm">Average Clicks</h3>
            <p className="text-3xl font-bold">{averageClicks}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium">Your Links</h2>
            <button
              onClick={() => {
                setLoading(true);
                fetchLinks().finally(() => setLoading(false));
              }}
              className="text-blue-600 hover:text-blue-900"
            >
              <span className="h-5 w-5">🔄</span>
            </button>
          </div>
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
                {loading ? (
                  <tr key="loading">
                    <td colSpan={5} className="px-6 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : links.length === 0 ? (
                  <tr key="empty">
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No links yet. Create your first one!
                    </td>
                  </tr>
                ) : (
                  links.map((link) => (
                    <tr key={link._id || `link-${link.shortCode}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="truncate max-w-xs">{link.longUrl}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2">
                          <a
                            href={link.shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {link.shortCode}
                          </a>
                          <button
                            onClick={() =>
                              handleCopy(link.shortUrl, link.shortCode)
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
        </div>
      </main>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this link?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
