const axios = require("axios"); 
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });
}

exports.githubAuth = async (req, res) => { 
  const { code } = req.query;

  try {
    const tokenRes = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { accept: "application/json" } }
    );

    const githubToken = tokenRes.data.access_token;

    const githubUser = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${githubToken}` },
    });

    const { id, login, avatar_url } = githubUser.data;

    let user = await User.findOne({ githubId: id });

    if (!user) {
      user = await User.create({
        githubId: id,
        username: login,
        avatar: avatar_url,
      });
    }

    const token = generateToken({ id: user._id, username: user.username });
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
