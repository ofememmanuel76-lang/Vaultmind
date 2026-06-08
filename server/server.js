const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3001;
const ONESHOT_EXECUTE_URL = `https://api.1shotapi.com/v0/methods/${process.env.ONESHOT_METHOD_ID}/execute`;

async function getOneShotToken() {
  const response = await fetch("https://api.1shotapi.com/v0/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: process.env.ONESHOT_API_KEY,
      client_secret: process.env.ONESHOT_API_SECRET,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data && typeof data === "object" ? JSON.stringify(data) : response.statusText;
    throw new Error(`1Shot token request failed: ${message}`);
  }

  return data.access_token;
}

const allowedOrigins = [
  'http://127.0.0.1:5501',
  'http://localhost:5501',
  'https://quiet-moxie-98dcf2.netlify.app'
];

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    credentials: true
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "VaultMind server running" });
});

app.post("/api/interpret", async (req, res) => {
  const { goal } = req.body;

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                'You are VaultMind. Respond ONLY in this exact JSON format: {"trigger": "short phrase", "assets": "X to Y", "riskLevel": "Low or Medium or High", "execution": "short phrase"}',
            },
            { role: "user", content: goal },
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/price", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.kraken.com/0/public/Ticker?pair=ETHUSD"
    );
    const data = await response.json();
    const price = parseFloat(data.result.XETHZUSD.c[0]);
    res.json({ ethereum: { usd: price } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/execute", async (req, res) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({
        error: "Missing required field: walletAddress is required.",
      });
    }

    if (
      !process.env.ONESHOT_API_KEY ||
      !process.env.ONESHOT_API_SECRET ||
      !process.env.ONESHOT_METHOD_ID
    ) {
      return res.status(500).json({
        error:
          "Missing 1Shot API credentials. Set ONESHOT_API_KEY, ONESHOT_API_SECRET, and ONESHOT_METHOD_ID in your .env file.",
      });
    }

    console.log('Starting execution for wallet:', walletAddress);
    const token = await getOneShotToken();
    console.log('Token received:', token ? 'Yes' : 'No');

    const response = await fetch(ONESHOT_EXECUTE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        params: {
          amountOutMin: "0",
          path: [
            "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
            "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
          ],
          to: walletAddress,
          deadline: String(Math.floor(Date.now() / 1000) + 300),
        },
      }),
    });

    const data = await response.json();
    console.log('1Shot status:', response.status);
    console.log('1Shot response:', JSON.stringify(data));

    if (!response.ok) {
      return res.status(response.status).json({
        error: "1Shot API request failed.",
        details: data,
      });
    }

    return res.json(data);
  } catch (error) {
    console.log('Error details:', error.message);
    return res.status(500).json({
      error: "Unable to execute request through 1Shot API.",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`VaultMind backend running on port ${PORT}`);
});
