const jwt = require("jsonwebtoken");

const SECRET_KEY =  'afafca75b5685742ea66865eee894dac865424a0e2ccb9c7be3c6f198b62ddc4da2ffab6328f8029f243c6acfc3049b01821c5faa6b8fcb16eaa769b37ecc739';


const checkAuth = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    console.log('Token is here', token);
    jwt.verify(token, SECRET_KEY);
    next();
  }catch(error){
    console.log('error', error.message);
    res.status(401).json({message: "You dont have access to visit this route"})
  }
}

module.exports = checkAuth;