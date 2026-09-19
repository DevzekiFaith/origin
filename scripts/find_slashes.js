const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('./app');
const matches = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // strip URLs
    const stripped = line.replace(/https?:\/\/[^\s"'`]+/g, '');
    // skip pure comments
    const trimmed = stripped.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }
    // check if it contains //
    if (stripped.includes('//')) {
      matches.push({ file, lineNum: idx + 1, text: line.trim() });
    }
  });
});

console.log(JSON.stringify(matches, null, 2));
