const Users = require("../Models/userModel");

exports.Authenticate = async (req, res) => {
  const { current_user } = req.body;
  try {
    const user = await Users.findOne({ email: current_user });
    if (user) {
      res.status(200).json({success:true,user:user});
    } else {
      res.status(200).json({success:false,message: "User not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.AuthConfig = async (req, res) => {
  const { AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_REDIRECT_URI } = process.env;

  if (!AZURE_CLIENT_ID || !AZURE_TENANT_ID || !AZURE_REDIRECT_URI) {
    return res
      .status(500)
      .json({ error: "Missing Azure environment variables" });
  }
  res.json({
    clientId: AZURE_CLIENT_ID,
    tenantId: AZURE_TENANT_ID,
    redirectUri: AZURE_REDIRECT_URI,
  });
};
