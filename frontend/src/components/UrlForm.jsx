import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { Copy, LinkIcon, Loader2, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { useQueryClient } from "@tanstack/react-query";

const UrlForm = ({ compact,onUrlCreated }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [customShortId, setCustomShortId] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

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

    try {
      // Pass both url and customShortId to the API
      const result = await createShortUrl(url, customShortId);
      console.log("API Response:", result);
      if (result.success) {
        setShortUrl(result.data.shortURL);
        if (onUrlCreated) {
          onUrlCreated(result.data);
        }
        queryClient.invalidateQueries({ queryKey: ["userUrls"] });
        // Clear form after success
        setUrl("");
        setCustomShortId("");
        setLoading(false);
      } else {
        setError(result.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating short URL:", error);
      setError(error?.message || "Failed to create short URL. Please try again.");
      setLoading(false);
    }
  };
  const handleNew = () => {
    setUrl("");
    setCustomShortId("");
    setShortUrl("");
    setError("");
    setSubmitted(false);
    setCopied(false);
  };
  if (compact) {
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
       <Button
              type="button"
              variant="outline"
              onClick={handleNew}
              className="flex-shrink-0"
            >
              <Plus className="mr-2 h-4 w-4" />
              New
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
