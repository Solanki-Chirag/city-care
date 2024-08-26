
const handleAdminLogin = async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password)
    return res.status(400).json("Id and password required!!");

  if(id!=1){
    return res.status(401).json("Incorrect id !!");
  }
  else if (id==1 && password=="root") {
    
    res.json("success");
  } else {
    return res.status(401).json("Incorrect password !!");
  }
};

module.exports = { handleAdminLogin };
