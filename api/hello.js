export default function handler(req, res) {
    res.status(200).json({
        message: process.env.SECRET_MESSAGE
    })
}