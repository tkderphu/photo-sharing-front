const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const AuthRouter = require("./routes/AuthRouter");

dbConnect();

app.use(cors());
app.use(express.json());
app.use("/api", UserRouter);
app.use("/api", PhotoRouter);
app.use("/api", AuthRouter)


app.listen(8081, () => {
  console.log("server listening on port 8081");
});
