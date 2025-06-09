const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({extended:false}))
d
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup"); 
});

app.post("/signup", async (req, res) => {
    try {
      const data = {
        name: req.body.name,
        password: req.body.password
      };
      await collection.insertMany([data]);
      res.render("home");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error occurred");
    }
  });


  app.post("/login", async (req, res) => {
    try {
      const check = await collection.findOne({ name: req.body.name });
      if (check && check.password === req.body.password) {
        res.render("home");
      } else {
        res.render("login", { error: "Wrong Password" });
      }
    } catch (err) {
      res.render("login", { error: "Wrong Details" });
    }
  });
  

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
