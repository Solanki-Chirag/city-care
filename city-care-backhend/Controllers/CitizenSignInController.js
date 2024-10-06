const citizen = require("../Model/Citizen");
const bcrypt = require("bcryptjs");
const generateTokens = require("../utils/generateTokens");

const handleCitizenLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("back", req.body);
  if (!email || !password)
    return res.status(400).json("email and password required!!");

  const findCitizen = await citizen.findOne({ email: email });
  if (!findCitizen) return res.status(401).json("Citizen not found!!");

  const match = await bcrypt.compare(password, findCitizen.password);

  if (match) {

    generateTokens.generateTokenAndSetCookie(findCitizen._id, res);
    res.status(200).json({
      _id: findCitizen._id,
      email: findCitizen.email
    });
  } else {
    return res.status(401).json("Incorrect password !!");;
  }
};

module.exports = { handleCitizenLogin };
