const fs = require('fs');
const path = require('path');

const dirsToSearch = ['app', 'components'];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Colors mappings
  // We use temporary tokens to avoid double replacement
  
  content = content.replace(/bg-\[\#050505\]/g, 'bg-[__COLOR_WHITE__]');
  content = content.replace(/bg-\[\#0A0A0B\]/g, 'bg-[__COLOR_FAFAFA__]');
  content = content.replace(/bg-\[\#111113\]/g, 'bg-[__COLOR_F4F4F5__]');
  content = content.replace(/bg-\[\#080809\]/g, 'bg-[__COLOR_FAFAFA__]');
  content = content.replace(/bg-\[\#020202\]/g, 'bg-[__COLOR_WHITE__]');
  content = content.replace(/bg-\[\#030303\]/g, 'bg-[__COLOR_FAFAFA__]');

  content = content.replace(/bg-white/g, 'bg-__COLOR_BLACK__');
  content = content.replace(/bg-black/g, 'bg-__COLOR_WHITE__');
  
  content = content.replace(/text-white/g, 'text-[__COLOR_TEXT_DARK__]');
  content = content.replace(/text-black/g, 'text-white');
  
  // Specific zinc text colors
  content = content.replace(/text-\[\#A1A1AA\]/g, 'text-[#52525B]');
  content = content.replace(/text-\[\#71717A\]/g, 'text-[#52525B]'); // Muted text

  // RGBA replacements for borders and backgrounds
  content = content.replace(/rgba\(255,255,255,/g, 'rgba(0,0,0,');
  
  // Opacity modifiers
  content = content.replace(/white\/([0-9]+)/g, 'black/$1');
  
  // Special text colors used in components
  content = content.replace(/from-\[\#0A0A0B\]/g, 'from-[#FAFAFA]');
  content = content.replace(/from-\[\#050505\]/g, 'from-[#FFFFFF]');
  
  // SVG stuff
  content = content.replace(/stroke="white"/g, 'stroke="black"');

  // Replace tokens
  content = content.replace(/__COLOR_WHITE__/g, '#FFFFFF');
  content = content.replace(/__COLOR_FAFAFA__/g, '#FAFAFA');
  content = content.replace(/__COLOR_F4F4F5__/g, '#F4F4F5');
  content = content.replace(/__COLOR_BLACK__/g, 'black');
  content = content.replace(/__COLOR_TEXT_DARK__/g, '#050505');

  fs.writeFileSync(filePath, content, 'utf8');
}

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.css')) {
      processFile(fullPath);
    }
  }
}

dirsToSearch.forEach(dir => traverseDir(path.join(__dirname, dir)));
console.log('Colors inverted successfully.');
