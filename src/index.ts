import express from 'express';
import "reflect-metadata";

const app = express();
const port = 3000;
app.get("/", (req: express.Request, res: express.Response) => {
  res.json({
    "ok": true
  });
});
app.listen(port, () => console.log(`ok, port = ${port}`));
