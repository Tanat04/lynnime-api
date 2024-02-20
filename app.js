const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

// MongoDB URI
const mongoURI =
  "mongodb+srv://user1:tY0dEaRzybcuTFI3@cluster0.e6jfgzx.mongodb.net/myAnimeDatabase";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a schema for your data
// Ensure the schema matches the structure of your document.
const AnimeSchema = new mongoose.Schema({
  anime_id: Number,
  name: String,
  genre: [String],
  type: String,
  episodes: Number,
  rating: Number,
  members: Number,
});

// Create a model based on the schema
// The first parameter should match the name of your collection.
// Mongoose automatically looks for the plural, lowercase version of your model name.
// If your collection name is exactly "test" and doesn't follow the naming convention,
// you need to explicitly specify the collection name as the third argument.
const Anime = mongoose.model("Anime", AnimeSchema, "anime"); // Explicitly specify 'test' collection

// Routes
app.get("/anime", async (req, res) => {
  try {
    const anime = await Anime.find();
    res.json(anime);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/anime/:id", async (req, res) => {
  try {
    const anime = await Anime.findOne({ anime_id: req.params.id });
    if (anime) {
      res.json(anime);
    } else {
      res.status(404).send("Anime not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
