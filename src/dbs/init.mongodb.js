'use strict';

const mongoose = require('mongoose');
const connectString = `mongodb://localhost:27017/shopDEV`;
const { countConnect } = require('../helpers/check.connect');

class Database {
  constructor() {
    this.connect();
  }

  // connect
  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(connectString, {
        maxPoolSize: 100,
      })
      .then((_) =>
        console.log(`Connected MongoDb Success PRO ${countConnect()}`)
      )
      .catch((err) => console.log('Error Connect!'));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

module.exports = Database.getInstance();
