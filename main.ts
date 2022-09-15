import {
  app,
  makeLarkSender,
  pullRequest,
  pullRequestReview,
} from "https://deno.land/x/ghook@0.13.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { serve } from "https://deno.land/std@0.145.0/http/server.ts";

const send = makeLarkSender("");

const env = {
  githubSecret: Deno.env.get('GITHUB_KEY'),
}

app("/webhook", { secret: env.githubSecret })
  // deno-lint-ignore no-explicit-any
  .on("pull_request", (e : any) => send(pullRequest(e)))
  // deno-lint-ignore no-explicit-any
  .on("pull_request_review", (e : any) => send(pullRequestReview(e)));



  serve((req: Request) => new Response("Hello World"));
  