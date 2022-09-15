import {
  app,
  makeLarkSender,
  pullRequest,
  pullRequestReview,
} from "https://deno.land/x/ghook@0.13.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";


// think this is posting the pulls to this url
const send = makeLarkSender("https://github-matrix.fly.dev/hook");

const env = {
  githubSecret: Deno.env.get('GITHUB_KEY'),
}

const url = "https://github-matrix.fly.dev/hook";
new Request(url, {
  method: "POST",
  body: new Uint8Array([1, 2, 3]),
});

app("/webhook", { secret: env.githubSecret })
  // deno-lint-ignore no-explicit-any
  .on("pull_request", (e : any) => {
    console.log('a pull-request')
    send(pullRequest(e))
  })
  // deno-lint-ignore no-explicit-any
  .on("pull_request_review", (e : any) => send(pullRequestReview(e)))
  .on("push", (e : any) => {
    console.log("push", e)
    const url = "https://github-matrix.fly.dev/hook";
    new Request(url, {
      method: "POST",
      body: e,
    });
  })