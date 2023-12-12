let express = require("express");
let app = express();
const { Database } = require("quickmongo");

// Serve static files (including SVGs) from the "public" directory
app.use(express.static('public'));

// Start your Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// DB 1 connect to mongoDB
require("dotenv").config();
const db = new Database(process.env.MONGODB_URL);
db.on("ready", () => {
  console.log("Connected to the database");
});

db.connect();

app.use(express.json());
let inputTracker = [];

// Route to submit avatar data to the database
app.post("/submitImage", (req, res) => {
  console.log(req.body);

  // Extract the image and name from the request body
  const { image, name } = req.body;

  // Create an object to store the image and name
  const avatarData = {
    image,
    name,
  };

  // Store the avatar data in the database
  db.push("avatarResponse", avatarData)
    .then(() => {
      console.log("Avatar data saved to the database");
      res.json({ message: "Avatar data saved successfully" });
    })
    .catch((error) => {
      console.error("Error saving avatar data:", error);
      res.status(500).json({ error: "Failed to save avatar data" });
    });
});

// Route to get all word inputs (if needed)
app.get("/getResponse", (req, res) => {
  console.log("get response");

  // Fetch avatar data from the DB
  db.get("avatarResponse").then((avatarData) => {
    let obj = { data: avatarData };
    res.json(obj);
  });
});
