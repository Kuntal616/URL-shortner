import { Button } from "@/components/ui/button";
import UrlForm from "@/components/UrlForm";
import { useNavigate } from "@tanstack/react-router";



export default function HomePage() {
const navigate = useNavigate();
  return (
    
    <>
      <section className="w-full bg-gradient-to-b from-emerald-50 to-background">
        <div className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-2 md:gap-12 md:py-24">
          <div className="flex flex-col justify-center gap-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Short links, big impact.
            </h1>
            <p className="text-lg text-muted-foreground">
              Create branded short URLs, track clicks, and share anywhere. Beautiful, fast, and privacy-friendly.
            </p>
            <div className="max-w-xl">
              <UrlForm compact={true} />
              <p className="mt-2 text-xs text-muted-foreground">
                By shortening you agree to our Terms and Privacy.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => navigate({ to: "/auth?mode=register" })} className="bg-emerald-600 hover:bg-emerald-600/90">
                Get started
              </Button>
              <Button variant="outline" onClick={() => navigate({ to: "/dashboard" })}>
                Open Dashboard
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="Dashboard preview"
              width={800}
              height={600}
              className="mx-auto rounded-xl border shadow-sm"
            />
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: "Fast & reliable", desc: "Create short links instantly with high availability." },
            { title: "Analytics", desc: "Track clicks, referrers, and top performing links." },
            { title: "Privacy-first", desc: "We only store what you need—no invasive tracking." },
          ].map((f) => (
            <div key={f.title} className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Ready to shorten your first link?</h2>
          <p className="mt-2 text-muted-foreground">
            Sign up for free and create your first short URL in seconds.
          </p>
          <div className="mt-6 flex justify-center">
            <Button onClick={() => navigate({ to: "/auth?mode=register" })} className="bg-emerald-600 hover:bg-emerald-600/90">
              Create account
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
