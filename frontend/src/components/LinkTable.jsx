import { Copy, CopyCheck, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { deleteUserUrl } from "@/api/user.api";
import { toast } from "sonner";

const LinkTable = ({ urls, onUrlsUpdate }) => {
  const [copiedId, setCopiedId] = useState(null);
   const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDeleteConfirm = async () => {
  try {
    const result = await deleteUserUrl(deleteTarget);
    
    // If successful, remove from local state
    if (result.success || result.message === 'URL deleted successfully') {
      const updated = urls.filter((url) => url._id !== deleteTarget);// change to shortId later with backend
      onUrlsUpdate(updated);
      setDeleteTarget(null);
      
      // Optional: Show success message
      toast.success("URL deleted successfully!");
    }
  } catch (error) {
    console.error("Error deleting link:", error);
    toast.error("Failed to delete URL. Please try again.");
    setDeleteTarget(null);
  }
};

  const handleCopy = (url, id) => {
    const fullShortUrl = `http://localhost:3000/${url}`;
    navigator.clipboard.writeText(fullShortUrl);
    setCopiedId(id);

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const formatLastVisited = (lastVisited) => {
    if (!lastVisited) {
      return <span className="text-gray-400 text-xs">Never visited</span>;
    }

    const date = new Date(lastVisited);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return (
        <span className="text-green-600 text-xs font-medium">Just now</span>
      );
    } else if (diffInMinutes < 60) {
      return (
        <span className="text-green-600 text-xs">{diffInMinutes}m ago</span>
      );
    } else if (diffInHours < 24) {
      return <span className="text-blue-600 text-xs">{diffInHours}h ago</span>;
    } else if (diffInDays < 7) {
      return <span className="text-gray-600 text-xs">{diffInDays}d ago</span>;
    } else {
      return (
        <span className="text-gray-600 text-xs">
          {date.toLocaleDateString()}
        </span>
      );
    }
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ShortUrl</TableHead>
            <TableHead>Orginal Url</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Last Visited</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urls.map((url) => (
            <TableRow key={url.shortId}>
              {/* shortId */}
              <TableCell>/{url.shortId}</TableCell>
              {/* originalUrl */}
              <TableCell className="truncate max-w-xs">
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {url.originalUrl}
                </a>
              </TableCell>
              {/* Clicks */}
              <TableCell className="text-center">{url.totalClicks || 0}</TableCell>
              {/* Last Vissited */}
              <TableCell className="text-center">{formatLastVisited(url.lastVisited)}</TableCell>
              {/* Created At */}
              <TableCell>
                {new Date(url.createdAt).toLocaleDateString()}
              </TableCell>
              {/* Actions */}
              <TableCell className="text-center space-x-2">
                {/* Copy Button */}
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleCopy(url.shortId, url._id)}
                  disabled={copiedId === url._id}
                  className={`text-white transition-colors duration-200 ${
                    copiedId === url._id
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {copiedId === url._id ? (
                    <CopyCheck className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>

               
               {/* Delete button */}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setDeleteTarget(url._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

       {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Link</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this link? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LinkTable;
