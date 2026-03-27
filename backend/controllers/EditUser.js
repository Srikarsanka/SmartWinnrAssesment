const users = require("../models/users");

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {  role, isActive } = req.body;
        const updatedUser = await users.findByIdAndUpdate(id, { $set: { role, isActive } }, { new: true });
        

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = editUser;
