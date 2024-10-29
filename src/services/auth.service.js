'use strict';

const bcrypt = require('bcrypt');
const shopModel = require('../models/shop.model');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/auth.helper');
const { getInfoData } = require('../utils');

const shopRoles = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
};

class AuthService {
  static async signUp({ name, email, password }) {
    try {
      // step1: check email exists
      // const holderShop = await shopModel.findOne({email})

      //Khi bạn sử dụng lean(), Mongoose sẽ trả về một plain JavaScript object thay vì một Mongoose Document
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: 'xxx',
          message: 'Shop already registered',
        };
      }

      // step2: create new shop
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [shopRoles.SHOP],
      });

      if (newShop) {
        // tạo shop mới có 2 cách
        // cách 1: redirect về trang login

        // cách 2: truy cập luôn vào hệ thống
        // create privateKey, publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
        });

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: 'xxx',
            message: 'Create publicKey failed',
          };
        }

        const tokens = await createTokenPair(
          {
            userId: newShop._id,
            email,
          },
          publicKey,
          privateKey
        );
        console.log('tokens: ', tokens);

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ['_id', 'name', 'email'],
              object: newShop,
            }),
            tokens,
          },
        };
      }

      return {
        code: 400,
        metadata: null,
      };
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error',
      };
    }
  }
}

module.exports = AuthService;
