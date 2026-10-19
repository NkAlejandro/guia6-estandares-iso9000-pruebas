const fs = require("fs");
const xml = fs.readFileSync(process.argv[2], "utf8");

// Lista todos los <w:p>...</w:p> que contienen los marcadores
const re = /<w:p\b[^>]*>[\s\S]*?<\/w:p>/g;
let m, n = 0;
while ((m = re.exec(xml)) !== null) {
  const frag = m[0];
  const txt = frag.replace(/<[^>]+>/g, "");
  if (txt.includes("INSERTAR")) {
    n++;
    console.log(`\n########## PARRAFO ${n} | offset ${m.index} | largo ${frag.length}`);
    console.log(txt.trim().slice(0, 200));
    console.log("---------- XML ----------");
    console.log(frag.length > 1400 ? frag.slice(0, 1400) + "\n...[TRUNCADO]..." : frag);
  }
}
console.log(`\n=== Total marcadores: ${n} ===`);