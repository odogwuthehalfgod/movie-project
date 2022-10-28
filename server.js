const express = require("express");
// const dotenv = require("dotenv");
// const morgan = require("morgan");
// const exphbs = require("express-handlebars");
// const connectDB = require("./mongooseDB.js");
// dotenv.config({ path: "./config/config.env" });

// connectDB();
// const path = require("path");

const app = express();

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));

// app.set("view engine", ".hbs");

// app.use("/", require("./main"));

const PORT = process.env.PORT || 5000;

app.get("/", function (req, res) {
  res.type("text/plain");

  res.end("Node for beginners");
});

app.listen(PORT, function () {
  console.log(`server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});
// app.set("view engine", "hbs");
// console.log(folderFile);

// app.get("/", function (req, res) {
//   res.render("home", {
//     name: "Nnaemeka",
//   });
// });
