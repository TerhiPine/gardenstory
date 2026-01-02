import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Entry from "./models/entry.js";


dotenv.config({ path: "./.env" }); // 🔴 use force here Lue .env

const app = express();
app.use(cors());
app.use(express.json());

// Testireitti
app.get("/", (req, res) => {
  res.send("Backend + MongoDB toimii 🌱");
});

// Portti ja URI
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI ei ole määritelty! Tarkista .env tiedosto");
  process.exit(1);
}

// Käynnistä serveri vasta kun MongoDB yhdistyy
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB yhdistetty ✅");

    app.listen(PORT, () => {
      console.log(`Serveri käynnissä portissa ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB-yhteys epäonnistui ❌");
    console.error(err); // 🔴 Näytetään oikea virhe konsolissa
  }
};
// API reitit CRUD operaatioille


// GET: hae kaikki merkinnät
app.get("/entries", async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: hae yksittäinen merkintä id:n perusteella
app.get("/entries/:id", async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: "Merkintää ei löytynyt" });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST: lisää uusi merkintä
app.post("/entries", async (req, res) => {
  try {
    const { title, description, date, tags } = req.body;
    const newEntry = new Entry({ title, description, date, tags });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH: päivitä olemassa oleva merkintä id:n perusteella
app.patch("/entries/:id", async (req, res) => {
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEntry) return res.status(404).json({ error: "Merkintää ei löytynyt" });
    res.json(updatedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: poista merkintä id:n perusteella
app.delete("/entries/:id", async (req, res) => {
  try {
    const deletedEntry = await Entry.findByIdAndDelete(req.params.id);
    if (!deletedEntry) return res.status(404).json({ error: "Merkintää ei löytynyt" });
    res.json({ message: "Merkintä poistettu", deletedEntry });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


startServer();

