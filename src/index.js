const express = require("express");

const app = express();
app.use(express.json());

const cors = require("cors");
const rootRouter = require("./routes/rootRoute");
app.use(cors());

// tạo localhost:8080
app.listen(8000);

app.use("/api", rootRouter);