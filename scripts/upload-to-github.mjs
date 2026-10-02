import fs from 'node:fs';
import path from 'node:path';

// Usage: node scripts/upload-to-github.mjs <GITHUB_TOKEN>
const token = process.argv[2] || process.env.GITHUB_TOKEN;
const owner = 'blovepreet144-web';
const repo = 'love';
const branch = 'main';

if (!token) {
  console.error('\n[ERROR] GitHub Personal Access Token (PAT) is required.');
  console.log('Usage: node scripts/upload-to-github.mjs <YOUR_GITHUB_TOKEN>\n');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': 'Lovepreet-Portfolio-Uploader',
};

async function api(endpoint, options = {}) {
  const url = `https://api.github.com${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  const contentType = res.headers.get('content-type') || '';
  let data = null;
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const errorMsg = (data && data.message) ? data.message : res.statusText;
    throw new Error(`GitHub API Error [${res.status} ${endpoint}]: ${errorMsg}`);
  }

  return data;
}

// Recursively collect all project source files excluding ignored dirs
const EXCLUDED_DIRS = new Set([
  'node_modules',
  '.output',
  '.wrangler',
  '.lovable',
  '.git',
]);

const EXCLUDED_FILES = new Set([
  'lovepreetweb-clean-repo.zip',
  'aesthetic-aura.html',
  'Install-Git.exe',
  'Install',
  'upload.log',
  'server-log.txt',
]);

function getAllFiles(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.has(entry.name)) {
        files = files.concat(getAllFiles(fullPath, baseDir));
      }
    } else if (entry.isFile()) {
      const isExcluded =
        EXCLUDED_FILES.has(entry.name) ||
        entry.name.endsWith('.zip') ||
        entry.name.endsWith('.exe') ||
        entry.name.endsWith('.log');
      if (!isExcluded) {
        files.push({ fullPath, relPath });
      }
    }
  }

  return files;
}

async function upload() {
  console.log('================================================================');
  console.log(` Starting upload to https://github.com/${owner}/${repo}`);
  console.log('================================================================\n');

  // 1. Verify repository access
  console.log('[1/5] Verifying repository access...');
  const repoData = await api(`/repos/${owner}/${repo}`);
  console.log(`[OK] Repository verified: ${repoData.full_name} (${repoData.private ? 'Private' : 'Public'})`);

  // 2. Collect all files to upload
  const rootDir = process.cwd();
  const files = getAllFiles(rootDir);
  console.log(`[2/5] Collected ${files.length} project files to upload.`);

  // 3. Create Git Blobs for all files
  console.log('[3/5] Uploading file blobs to GitHub...');
  const treeEntries = [];
  let count = 0;

  for (const file of files) {
    count++;
    const contentBuffer = fs.readFileSync(file.fullPath);
    const base64Content = contentBuffer.toString('base64');

    const blob = await api(`/repos/${owner}/${repo}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({
        content: base64Content,
        encoding: 'base64',
      }),
    });

    treeEntries.push({
      path: file.relPath,
      mode: '100644',
      type: 'blob',
      sha: blob.sha,
    });

    if (count % 20 === 0 || count === files.length) {
      console.log(`  Uploaded ${count}/${files.length} files...`);
    }
  }

  // 4. Create Git Tree & Commit
  console.log('[4/5] Building Git Tree & creating commit...');
  const tree = await api(`/repos/${owner}/${repo}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({
      tree: treeEntries,
    }),
  });

  // Check if branch already exists to set parent
  let parentCommitSha = null;
  try {
    const ref = await api(`/repos/${owner}/${repo}/git/ref/heads/${branch}`);
    parentCommitSha = ref.object ? ref.object.sha : (ref[0] && ref[0].object ? ref[0].object.sha : null);
  } catch (err) {
    try {
      const ref = await api(`/repos/${owner}/${repo}/git/refs/heads/${branch}`);
      parentCommitSha = ref.object ? ref.object.sha : (ref[0] && ref[0].object ? ref[0].object.sha : null);
    } catch (e) {
      // Branch does not exist yet (empty repository)
    }
  }

  const commitPayload = {
    message: 'Upload complete portfolio with all assets, media, and Vercel configuration',
    tree: tree.sha,
    parents: parentCommitSha ? [parentCommitSha] : [],
  };

  const commit = await api(`/repos/${owner}/${repo}/git/commits`, {
    method: 'POST',
    body: JSON.stringify(commitPayload),
  });

  console.log(`[OK] Commit created: ${commit.sha.slice(0, 7)}`);

  // 5. Update or create branch reference
  console.log(`[5/5] Updating '${branch}' branch reference...`);
  let updated = false;
  if (parentCommitSha) {
    try {
      await api(`/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
        method: 'PATCH',
        body: JSON.stringify({
          sha: commit.sha,
          force: true,
        }),
      });
      updated = true;
    } catch (err) {
      // Retry with ref singular
    }
  }

  if (!updated) {
    try {
      await api(`/repos/${owner}/${repo}/git/refs`, {
        method: 'POST',
        body: JSON.stringify({
          ref: `refs/heads/${branch}`,
          sha: commit.sha,
        }),
      });
    } catch (e) {
      await api(`/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
        method: 'PATCH',
        body: JSON.stringify({
          sha: commit.sha,
          force: true,
        }),
      });
    }
  }

  console.log('\n================================================================');
  console.log(` SUCCESS! ALL ${files.length} FILES UPLOADED TO GITHUB!`);
  console.log(` Repository: https://github.com/${owner}/${repo}`);
  console.log('================================================================\n');
}

upload().catch((err) => {
  console.error('\n[FAILED] Upload failed:', err.message);
  process.exit(1);
});
