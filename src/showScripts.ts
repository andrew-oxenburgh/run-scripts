const fs = require('fs');
const YAML = require('yaml');

const obj = JSON.parse(fs.readFileSync('package.json', 'utf8'));

console.log(YAML.stringify(obj.scripts, null, 3))
