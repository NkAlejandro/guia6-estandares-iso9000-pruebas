'use strict';

/** Valida la integridad del docx generado: XML bien formado, relaciones e imagenes. */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const docx = process.argv[2];
const tmp = process.argv[3];

fs.rmSync(tmp, { recursive: true, force: true });
fs.mkdirSync(tmp, { recursive: true });
const zipTmp = path.join(require("os").tmpdir(), `val-${Date.now()}.zip`);
fs.copyFileSync(docx, zipTmp);
execFileSync("powershell.exe", ["-Command", `Expand-Archive -LiteralPath '${zipTmp}' -DestinationPath '${tmp}' -Force`]);
fs.rmSync(zipTmp, { force: true });

const doc = path.join(tmp, "word", "document.xml");
const xml = fs.readFileSync(doc, "utf8");

// 1. Marcadores restantes
const pendientes = [...xml.matchAll(/<w:t[^>]*>([^<]*INSERTAR[^<]*)</g)].map((m) => m[1]);
console.log(`Marcadores [INSERTAR ...] restantes: ${pendientes.length}`);
pendientes.forEach((p) => console.log("   - " + p));

// 2. Texto plano para inspeccion
const plano = xml
  .replace(/<w:p\b[^>]*>/g, "\n")
  .replace(/<[^>]+>/g, "")
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');

console.log(`\nCaracteres de texto: ${plano.length}`);
console.log(`Parrafos <w:p>: ${(xml.match(/<w:p\b/g) || []).length}`);
console.log(`Imagenes <w:drawing>: ${(xml.match(/<w:drawing>/g) || []).length}`);

// 3. Relaciones e imagenes
const rels = fs.readFileSync(path.join(tmp, "word", "_rels", "document.xml.rels"), "utf8");
const relIds = [...rels.matchAll(/Id="([^"]+)"/g)].map((m) => m[1]);
const embeds = [...xml.matchAll(/r:embed="([^"]+)"/g)].map((m) => m[1]);
const links = [...xml.matchAll(/r:id="([^"]+)"/g)].map((m) => m[1]);

console.log(`\nRelaciones definidas: ${relIds.length}`);
console.log(`r:embed usados: ${embeds.length} -> ${embeds.join(", ")}`);
console.log(`r:id usados: ${links.join(", ")}`);

const faltantes = embeds.filter((e) => !relIds.includes(e));
const linksFaltantes = links.filter((e) => !relIds.includes(e));
console.log(`Relaciones faltantes para imagenes: ${faltantes.length ? faltantes.join(", ") : "ninguna"}`);
console.log(`Relaciones faltantes para enlaces : ${linksFaltantes.length ? linksFaltantes.join(", ") : "ninguna"}`);

// 4. Imagenes referenciadas existen en media/
const media = fs.readdirSync(path.join(tmp, "word", "media"));
console.log(`\nArchivos en word/media: ${media.join(", ")}`);
for (const m of relIds) {
  const r = rels.match(new RegExp(`Id="${m}"[^>]*Target="([^"]+)"`));
  if (r && r[1].startsWith("media/")) {
    const existe = fs.existsSync(path.join(tmp, "word", r[1]));
    if (!existe) console.log(`   FALTA: ${r[1]}`);
  }
}

// 5. Tamano de imagenes insertadas
for (const f of ["image5.png", "image6.png"]) {
  const fp = path.join(tmp, "word", "media", f);
  if (fs.existsSync(fp)) {
    const b = fs.readFileSync(fp);
    console.log(`   ${f}: ${b.readUInt32BE(16)} x ${b.readUInt32BE(20)} px, ${b.length} bytes`);
  }
}

// 6. Contenido clave presente
console.log("\n--- Verificacion de contenido ---");
const claves = [
  ["Repositorio de GitHub del equipo", "seccion de GitHub"],
  ["Evidencia de la ejecucion de las pruebas", "seccion de pruebas"],
  ["Evidencia de la ejecución de las pruebas", "seccion de pruebas (acentos)"],
  ["12/12", "resultado 12/12"],
  ["100.0", "porcentaje"],
  ["NkAlejandro", "cuenta de GitHub"],
  ["Incidencias detectadas", "incidencias"],
  ["PENDIENTE", "marcadores pendientes declarados"],
];
for (const [k, etiqueta] of claves) {
  console.log(`  ${plano.includes(k) ? "SI " : "NO "} ${etiqueta}`);
}

// 7. Solo deben quedar pendientes los de论坛/comentarios
console.log("\n--- Estructura final ---");
const idx = plano.indexOf("Evidencia de la");
console.log(plano.slice(Math.max(0, idx - 100), idx + 700).trim());