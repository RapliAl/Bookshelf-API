import express from "express";
import router from "./router.js";

const app = express();
const port = 9000;
const hostname = "localhost";

app.use(express.json());
app.use("/", router);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
