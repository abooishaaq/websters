
import db from "./db"

export const login = (req, res) => {
	if (!req.body.username || !req.body.password)
		return res.status(400).json({ type: "error", message: "Invalid username or password." })
	db.collection("users").doc({})
}