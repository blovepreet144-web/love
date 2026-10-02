import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

const images = [
  'dr-tanveer-consult-SXoHXJx6.jpg',
  'dr-tanveer-kaur-C4d0bpOv.jpg',
  'treatment-laser-MuDGcoqj.jpg',
  'treatment-hydrafacial-vEVCeycV.jpg',
  'gallery-reception-DKxOf1mA.jpg',
  'gallery-room-DHyzGaub.jpg'
];

async function download(name) {
  const url = `https://www.aestheticaura.world/assets/${name}`;
  const dest = path.resolve('public', name);
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded ${name} (${fs.statSync(dest).size} bytes)`);
          resolve();
        });
      });
    }).on('error', reject);
  });
}

for (const img of images) {
  try {
    await download(img);
  } catch (e) {
    console.error(e.message);
  }
}
