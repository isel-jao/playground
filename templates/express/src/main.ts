import Express from "express";
import { createServer } from "http";

const port = process.env.PORT || 3000;

const app = Express();
app.use(Express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", upTime: process.uptime(), timestamp: Date.now() });
});

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
