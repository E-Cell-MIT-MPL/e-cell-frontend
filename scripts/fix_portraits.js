const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const speakers = [
  {
    file: "ashneer-grover.jpg",
    url: "https://starsunfolded.com/wp-content/uploads/2022/01/Ashneer-Grover.jpg"
  },
  {
    file: "aman-gupta.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/de/Aman_Gupta_of_boAt_Lifestyle.jpg"
  },
  {
    file: "gaurav-taneja.jpg",
    url: "https://starsunfolded.com/wp-content/uploads/2020/12/Gaurav-Taneja.jpg"
  },
  {
    file: "velumani.jpg",
    url: "https://starsunfolded.com/wp-content/uploads/2024/05/Arokiaswamy-Velumani.jpg"
  },
  {
    file: "prafull-billore.jpg",
    url: "https://starsunfolded.com/wp-content/uploads/2023/04/Prafull-Billore-images.jpg"
  },
  {
    file: "yash-rathi.jpg",
    url: "https://cdn.engage4more.com/files/images/profile/yash-rathi_Comedian.webp"
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    function get(u, redirects) {
      if (redirects > 8) { console.log(`Too many redirects: ${dest}`); return resolve(false); }
      const client = u.startsWith("https") ? https : http;
      client.get(u, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Referer": "https://www.google.com/",
          "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          try {
            const next = new URL(res.headers.location, u).href;
            return get(next, redirects + 1);
          } catch { return resolve(false); }
        }
        if (res.statusCode === 200) {
          const stream = fs.createWriteStream(dest);
          res.pipe(stream);
          stream.on("finish", () => {
            const size = fs.statSync(dest).size;
            console.log(`SUCCESS: ${path.basename(dest)} (${size} bytes)`);
            resolve(size > 5000);
          });
          stream.on("error", () => resolve(false));
        } else {
          console.log(`FAILED (${res.statusCode}): ${path.basename(dest)} from ${u}`);
          resolve(false);
        }
      }).on("error", (e) => {
        console.log(`ERROR: ${path.basename(dest)} -> ${e.message}`);
        resolve(false);
      });
    }
    get(url, 0);
  });
}

async function run() {
  for (const s of speakers) {
    const dest = path.join(__dirname, "../public/speakers", s.file);
    await downloadFile(s.url, dest);
    await new Promise(r => setTimeout(r, 600));
  }
  console.log("\nFinal:");
  fs.readdirSync(path.join(__dirname, "../public/speakers")).forEach(f => {
    const size = fs.statSync(path.join(__dirname, "../public/speakers", f)).size;
    console.log(`  ${f}: ${size} bytes`);
  });
}

run();
