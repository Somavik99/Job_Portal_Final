export const sendToken = (user, statusCode, res, message) => {
  const expiresIn = process.env.COOKIE_EXPIRE || '5d';  
  const token = user.getJWTToken(expiresIn); 

  const options = {
    expires: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000),  
    httpOnly: true,  
  };
  
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};


