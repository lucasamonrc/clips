import { getSession } from "~/lib/sessions";

import { redirect } from "react-router";
import { destroySession } from "~/lib/sessions";
import type { Route } from "./+types/logout";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
