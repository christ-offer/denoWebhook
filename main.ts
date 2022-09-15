import {
  app,
  makeLarkSender,
  pullRequest,
  pullRequestReview,
} from "https://deno.land/x/ghook@0.13.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const send = makeLarkSender("localhost:3000");

const env = {
  githubSecret: Deno.env.get('GITHUB_KEY'),
}

app("/webhook", { secret: env.githubSecret })
  // deno-lint-ignore no-explicit-any
  .on("pull_request", (e : any) => send(pullRequest(e)))
  // deno-lint-ignore no-explicit-any
  .on("pull_request_review", (e : any) => send(pullRequestReview(e)));

