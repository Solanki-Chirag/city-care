const citizen = require("../Model/Citizen");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    
    const Email = findCitizen.email;
    const refreshToken = jwt.sign(
      {
        email: Email,
      },  
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "10d" }
    );
    findCitizen.refreshToken = refreshToken;
    const result = await findCitizen.save();
   

    res.cookie("jwt", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      _id: findCitizen._id,
      email: findCitizen.email
    })
    
  } else {
    return res.status(401).json("Incorrect password !!");;
  }
};

module.exports = { handleCitizenLogin }; 
