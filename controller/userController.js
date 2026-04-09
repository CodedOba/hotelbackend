import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { fullName, email, role, password, comfirmPassword } = req.body;

    if (!fullName || !email || !role || !password || !comfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "imput empty",
      });
    }

    if (password !== comfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password does not match",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user alraedy exist",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userData = await User.create({ fullName, email, role, passwordHash });

    return res.status(201).json({
      success: true,
      message: "registration successful",
      data: {
        id: userData.id,
        fullName: userData.fullName,
        email: userData.email,
        role: userData.role,
        isVerified: userData.isVerified,
        createdAt: userData.createdAt,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(409).json({
      success: false,
      message: "server error",
    });
  }
};
export { register };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "imput empty",
      });
    }

    const user = await User.findOne({ email });

    // ✅ FIX: check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "email or password is incorrect",
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCompare) {
      return res.status(401).json({
        success: false,
        message: "email or password is incorrect",
      });
    }

    const accessToken = await jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESSTOKENTKEY,
      { expiresIn: "30m" },
    );

    const refreshToken = await jwt.sign(
      { id: user._id, role: user.role },
      process.env.REFRESHTOKENKEY,
      { expiresIn: "20d" },
    );

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "login successfully",
      data: {
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      message: "server error",
    });
  }
};
export { login };

const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "No refresh token",
    });
  }

  const user = await User.findOne({ refreshToken });

  if (!user)
    return res.status(403).json({
      message: "Invalid refresh token",
    });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESHTOKENKEY);

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.ACCESSTOKENTKEY, // ✅ FIXED (was wrong before)
      { expiresIn: "15m" },
    );

    res.json({
      accessToken: newAccessToken,
    });

  } catch (error) {
    console.log(error);
    
    res.status(403).json({
      success: false,
      message: "Token expired or invalid",
    });
  }
};

export { refreshAccessToken };

const logout = async (req, res) => {

  const { refreshToken } = req.body;

  // remove token from DB
  await User.findOneAndUpdate(
    { refreshToken },
    { refreshToken: null }
  );

  res.json({ message: "Logged out successfully" });
};

export { logout };