const users = require("../models/users");

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await users.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = deleteUser;
