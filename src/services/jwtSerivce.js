const jwt = require("jsonwebtoken");
require("dotenv").config();

export const generalAccessToken = (payload) => {
  const accessToken = jwt.sign(
    {
      payload,
    },
    process.env.ACCESS_KEY,
    { expiresIn: "30s" }
  );

  return accessToken;
};

export const generalRefreshToken = (payload) => {
  const refreshToken = jwt.sign(
    {
      payload,
    },
    process.env.REFRESH_KEY,
    { expiresIn: "1d" }
  );

  return refreshToken;
};

export const refreshTokenService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!token) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        jwt.verify(token, process.env.REFRESH_KEY, async function (err, user) {
          if (err) {
            resolve({
              errCode: -2,
              message: "User access denied",
            });
          }
          if (user?.payload) {
            const accessToken = await generalAccessToken({
              id: user?.payload?.id,
              isAdmin: user?.payload?.isAdmin,
            });
            resolve({
              errCode: 0,
              data: accessToken,
              message: "Refresh token succeed",
            });
          }
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
