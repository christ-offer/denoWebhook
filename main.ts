import {
  app,
  makeLarkSender,
  pullRequest,
  pullRequestReview,
} from "https://deno.land/x/ghook@0.13.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";



// think this is posting the pulls to this url
const send = makeLarkSender("https://test-bot-bot.fly.dev/hook");

const env = {
  githubSecret: Deno.env.get('GITHUB_KEY'),
}

app("/webhook", { secret: env.githubSecret })
  // deno-lint-ignore no-explicit-any
  .on("pull_request", (e : any) => {
    console.log('a pull-request', e)
    send(pullRequest((e)))
  })
  // deno-lint-ignore no-explicit-any
  .on("pull_request_review", (e : any) => console.log(e))
  .on("push", (e : any) => {
    console.log("push", e)
    send(e)
  })

  
  
  
  