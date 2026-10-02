import fs from 'node:fs';
import path from 'node:path';

const src = 'C:\\Users\\dell\\.gemini\\antigravity-ide\\brain\\7c62c4a2-7d80-4f64-bede-eb591b268f09\\.user_uploaded\\media_1790872694643.jpg';
const destAssets = path.resolve('src/assets/logo.jpg');
const destPublic = path.resolve('public/logo.jpg');
const destFavicon = path.resolve('public/favicon.png');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, destAssets);
  fs.copyFileSync(src, destPublic);
  fs.copyFileSync(src, destFavicon);
  console.log('Successfully replaced logo with new uploaded image');
} else {
  console.error('Source file not found:', src);
}
