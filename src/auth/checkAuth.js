'use strict';

const { findById } = require('../services/apikey.service');

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).send({ message: 'Forbidden Error' });
    }

    // check objKey
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).send({ message: 'Forbidden Error' });
    }
    req.objKey = objKey;
    return next();
  } catch (err) {}
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions.includes(permission)) {
      return res.status(403).send({ message: 'Permission denied' });
    }
    return next();
  };
};

module.exports = { apiKey, permission };
