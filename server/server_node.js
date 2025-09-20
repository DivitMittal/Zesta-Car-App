import { WebSocketServer } from "ws";
import fs from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";

const run = promisify(exec);

const wss = new WebSocketServer({ port: 2121 });

wss.on("connection", (ws) => {
  ws.on("message", async (msg) => {
    try {
      await fs.writeFile("./uploads/image_base64.txt", msg);
      const { stdout, stderr } = await run("pipenv run python3 ./recog_exec.py");
      if (stderr) console.log(stderr);
      const plate = (await fs.readFile("./result/output.txt", "utf8")).trim();
      ws.send(JSON.stringify({ success: true, licensePlate: plate }));
    } catch (err) {
      console.error(err);
      ws.send(JSON.stringify({ success: false, error: err.message }));
    }
  });
});
