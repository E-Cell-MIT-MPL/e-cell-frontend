const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

// All files from the Google Drive folder mapped to team members
const teamPhotos = [
  { file: "khushi-nagelia.jpg",   id: "1-b2OoraaQg5t5I_8ODPJLttp7u_AHGfJ" },   // KHUSHI NAGELIA - Chairperson
  { file: "pratham-gupta.jpg",    id: "1KMtdCgKIqE4kyNIjf6pf3WVrFaAYosKh" },   // Pratham_Gupta.png - Deputy Chair
  { file: "sarah-gupta.jpg",      id: "1zyqSAueaZG-1qqqHV7B1Cw5lzHmmT3fr" },   // Sarah Gupta - Deputy Chair
  { file: "nikunj-nagpal.jpg",    id: "1MN8VZTiOmNgc4uCFTHi1UbAZrzmXIJ70" },   // Nikunj Nagpal - Startup Dev Head
  { file: "raiyaan-mansoor.jpg",  id: "1885vpc7sJuhLbXp7HFpcH1lIIZCsnSV1" },   // RAIYAAN MANSOOR - Startup Dev Head
  { file: "drishti-choudhary.jpg",id: "1fWL3fmS1ZyYuf68J6opLjt1hU2VIDHjO" },   // drishti choudhary.jpg
  { file: "vedika-singh.jpg",     id: "1b-DY40JS9g58DwvdZYHqK7Ur-Bbx7GhL" },   // Vedika_Singh.jpg
  { file: "aditya-vyas.jpg",      id: "1FcUjKeEeoKRyrFiZz-zje92ExeON3lhZ" },   // Aditya Vyas.png
  { file: "yusuf-khan.jpg",       id: "138YTQPlfHCQLQPF-ezXDd_foXG9WyMN6" },   // Yusuf
  { file: "vedant-mendhekar.jpg", id: "1XF2qJ71sytgU4Cgk63KbdrsEE2Y4S7Ko" },   // Vedant.jpg
  { file: "siddharth-pareek.jpg", id: "1vaNYD4Ca_ak0R7lSO75kIaJQ6Igm6nq7" },   // Siddharth_Pareek
  { file: "dhruv-agrawal.jpg",    id: "142gfUVnSCbuNj7ghKqxP7XTAf9JMmEpr" },   // Dhruv.jpg
  { file: "sarthak-chaddha.jpg",  id: "1u8waGS9CDFW3IbpKtqdKukWanjWuyYBl" },   // Sarthak Chaddha.JPG
  // Extra members in folder
  { file: "ishan-ekbote.jpg",     id: "1G5JkQT5ec_bPCXWBu33ZIPDPQDcZc8Jh" },   // ishan.png
  { file: "lokesh-parasa.jpg",    id: "1xO6ynzoXsO0M-tSYD-Uifp51NjGat9CU" },   // Lokesh_Parasa.jpg
];

const outDir = path.join(__dirname, "../public/team");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function downloadGDrive(fileId, dest) {
  return new Promise((resolve) => {
    // First try the direct export URL
    const url = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0`;
    
    function get(u, redirects, cookies) {
      if (redirects > 12) { console.log(`  Max redirects: ${path.basename(dest)}`); return resolve(false); }
      const client = u.startsWith("https") ? https : http;
      const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      };
      if (cookies) headers["Cookie"] = cookies;
      
      client.get(u, { headers }, (res) => {
        // Collect Set-Cookie headers
        const setCookies = res.headers["set-cookie"];
        const newCookies = setCookies ? setCookies.map(c => c.split(";")[0]).join("; ") : cookies;
        
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          try {
            const next = new URL(res.headers.location, u).href;
            return get(next, redirects + 1, newCookies || cookies);
          } catch { return resolve(false); }
        }
        
        const contentType = res.headers["content-type"] || "";
        
        if (contentType.includes("text/html")) {
          let html = "";
          res.on("data", chunk => html += chunk);
          res.on("end", () => {
            // Extract confirm token
            let match = html.match(/confirm=([^&"]+)/);
            if (match) {
              const confirmUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0&confirm=${match[1]}`;
              return get(confirmUrl, redirects + 1, newCookies || cookies);
            }
            match = html.match(/name="uuid" value="([^"]+)"/);
            if (match) {
              const confirmUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0&confirm=t&uuid=${match[1]}`;
              return get(confirmUrl, redirects + 1, newCookies || cookies);
            }
            // Try old API fallback
            if (redirects < 2) {
              const fallback = `https://drive.google.com/uc?export=download&id=${fileId}`;
              return get(fallback, redirects + 1, newCookies || cookies);
            }
            console.log(`  HTML dead end for: ${path.basename(dest)}`);
            resolve(false);
          });
          return;
        }
        
        if (res.statusCode === 200) {
          const stream = fs.createWriteStream(dest);
          res.pipe(stream);
          stream.on("finish", () => {
            const size = fs.statSync(dest).size;
            if (size < 2000) {
              console.log(`  SKIP too small (${size}b): ${path.basename(dest)}`);
              resolve(false);
            } else {
              console.log(`SUCCESS: ${path.basename(dest)} (${(size/1024).toFixed(0)}KB)`);
              resolve(true);
            }
          });
          stream.on("error", () => resolve(false));
        } else {
          console.log(`FAILED (${res.statusCode}): ${path.basename(dest)}`);
          resolve(false);
        }
      }).on("error", (e) => {
        console.log(`ERROR: ${path.basename(dest)} -> ${e.message}`);
        resolve(false);
      });
    }
    
    get(url, 0, null);
  });
}

async function run() {
  console.log(`Downloading ${teamPhotos.length} team photos...\n`);
  const results = {};
  for (const p of teamPhotos) {
    const dest = path.join(outDir, p.file);
    process.stdout.write(`${p.file}... `);
    const ok = await downloadGDrive(p.id, dest);
    results[p.file] = ok;
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log("\n=== Summary ===");
  const success = Object.values(results).filter(Boolean).length;
  console.log(`${success}/${teamPhotos.length} downloaded successfully`);
  fs.readdirSync(outDir).forEach(f => {
    const size = fs.statSync(path.join(outDir, f)).size;
    console.log(`  ${f}: ${(size/1024).toFixed(0)}KB`);
  });
}

run();
