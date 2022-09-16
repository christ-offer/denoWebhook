import {
  app,
 //makeLarkSender,
  pullRequest,
} from "https://deno.land/x/ghook@0.13.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

function makeLarkSender(url: string) {
  return (message?: string) => {
    if (!message) return;
    console.log(message)
    return fetch(url, {
      method: "POST",
      body: message
    });
  };
}



// think this is posting the pulls to this url
const send = makeLarkSender("https://test-bot-bot.fly.dev/hook"); // add hook

const env = {
  githubSecret: Deno.env.get('GITHUB_KEY'),
}

app("/webhook", { secret: env.githubSecret })
  // deno-lint-ignore no-explicit-any
  .on("pull_request", (e : any) => {
    console.log('a pull-request')
    send(pullRequest((e)))
  })
  // deno-lint-ignore no-explicit-any
  .on("push", (e : any) => {
    console.log("push")
    send(e)
  })


  
  