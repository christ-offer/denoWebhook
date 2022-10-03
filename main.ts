import {
  app,
  pullRequest,
} from "https://deno.land/x/ghook@0.13.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { SmallBot } from "https://deno.land/x/smallbot_matrix@0.1.2/mod.ts?s=SmallBot";

const env = {
  githubSecret: Deno.env.get('GITHUB_KEY'),
}

// Starts ghook and send message on hooks
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

// Starts the matrix bot
const client = new SmallBot({
  accessToken: "your token",
  homeserverUrl: "https://matrix.org/",
  // This part is not needed for the functionality of the bot, but it wont run withouth some eventhandler.
  eventHandler: async (client, roomId, event) => {
      if (event.sender !== client.ownUserId) {
          const profile = await client.getUserProfile(event.sender);
      }
  }
});

await client.start();