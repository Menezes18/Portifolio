// src/pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { reply?: string; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Só POST permitido" });
  }

  const { message } = req.body as { message: string };
  if (!message) return res.status(400).json({ error: "Falta o message" });

  try {
    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",  // ou outro modelo que desejar
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: message })
      }
    );

    if (!hfRes.ok) {
      const err = await hfRes.text();
      console.error("HF error:", err);
      return res.status(500).json({ error: "Erro na HF API" });
    }

    const data = await hfRes.json();
    // a resposta costuma vir como um array de objetos gerados
    const generated = Array.isArray(data) ? data[0].generated_text : data.generated_text;
    // corta o prompt original fora, se necessário
    const reply = generated.replace(message, "").trim();

    return res.status(200).json({ reply });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
