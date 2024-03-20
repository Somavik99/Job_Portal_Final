export const sendToken = (user, statusCode, res, message) => {
  const expiresIn = process.env.JWT_EXPIRE || '7d';  
  const token = user.getJWTToken(expiresIn); 

  // Calculate the expiration date
  const expirationDate = new Date(Date.now() + parseExpirationTime(expiresIn));

  const options = {
    expires: expirationDate,
    httpOnly: true,
  };
  
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
 
const parseExpirationTime = (expiresIn) => {
  const units = {
    s: 1000,  // seconds
    m: 60 * 1000,  // minutes
    h: 60 * 60 * 1000,  // hours
    d: 24 * 60 * 60 * 1000,  // days
  };

  const duration = parseInt(expiresIn);
  const unit = expiresIn[expiresIn.length - 1];

  return units[unit] * duration;
};
