import { execFile } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targetJpg = path.resolve('src/assets/project-allans-fireside-grill.jpg');
const publicJpg = path.resolve('public/project-allans-fireside-grill.jpg');

const args = [
  '--headless',
  '--disable-gpu',
  '--virtual-time-budget=7000',
  '--run-all-compositor-stages-before-draw',
  `--screenshot=${targetJpg}`,
  '--window-size=1440,900',
  '--hide-scrollbars',
  'https://allansfiresidegrill.com/'
];

console.log('Capturing screenshot of https://allansfiresidegrill.com/ ...');

execFile(edgePath, args, (err, stdout, stderr) => {
  if (err) {
    console.error('Edge screenshot error:', err);
    return;
  }
  console.log('Screenshot captured to:', targetJpg);
  if (fs.existsSync(targetJpg)) {
    fs.copyFileSync(targetJpg, publicJpg);
    console.log('File size:', fs.statSync(targetJpg).size, 'bytes');
  }
});
