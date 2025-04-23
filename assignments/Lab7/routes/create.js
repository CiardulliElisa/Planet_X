const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

router.get('/', (req, res, next) => {
  fs.readFile(path.join(__dirname, '..', 'views', 'form.html'), 'utf8', (err, page) => {
    if (err) {
      console.error(err);
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(page);
  });
});

module.exports = router; 