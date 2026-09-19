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
const results = [];

files.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;

    // Look for JSX text or string literals with //
    const regex = /(["'`>])([^"'`<>\n\r]*\/\/[^"'`<>\n\r]*)(["'`<])/g;
    let match;
    while ((match = regex.exec(line)) !== null) {
      const text = match[2].trim();
      if (!text.includes('http:') && !text.includes('https:') && !text.includes('file:') && !text.startsWith('//') && !text.startsWith('/*')) {
        results.push({
          file: filePath,
          line: idx + 1,
          fullLine: trimmed,
          match: text
        });
      }
    }
  });
});

fs.writeFileSync('scripts/slashes_output.json', JSON.stringify(results, null, 2));
console.log('Found ' + results.length + ' matches');
