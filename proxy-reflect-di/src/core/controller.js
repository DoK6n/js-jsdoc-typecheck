const express = require('express');

class Controller {
  constructor() {
    this.router = express.Router();
  }
}

module.exports = { Controller };
