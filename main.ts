import {
  app,
 //makeLarkSender,
  pullRequest,
} from "https://deno.land/x/ghook@0.13.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { SmallBot } from "https://deno.land/x/smallbot_matrix@0.1.2/mod.ts?s=SmallBot";

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
const env = {
  githubSecret: Deno.env.get('GITHUB_KEY'),
}

app("/webhook", { secret: env.githubSecret })
  // deno-lint-ignore no-explicit-any
  .on("pull_request", (e : any) => {
    console.log('a pull-request', e)
    const data = pullRequest(e)
    client.sendMessage("!phxFsseDFtRienTcza:matrix.org", "m.text", pullRequest(e))
  })
  // deno-lint-ignore no-explicit-any
  .on("push", (e : any) => {
    console.log("push", e)
    client.sendMessage("!phxFsseDFtRienTcza:matrix.org", "m.text", e.ref)
  })



// think this is posting the pulls to this url
//const send = makeLarkSender("https://test-bot-bot.fly.dev/hook"); // add hook
const client = new SmallBot({
  accessToken: "your token",
  homeserverUrl: "https://matrix.org/",
  eventHandler: async (client, roomId, event) => {
      if (event.sender !== client.ownUserId) {
          const profile = await client.getUserProfile(event.sender);
      }
  }
});

await client.start();




  
  
