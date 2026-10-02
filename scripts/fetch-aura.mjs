import https from 'node:https';
import fs from 'node:fs';

https.get('https://www.aestheticaura.world/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('aesthetic-aura.html', data);
    console.log('HTML saved, length:', data.length);
    
    // Find all images
    const imgMatches = [...data.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
    const ogMatches = [...data.matchAll(/property=["']og:image["'][^>]+content=["']([^"']+)["']/gi)].map(m => m[1]);
    const bgMatches = [...data.matchAll(/url\(["']?([^"')]+)["']?\)/gi)].map(m => m[1]);
    
    console.log('Images:', JSON.stringify({ imgMatches, ogMatches, bgMatches }, null, 2));
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
