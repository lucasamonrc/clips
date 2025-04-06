import { Button } from "~/components/ui/button";
import { Loader2 } from "lucide-react";
import type { Route } from "./+types/home";
import { data, Link, redirect, useLoaderData, useFetcher } from "react-router";
import { getSession } from "~/lib/sessions";
import { clips } from "~/db/schema";
import { db } from "~/db";
import { Clip } from "~/components/clip";

export function meta({}: Route.MetaArgs) {
  return [{ title: "My Clips" }, { name: "description", content: "My Clips" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  if (!user) throw redirect("/login");

  const myClips = await db.select().from(clips);

  return data({ clips: myClips, user });
}

export default function Home() {
  const { clips } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-start justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Clips</h1>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="link"
              disabled={fetcher.state !== "idle"}
              onClick={() => {
                fetcher.load("/api/sync");
              }}
            >
              {fetcher.state !== "idle" && <Loader2 className="animate-spin" />}
              Sync
            </Button>
            <Button size="sm" variant="link" asChild>
              <Link to="/logout">Logout</Link>
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-2 gap-4 content-stretch">
          {clips.map((clip) => (
            <Clip key={clip.id} clip={clip} />
          ))}
        </div>
      </main>
    </div>
  );
}
