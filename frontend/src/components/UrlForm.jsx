import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [customShortId, setCustomShortId] = useState("")
  const {isAuthenticated} = useSelector((state) => state.auth)

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!url) {
      setError("Please enter a URL");
      return;
    }
    
    console.log("Form submission:", { url, customShortId, isAuthenticated });
    
    // Clear any previous error
    setError(""); 
    // Clear previous short URL
    setShortUrl(""); 
    
    // Pass both url and customShortId to the API
    const result = await createShortUrl(url, customShortId);
    
    console.log("API result:", result);
    
    if (result.success) {
      setShortUrl(result.data.shortURL);
      // Clear form after success
      setUrl("");
      setCustomShortId("");
    } else {
      setError(result.error);
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
      
      {/* Custom URL input - move before submit button */}
      {isAuthenticated && (
        <div>
          <label htmlFor="customShortId" className="block text-sm font-medium text-gray-700 mb-2">
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customShortId"
            value={customShortId}
            onChange={(event) => setCustomShortId(event.target.value)}
            placeholder="Enter custom slug"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">
            Will create: localhost:3000/{customShortId || 'your-custom-url'}
          </p>
        </div>
      )}
      
      {submitted && error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
      {submitted && shortUrl && (
        <p className="text-green-500 text-sm mt-2">
          URL shortened successfully!
        </p>
      )}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
      >
        Shorten URL
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
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
