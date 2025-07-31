import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [customShortId, setCustomShortId] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const validateCustomShortId = (shortId) => {
    if (!shortId) return true; // Optional field

    // Check if shortId contains only alphanumeric characters, hyphens, and underscores
    const shortIdPattern = /^[a-zA-Z0-9_-]+$/;
    if (!shortIdPattern.test(shortId)) {
      return "Custom URL can only contain letters, numbers, hyphens, and underscores";
    }
    
    // Check length
    if (shortId.length < 3) {
      return "Custom URL must be at least 3 characters long";
    }

    if (shortId.length > 20) {
      return "Custom URL must be less than 20 characters long";
    }
    
    return true;
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    setLoading(true);
    setError("");
    setShortUrl("");

   
    // Validate URL
    if (!url) {
      setError("Please enter a URL");
      setLoading(false);
      return;
    }
    console.log("=== FORM SUBMISSION START ===");
  console.log("URL:", url);
  console.log("Custom Short ID:", customShortId);
  console.log("Is Authenticated:", isAuthenticated);
    // Validate custom short ID if provided
    if (customShortId) {
      const shortIdValidation = validateCustomShortId(customShortId);
      if (shortIdValidation !== true) {
        setError(shortIdValidation);
        setLoading(false);
        return;
      }
    }

    try {
      // Pass both URL and custom slug to API
      const result = await createShortUrl(url, customShortId || undefined);
      
      if (result.success) {
        setShortUrl(result.data.shortURL);
        // Clear form after successful creation
        setUrl("");
        setCustomShortId("");
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter your URL
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/very-long-url"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
        />
      </div>

      {/* Move custom slug input before submit button and show only when authenticated */}
      {isAuthenticated && (
        <div>
          <label htmlFor="customShortId" className="block text-sm font-medium text-gray-700 mb-2">
            Custom URL (optional)
          </label>
          <div className="relative">
            <input
              type="text"
              id="customShortId"
              value={customShortId}
              onChange={(e) => setCustomShortId(e.target.value.toLowerCase())}
              placeholder="my-custom-url"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-400 text-sm">
                localhost:3000/
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Use letters, numbers, hyphens, and underscores only (3-20 characters)
          </p>
        </div>
      )}

      {submitted && error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {submitted && shortUrl && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">
            URL shortened successfully!
          </p>
        </div>
      )}

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Shortening...
          </>
        ) : (
          "Shorten URL"
        )}
      </button>

      {shortUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">
            Your shortened URL:
          </h3>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-sm focus:outline-none"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition duration-200"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;