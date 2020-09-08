import express from "express";
import monk from "monk";

const app = express();
const port = process.env.PORT || 3000; // default port to listen

const router = express.Router();

app.use("/api/v1", router);

const mongoUser = process.env.MONGO_DB_USERNAME || `admin`;
const mongoPassword = process.env.MONGO_DB_PASSWORD || `admin-password`;
const mongoHost = process.env.MONGO_DB_HOST || `localhost`;
const mongoPort = process.env.MONGO_DB_PORT || `27017`;
const db = monk(`${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}`);
console.log(`mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/database`);
const users = db.get("users");

router.get("/", async (req, res) => {
  console.log("request");
  await users.insert({ name: "Loki" });
  const user = await users.find({ name: "Loki" });
  console.log(user);
  res.json(user);
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
