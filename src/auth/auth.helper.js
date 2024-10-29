'use strict';

const JWT = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '2 days',
    });

    const refreshToken = JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '7 days',
    });

    // verify
    JWT.verify(accessToken, publicKey, (err, decoded) => {
      if (err) {
        console.error('accessToken verify error: ', err);
      } else {
        console.log('accessToken verify decoded: ', decoded);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTokenPair,
};
