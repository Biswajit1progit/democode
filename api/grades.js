const fetch = require("node-fetch");

const HEADERS = {
  "Content-Type": "application/json",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  "Referer": "https://results.bput.ac.in/",
  "Origin": "https://results.bput.ac.in",
};

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { rollNo, semId, session } = req.body;
  if (!rollNo || !semId || !session)
    return res.status(400).json({ error: "rollNo, semId, session required" });

  try {
    const response = await fetch(
      `https://results.bput.ac.in/student-results-subjects-list?semid=${semId}&rollNo=${rollNo}&session=${encodeURIComponent(session)}`,
      { method: "POST", headers: HEADERS }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch grades" });
  }
};