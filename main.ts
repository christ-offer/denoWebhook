import {
  app,
  makeLarkSender,
  pullRequest,
  pullRequestReview,
} from "https://deno.land/x/ghook@0.13.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { SmallBot } from "https://deno.land/x/smallbot_matrix@0.1.2/mod.ts";


// think this is posting the pulls to this url
const send = makeLarkSender("https://github-matrix.fly.dev/hook");

const env = {
  githubSecret: Deno.env.get('GITHUB_KEY'),
  matrixKey: Deno.env.get('MATRIX_KEY')
}
const client = new SmallBot({
  accessToken: "syt_dGVzdGJvdG51bWVyb25l_QLPrwowZITZzzChegZtJ_1mweQC",
  homeserverUrl: "https://matrix.org/",
  eventHandler: async (client, roomId, event) => {
      if (event.sender !== client.ownUserId) {
          const profile = await client.getUserProfile(event.sender);
          await client.sendRoomNotice(roomId, profile.displayname + ", you said: <b>" + event.content.body + "</b>");
      }
  }
});

await client.start();

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
    client.sendRoomNotice("!phxFsseDFtRienTcza:matrix.org", "push")
  })
  