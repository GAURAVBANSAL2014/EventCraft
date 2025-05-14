import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { createAdmin } from "./utils/createAdmin.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()

await createAdmin()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
