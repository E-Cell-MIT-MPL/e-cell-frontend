const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const speakers = [
  {
    file: "ankur-warikoo.jpg",
    // Already downloaded correctly (466KB) - skip
    skip: true
  },
  {
    file: "ashneer-grover.jpg",
    url: "https://www.hindustantimes.com/ht-img/img/2023/07/19/400x225/Ashneer_Grover_1645449990248_1689753876875.jpg"
  },
  {
    file: "aman-gupta.jpg",
    url: "https://c.ndtvimg.com/2024-03/b1au018s_amangupta_640x480_08_March_24.jpg"
  },
  {
    file: "shantanu-deshpande.jpg",
    url: "https://asset.peoplematters.in/images/b95f9b52-24ab-4754-b817-834a0762ccd3.png"
  },
  {
    file: "gaurav-taneja.jpg",
    url: "https://c.ndtvimg.com/2022-08/07c15clg_flying-beast_640x480_05_August_22.jpg"
  },
  {
    file: "velumani.jpg",
    url: "https://www.hindustantimes.com/ht-img/img/2026/02/10/400x225/Dr_A_Velumani_1770720915592_1770720923063.jpg"
  },
  {
    file: "akshat-rathee.jpg",
    url: "https://nodwingaming.com/wp-content/uploads/2024/07/Akshat-Rathee-Black.jpg"
  },
  {
    file: "prafull-billore.jpg",
    url: "https://c.ndtvimg.com/2023-03/vmrijeq8_prafull-billore_625x300_07_March_23.jpg"
  },
  {
    file: "aditi-madan.jpg",
    url: "https://bluepinefoods.com/wp-content/uploads/2024/05/Momo-Mami-By-Aditi-Madan.jpg"
  },
  {
    file: "sahiba-bali.jpg",
    url: "https://static.wixstatic.com/media/565edd_c1f501f790414d609f01b86306f51382~mv2.jpg/v1/fill/w_560,h_560,al_c,lg_1,q_80/565edd_c1f501f790414d609f01b86306f51382~mv2.jpg"
  },
  {
    file: "karunesh-talwar.jpg",
    url: "https://starsunfolded.com/wp-content/uploads/2022/12/Karunesh-Talwar.jpg"
  },
  {
    file: "yash-rathi.jpg",
    url: "https://in.bmscdn.com/artist/yash-rathi-1085923-1652943382.jpg"
  },
  {
    file: "ishan-sukul.jpg",
    url: "https://assets.clay.earth/api/images/avatars/active/OTc1NjI1Ny02OTMzOTA1NTM="
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
    if (s.skip) {
      console.log(`Skipping: ${s.file}`);
      continue;
    }
    const dest = path.join(__dirname, "../public/speakers", s.file);
    await downloadFile(s.url, dest);
    await new Promise(r => setTimeout(r, 500));
  }
  console.log("\nFinal file list:");
  fs.readdirSync(path.join(__dirname, "../public/speakers")).forEach(f => {
    const size = fs.statSync(path.join(__dirname, "../public/speakers", f)).size;
    console.log(`  ${f}: ${size} bytes`);
  });
}

run();
