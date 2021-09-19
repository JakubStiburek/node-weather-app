const express = require("express");
const path = require("path");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");
// const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
// const partialsDirPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
// hbs.registerPartials(partialsDirPath);

// Setup static dir to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.send("index.html");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("index", {
    title: "Help",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  !address
    ? res.send({ error: "You must provide an address." })
    : geocode.geocode(address, (error, { latitude, longitude } = {}) => {
        error
          ? res.send({ error })
          : forecast.forecast(
              latitude,
              longitude,
              (error, { description, temperature, feelslike } = {}) => {
                error
                  ? res.send({ error })
                  : res.send({
                      address,
                      description,
                      temperature,
                      feelslike,
                    });
              }
            );
      });
});

app.get("/help/*", (req, res) => {
  res.send("this ain't what you're looking for");
});

app.get("*", (req, res) => {
  res.send("404");
});

// Setup port number
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
