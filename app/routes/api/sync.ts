import { createHmac, timingSafeEqual } from "crypto";
import { notion } from "~/lib/notion";
import type { Route } from "./+types/sync";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { db } from "~/db";
import { clips } from "~/db/schema";

export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();

  const notionKey = request.headers.get("X-Notion-Signature");

  if (!notionKey) {
    return new Response("Unauthorized", { status: 401 });
  }

  const verificationToken = process.env.NOTION_VERIFICATION_TOKEN!;

  const calculatedSignature = `sha256=${createHmac("sha256", verificationToken)
    .update(JSON.stringify(body))
    .digest("hex")}`;

  const isTrustedPayload = timingSafeEqual(
    Buffer.from(calculatedSignature),
    Buffer.from(notionKey)
  );

  console.log("isTrustedPayload", isTrustedPayload);

  if (!isTrustedPayload) {
    return new Response("Unauthorized", { status: 401 });
  }

  proccess(body.entity.id);

  return new Response();
}

async function proccess(pageId: string) {
  const page = await notion.pages.retrieve({ page_id: pageId });
  const url = (page as any).properties.URL.url;

  const response = await fetch(url);
  const html = await response.text();

  const schema = z.object({
    title: z.string(),
    summary: z.string().max(280),
    labels: z.array(z.string()),
  });

  // Feed this to the LLM
  const result = await generateObject({
    model: openai("gpt-4o-mini"),
    schema,
    prompt: `Generate a summary and labels for the following blog post/web page:
    
    <POST>
    ${html}
    </POST>

    The summary should be a 1-2 sentences and only generate 1-2 labels that are relevant to the page. Also include the title of the page in the results. Never include commas (,) in the labels.
    `,
  });

  // insert into the database
  await db.insert(clips).values({
    url,
    title: result.object.title,
    description: result.object.summary,
    tags: result.object.labels.join(",").toLowerCase(),
  });
}
