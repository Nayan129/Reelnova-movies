import userModel from "../models/auth.model.js";

// Get all users

async function getAllUsers(req, res) {
  try {
    const adminId = req.user.id;

    const users = await userModel
      // those who not equal to admin only fetch in users
      .find({ _id: { $ne: adminId } })
      .select("-password")
      .lean();

    res.status(200).json({
      message: "Users fetched successfully",
      total: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// Ban user

async function banUser(req, res) {
  try {
    const userId = req.params.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admins cannot ban other admins",
      });
    }

    user.isBanned = true;
    await user.save();

    res.status(200).json({
      message: "User banned successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// Delete user

async function deleteUser(req, res) {
  try {
    const adminId = req.user.id;
    const userId = req.params.id;

    // prevent admin from deleting themselves
    if (adminId === userId) {
      return res.status(400).json({
        message: "Admin cannot delete their own account",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // also not able to delete other admins
    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admins cannot delete other admins",
      });
    }

    await userModel.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default {
  getAllUsers,
  banUser,
  deleteUser,
};
