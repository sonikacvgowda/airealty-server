const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

const Form = require("./models/Form");

// API Route
app.post("/api/submit", async (req, res) => {
  try {
    console.log("📥 Received data:", req.body);

    const newForm = new Form(req.body);
    await newForm.save();

    console.log("✅ Form saved to MongoDB");

    // Skip sending email for now
    res.status(200).send("Form submitted successfully!");
  } catch (err) {
    console.error("❌ Backend Error:", err);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
