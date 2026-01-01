require("dotenv").config();
const express = require("express");
const http = require("http");
const connectDB = require("./config/database");
const initSocket = require("./config/socket");
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = http.createServer(app);

// Connecting Database
connectDB();

// Initializing Socket.IO
initSocket(server);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
