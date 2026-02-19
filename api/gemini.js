export default async function handler(req, res) {
    try {
        const response = await fetch("https://gemini.googleapis.com/v1beta2/models/gemini-1.5-pro-preview:generateContent", {
            headers: {
                Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    }