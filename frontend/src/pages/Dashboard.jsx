import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UrlForm from "@/components/UrlForm";
import LinkTable from "@/components/LinkTable";
import { BarChart3, Link2, MousePointerClick, Loader2, RefreshCw } from "lucide-react";
import { useSelector } from "react-redux";
import { getUserUrls } from "@/api/user.api";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideBar from "@/components/SideBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useSelector((state) => state.auth);
 const queryClient = useQueryClient();



  const { data:urls =[],
    isLoading: loading,
    error,
    refetch
  } = useQuery ({
    queryKey:["userUrls"],
    queryFn: getUserUrls,
    enabled: !!user,
    staleTime:1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  // Calculate statistics from URLs
  const stats = React.useMemo(() => {
    if(!Array.isArray(urls) || urls.length === 0) {
      return {
        totalLinks: 0,
        totalClicks: 0,
        topLink: null,
        mostRecent: null,
      };
    }
    const totalLinks = urls.length;
    const totalClicks = urls.reduce(
      (sum, url) => sum + (url.totalClicks || 0),
      0
    );
    const topLink = urls.reduce(
      (max, url) =>
        (url.totalClicks || 0) > (max.totalClicks || 0) ? url : max,
      urls[0] || null
    );
    
    const mostRecent = [...urls].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];

    return {
      totalLinks,
      totalClicks,
      topLink,
      mostRecent,
    };
  }, [urls]);

  // Callback to refresh URLs when new URL is created
  const handleUrlCreated = (newUrl) => {
    queryClient.setQueriesData(["userUrls"],(oldData)=>{
      const updatedData = [newUrl, ...(oldData || [])];
      return updatedData;
    })
    // Optional: Invalidate to refetch from server
    // queryClient.invalidateQueries({ queryKey: ["userUrls"] });
  };

 // Handle URLs update from LinkTable
  const handleUrlsUpdate = (updatedUrls) => {
    queryClient.setQueryData(["userUrls"], updatedUrls);
  };  

  if (loading) {
    return (
      <SidebarProvider>
        <SideBar />
        <SidebarInset>
          <div className="container mx-auto flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading dashboard...</span>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
        <SidebarProvider>
      <SideBar />
      <SidebarInset>
        {/* Header with sidebar trigger */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>

        {/* Main content */}
        <div className="flex-1 space-y-4 p-4 md:p-8">
          {/* Welcome Section */}
          <div className="mb-6" id="overview">
            <h1 className="text-3xl font-bold">Welcome back, {user?.user?.name || user?.user?.email}!</h1>
            <p className="text-muted-foreground">Manage your shortened URLs and track their performance.</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Statistics Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Total Links"
              value={stats.totalLinks}
              icon={<Link2 className="h-5 w-5 text-emerald-600" />}
            />
            <StatCard
              title="Total Clicks"
              value={stats.totalClicks}
              icon={<MousePointerClick className="h-5 w-5 text-emerald-600" />}
            />
            <StatCard
              title="Analytics Ready"
              value="Basic"
              icon={<BarChart3 className="h-5 w-5 text-emerald-600" />}
            />
          </div>

          {/* URL Form and Analytics */}
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <UrlForm onUrlCreated={handleUrlCreated} />
            <Card id="analytics">
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Track your link performance and get insights into your audience.
                </p>
                <div className="space-y-4">
                  <div className="rounded-md border p-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Top performing link:</span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {stats.topLink?.shortId ? `/${stats.topLink.shortId}` : "—"}
                      </span>
                    </div>
                    {stats.topLink && (
                      <div className="flex justify-between mt-2">
                        <span className="text-muted-foreground">Clicks:</span>
                        <span className="font-semibold">{stats.topLink.totalClicks || 0}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="rounded-md border p-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Most recent link:</span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {stats.mostRecent?.shortId ? `/${stats.mostRecent.shortId}` : "—"}
                      </span>
                    </div>
                    {stats.mostRecent && (
                      <div className="flex justify-between mt-2">
                        <span className="text-muted-foreground">Created:</span>
                        <span className="text-xs">
                          {new Date(stats.mostRecent.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* URLs Table */}
          <div id="links">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>Your URLs ({urls.length})</CardTitle>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => refetch()}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
        Refresh
      </Button>
    </CardHeader>
              <CardContent>
                {urls.length === 0 ? (
                  <div className="text-center py-8">
                    <Link2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No URLs created yet.</p>
                    <p className="text-sm text-muted-foreground">Create your first shortened URL above!</p>
                  </div>
                ) : (
                  <LinkTable urls={urls} onUrlsUpdate={handleUrlsUpdate} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Settings Section */}
          {/* <div id="settings" className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-2">Settings</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Customize your URL shortening experience.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Custom Domains</h3>
                <p className="text-sm text-muted-foreground">Add your own domain for branded links.</p>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                  Configure →
                </button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Link Expiration</h3>
                <p className="text-sm text-muted-foreground">Set automatic expiration for your links.</p>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                  Configure →
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
