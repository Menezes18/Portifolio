// server/index.js
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";  // se Node ≥ 18, não precisa instalar

dotenv.config();
const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Falta message" });

  try {
    const hf = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: message }),
      }
    );
    if (!hf.ok) {
      console.error("HF error:", await hf.text());
      return res.status(500).json({ error: "Erro na HF API" });
    }
    const data = await hf.json();
    // data[0].generated_text ou data.generated_text
    const gen = Array.isArray(data) ? data[0].generated_text : data.generated_text;
    const reply = gen.replace(message, "").trim();
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server rodando em http://localhost:${PORT}`));
