const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Telegraf } = require('telegraf')
const http = require("http");
const socketManager = require('./helpers/socketEmits');
const { Bot } = require("grammy");

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot("7092832216:AAE9ttIVFBt98FJb9QvdH2t1By38UmHoHGE"); // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

const appLink = "https://app.cdtask.uz/"
const driver = "https://app.cdtask.uz/driver"

// Handle the /start command.
bot.command("start", (ctx) =>     ctx.reply('Welcome', { reply_markup: { inline_keyboard: [[{text: '📲 Dasturni oching ', web_app: {url:appLink}}],] }})
);
// Handle other messages.
bot.command("driver", (ctx) => ctx.reply('Welcome', { reply_markup: { inline_keyboard: [[{text: '📲 Haydovchi ', web_app: {url:driver}}]] }}));

// Now that you specified how to handle messages, you can start your bot.

// Start the bot.
bot.start();


// api routes
mongoose.pluralize(null);

const userRoutes = require("./routes/staffRoutes");
const driverRoutes = require("./routes/driverRoutes");

const orderRoutes = require("./routes/ordersRoutes");
dotenv.config();

const app = express();
const server = http.createServer(app);
socketManager.initialize(server);




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
async function clearCollections() {
  const collections = mongoose.connection.collections;

  await Promise.all(Object.values(collections).map((collection) =>
    collection.deleteMany({}) 
    // an empty mongodb selector object ({}) must be passed as the filter argument
  ));
  console.log("All collections cleared");
}




// Enabe graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
// bot.launch()
module.exports = app;
