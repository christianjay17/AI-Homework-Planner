export default async function handler(req, res) {
    if (req.method !== "POST") {
  return res.status(405).json({ error: "Method not allowed" });
}

    try {
        const { prompt } = req.body; || { prompt: "Hello Gemini!" }

        const response = await fetch("https://gemini.googleapis.com/v1beta2/models/gemini-1.5-pro-preview:generateContent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
            }),
        });
        const data = await response.json();
        res.status(200).json({ result: data})

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: error.message });
    }
}