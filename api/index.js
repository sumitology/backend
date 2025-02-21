const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const user_id = "john_doe_17091999";
const email = "john@xyz.com";
const roll_number = "ABCD123";

// Root route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// POST /bfhl
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input" });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
    const highest_alphabet = alphabets.length ? [alphabets.sort((a, b) => b.localeCompare(a))[0]] : [];

    res.json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet
    });
  } catch (error) {
    res.status(500).json({ is_success: false, error: "Internal server error" });
  }
});

// GET /bfhl
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// ✅ Export for Vercel (NO `app.listen`)
module.exports = app;
