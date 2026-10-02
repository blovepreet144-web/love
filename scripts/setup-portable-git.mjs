import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';

const MINGIT_URL = 'https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/MinGit-2.47.1-64-bit.zip';
const targetDir = path.resolve(process.cwd(), 'git-portable');
const zipPath = path.resolve(process.cwd(), 'mingit-temp.zip');

async function download() {
  console.log('[1/3] Downloading portable Git (MinGit 47MB)...');
  const res = await fetch(MINGIT_URL, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

  const fileStream = fs.createWriteStream(zipPath);
  await finished(Readable.fromWeb(res.body).pipe(fileStream));
  console.log('[2/3] Download complete. Extracting portable Git...');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  execSync(`tar -xf "${zipPath}" -C "${targetDir}"`, { stdio: 'inherit' });
  console.log('[3/3] Extraction finished!');

  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }

  const gitExe = path.join(targetDir, 'cmd', 'git.exe');
  if (fs.existsSync(gitExe)) {
    const version = execSync(`"${gitExe}" --version`).toString().trim();
    console.log(`\n[SUCCESS] Portable Git ready: ${version}\n`);
  } else {
    throw new Error('git.exe not found after extraction');
  }
}

download().catch(err => {
  console.error('[FAILED] Setup error:', err.message);
  process.exit(1);
});
