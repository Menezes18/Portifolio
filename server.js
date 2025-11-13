import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static('dist'));

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const hfRes = await fetch(
      'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {
            text: [
              { role: 'system', content: 'Você é o assistente do portfólio do Gustavo. Explique seções e ofereça contatos.' },
              { role: 'user', content: message }
            ]
          }
        })
      }
    );
    const data = await hfRes.json();
    res.json({ reply: data.generated_text || 'Desculpe, não entendi.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ reply: 'Erro no servidor.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));