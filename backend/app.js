const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
const http = require("http");

// api routes
mongoose.pluralize(null);

const userRoutes = require("./routes/staffRoutes");
const driverRoutes = require("./routes/driverRoutes");

const orderRoutes = require("./routes/ordersRoutes");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});



app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept-Type"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


async function main() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

main().catch((err) => console.log(err));
const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`MongoDB Connection Error: ${err}`);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/drivers", driverRoutes);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// const appLink = "https://bb1kzrrf-80.asse.devtunnels.ms/"
// const bot = new Telegraf("7092832216:AAE9ttIVFBt98FJb9QvdH2t1By38UmHoHGE")
// bot.start((ctx) => {
//     ctx.reply('Welcome', { reply_markup: { inline_keyboard: [[{text: '📲 Open web app ', web_app: {url:appLink}}]] }})
// });


// Enabe graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
// bot.launch()
module.exports = app;
