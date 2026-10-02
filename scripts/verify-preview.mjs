import { execFile } from 'node:child_process';
import path from 'node:path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targetJpg = path.resolve('scripts/portfolio-preview.jpg');

const args = [
  '--headless',
  '--disable-gpu',
  '--virtual-time-budget=3000',
  '--run-all-compositor-stages-before-draw',
  `--screenshot=${targetJpg}`,
  '--window-size=1440,800',
  '--hide-scrollbars',
  'http://localhost:8081/'
];

execFile(edgePath, args, (err) => {
  if (err) {
    console.error('Edge screenshot error:', err);
    return;
  }
  console.log('Preview captured to:', targetJpg);
});
