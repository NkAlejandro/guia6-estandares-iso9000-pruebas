const fs = require("fs");
const xml = fs.readFileSync(process.argv[2], "utf8");

const objetivo = process.argv[3];
const re = /<w:p\b[^>]*>[\s\S]*?<\/w:p>/g;
let m, i = 0;
while ((m = re.exec(xml)) !== null) {
  const frag = m[0];
  const txt = frag.replace(/<[^>]+>/g, "");
  if (txt.includes(objetivo)) {
    console.log(`\n=== PARRAFO (offset ${m.index}) ===`);
    console.log(frag.slice(0, 1600));
    i++;
    if (i >= 2) break;
  }
}
console.log("\n=== FUENTES DECLARADAS ===");
const st = fs.readFileSync(process.argv[4], "utf8");
const rfonts = st.match(/<w:rFonts[^>]*>/g) || [];
console.log([...new Set(rfonts)].join("\n"));
const sz = st.match(/<w:sz w:val="\d+"\/>/g) || [];
console.log([...new Set(sz)].slice(0, 8).join("\n"));