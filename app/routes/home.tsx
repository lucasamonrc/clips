import { Button } from "~/components/ui/button";
import { Loader2 } from "lucide-react";
import type { Route } from "./+types/home";
import { data, Link, redirect } from "react-router";
import { getSession } from "~/lib/sessions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  if (!user) throw redirect("/login");
  return data(user);
}

export default function Home() {
  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-start justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Clips</h1>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="link">
              {/* <Loader2 className="animate-spin" /> */}
              Sync
            </Button>
            <Button size="sm" variant="link" asChild>
              <Link to="/logout">Logout</Link>
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          hi there
        </div>
      </main>
    </div>
  );
}
