const citizen = require("../Model/Citizen");
const bcrypt = require("bcryptjs");
const generateTokens = require("../utils/generateTokens");
const handleNewCitizen = async (req, res) => {
  const { firstName, middleName, lastName, address, email, contact, password } = req.body;
  if (!firstName || !middleName || !lastName || !address || !email || !contact || !password)
    return res.status(400).json({ message: "All fields are required" });

  // check for duplicate usernames in the db
  const duplicate = await citizen.findOne({ email: email }).exec();
  if (duplicate) return res.status(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result1 = await citizen.create({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      address: address,
      email: email,
      contact: contact,
      password: hashedPwd,
    });
    if (result1) {
      console.log(result1);
      generateTokens.generateTokenAndSetCookie(result1._id, res);

      res.status(201).json({
        _id: result1._id,
        email: result1.email
      });

    }


  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewCitizen };
