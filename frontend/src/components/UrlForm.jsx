import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { Copy, LinkIcon, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

const UrlForm = ({ compact }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [customShortId, setCustomShortId] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
    setLoading(true);
    if (!url) {
      setError("Please enter a URL");
      setLoading(false);
      return;
    }

    // Clear any previous error
    setError("");
    // Clear previous short URL
    setShortUrl("");

    // Pass both url and customShortId to the API
    const result = await createShortUrl(url, customShortId);

    if (result.success) {
      setShortUrl(result.data.shortURL);
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      // Clear form after success
      setUrl("");
      setCustomShortId("");
    } else {
      setError(result.error);
      setLoading(false);
    }
  };
  if (compact) {
    console.log("Compact mode");
    return (
      <>
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Paste a long URL to shorten (e.g. https://example.com/very/long/path)"
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-600/90"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LinkIcon className="mr-2 h-4 w-4" />
            )}
            Shorten
          </Button>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          {submitted && error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          {submitted && shortUrl && (
            <p className="text-green-500 text-sm mt-2">
              URL shortened successfully!
            </p>
          )}
        </div>
        {shortUrl && (
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Label className="sr-only">Short URL:</Label>
            <Input className="flex-1 w-full" readOnly value={shortUrl} />
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              <Copy className="mr-2 h-4 w-4" />
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        )}
      </>
    );
  }

  // return (
  //   <div className="space-y-4">
  //     <div>
  //       <label
  //         htmlFor="url"
  //         className="block text-sm font-medium text-gray-700 mb-2"
  //       >
  //         Enter your URL
  //       </label>
  //       <input
  //         type="text"
  //         id="url"
  //         value={url}
  //         onChange={(e) => setUrl(e.target.value)}
  //         placeholder="https://example.com/very-long-url"
  //         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
  //       />
  //     </div>

  //     {/* Custom URL input - move before submit button */}
  //     {isAuthenticated && (
  //       <div>
  //         <label htmlFor="customShortId" className="block text-sm font-medium text-gray-700 mb-2">
  //           Custom URL (optional)
  //         </label>
  //         <input
  //           type="text"
  //           id="customShortId"
  //           value={customShortId}
  //           onChange={(event) => setCustomShortId(event.target.value)}
  //           placeholder="Enter custom slug"
  //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
  //         />
  //         <p className="text-xs text-gray-500 mt-1">
  //           Will create: localhost:3000/{customShortId || 'your-custom-url'}
  //         </p>
  //       </div>
  //     )}

  //     {submitted && error && (
  //       <p className="text-red-500 text-sm mt-2">{error}</p>
  //     )}
  //     {submitted && shortUrl && (
  //       <p className="text-green-500 text-sm mt-2">
  //         URL shortened successfully!
  //       </p>
  //     )}
  //     <button
  //       type="submit"
  //       onClick={handleSubmit}
  //       className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
  //     >
  //       Shorten URL
  //     </button>
  //     {shortUrl && (
  //       <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
  //         <h3 className="text-sm font-medium text-green-800 mb-2">
  //           Your shortened URL:
  //         </h3>
  //         <div className="flex items-center space-x-2">
  //           <input
  //             type="text"
  //             value={shortUrl}
  //             readOnly
  //             className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-sm focus:outline-none"
  //           />
  //           <button
  //             onClick={() => {
  //               navigator.clipboard.writeText(shortUrl);
  //               setCopied(true);
  //               setTimeout(() => setCopied(false), 1500);
  //             }}
  //             className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition duration-200"
  //           >
  //             {copied ? "Copied" : "Copy"}
  //           </button>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );

  console.log("Compact mode off");
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create a short link</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label  htmlFor="url">Enter Long URL</Label>
          <Input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very-long-url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
            required
          />
        </div>
        {isAuthenticated && (
          <div className="grid gap-2">
            <Label htmlFor="customShortId">Custom slug (optional)</Label>
            <Input
              id="customShortId"
            value={customShortId}
            onChange={(event) => setCustomShortId(event.target.value)}
            placeholder="your-custom-code"
            />
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
      {shortUrl && (
  <div className="grid gap-2">
    <Label htmlFor="short-url">Short URL:</Label>
    <div className="flex items-center gap-2">
      <Input
        id="short-url"
        readOnly
        value={shortUrl}
        // className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
      />
      <Button
        type="button"
        variant="secondary"
        className="flex-shrink-0"
        onClick={() => {
          navigator.clipboard.writeText(shortUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        <Copy className="mr-2 h-4 w-4" />
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  </div>
)}
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-600/90"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LinkIcon className="mr-2 h-4 w-4" />
          )}
          Shorten URL
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UrlForm;
