const express = require("express");
const cors = require("cors");
const path = require("path");
const { PORT } = require("./config/server");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "./uploads")));
// app.use(require("./middlewares/auth").AUTH);
app.use("/", require("./routers/routers"));

app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`));
