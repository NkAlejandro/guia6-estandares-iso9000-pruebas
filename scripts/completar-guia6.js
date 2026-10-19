'use strict';

/**
 * Completa la guia 6: reemplaza los marcadores [INSERTAR AQUI ...] del documento Word
 * con el contenido real disponible (capturas de la ejecucion, repositorio y git log).
 *
 * Uso: node scripts/completar-guia6.js <carpeta_docx_extraida> <carpeta_evidencia>
 */

const fs = require("fs");
const path = require("path");

const dirDoc = process.argv[2];
const dirEv = process.argv[3];

// ---------- utilidades XML ----------
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const RSID = 'w:rsidR="00000000" w:rsidDel="00000000" w:rsidP="00000000" w:rsidPDefault="00000000" w:rsidRPr="00000000"';

function p(texto, o = {}) {
  const jc = o.align ? `<w:jc w:val="${o.align}"/>` : "";
  const ind = o.sinInd ? "" : '<w:ind w:firstLine="720"/>';
  const esp = o.espacioAntes ? `<w:spacing w:before="${o.espacioAntes}"/>` : "";
  const rPr = [];
  if (o.bold) rPr.push('<w:b w:val="1"/><w:bCs w:val="1"/>');
  if (o.cursiva) rPr.push('<w:i w:val="1"/><w:iCs w:val="1"/>');
  if (o.color) rPr.push(`<w:color w:val="${o.color}"/>`);
  if (o.sz) rPr.push(`<w:sz w:val="${o.sz}"/><w:szCs w:val="${o.sz}"/>`);
  if (o.mono) rPr.push('<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/>');
  if (o.sombreado) rPr.push('<w:shd w:val="clear" w:color="auto" w:fill="F2F2F2"/>');
  rPr.push('<w:rtl w:val="0"/>');
  const rprXml = `<w:rPr>${rPr.join("")}</w:rPr>`;

  return `<w:p ${RSID}><w:pPr>${jc}${ind}${esp}<w:rPr/></w:pPr><w:r ${RSID}>${rprXml}<w:t xml:space="preserve">${esc(texto)}</w:t></w:r></w:p>`;
}

function pVacio() {
  return `<w:p ${RSID}><w:pPr><w:rPr/></w:pPr><w:r ${RSID}><w:rPr><w:rtl w:val="0"/></w:rPr></w:r></w:p>`;
}

function pImagen(rid, cx, cy, docId, nombre, descripcion) {
  return `<w:p ${RSID}><w:pPr><w:jc w:val="center"/><w:rPr/></w:pPr><w:r ${RSID}><w:rPr><w:rtl w:val="0"/></w:rPr><w:drawing><wp:inline distB="114300" distT="114300" distL="114300" distR="114300"><wp:extent cx="${cx}" cy="${cy}"/><wp:effectExtent b="0" l="0" r="0" t="0"/><wp:docPr id="${docId}" name="${nombre}" descr="${esc(descripcion)}"/><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="0" name="${nombre}" descr="${esc(descripcion)}"/><pic:cNvPicPr preferRelativeResize="0"/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${rid}"/><a:srcRect b="0" l="0" r="0" t="0"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"/><a:ln/></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;
}

function pLink(rid, texto, mostrar) {
  return `<w:p ${RSID}><w:pPr><w:jc w:val="center"/><w:rPr/></w:pPr><w:hyperlink r:id="${rid}"><w:r ${RSID}><w:rPr><w:rStyle w:val="Hyperlink"/><w:color w:val="0563C1"/><w:u w:val="single"/><w:sz w:val="24"/><w:szCs w:val="24"/><w:rtl w:val="0"/></w:rPr><w:t xml:space="preserve">${esc(mostrar)}</w:t></w:r></w:hyperlink></w:p>`;
}

// ---------- dimensiones de las capturas ----------
// Pagina: 11909 twips de ancho, margenes 1440 + 1440 => 9029 twips utiles = 5733415 EMU
function emuDeImagen(anchoPx, altoPx, anchoObjetivoTwips) {
  const cx = anchoObjetivoTwips * 635;
  const cy = Math.round((altoPx / anchoPx) * cx);
  return { cx, cy };
}

// ---------- lectura deEvidence ----------
const GIT_LOG = fs.readFileSync(path.join(dirEv, "git-log.txt"), "utf8").trimEnd();
const SHORTLOG = fs.readFileSync(path.join(dirEv, "git-shortlog.txt"), "utf8").trimEnd();
const SALIDA_UN = fs.readFileSync(path.join(dirEv, "salida-pruebas.txt"), "utf8").trimEnd();
const SALIDA_API = fs.readFileSync(path.join(dirEv, "salida-pruebas-api.txt"), "utf8").trimEnd();

const px = (archivo) => {
  const b = fs.readFileSync(path.join(dirEv, archivo));
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20), data: b };
};

const img1 = px("captura-01-pruebas-unitarias.png");
const img2 = px("captura-02-pruebas-api.png");

// Copiar imagenes al paquete
fs.writeFileSync(path.join(dirDoc, "word", "media", "image5.png"), img1.data);
fs.writeFileSync(path.join(dirDoc, "word", "media", "image6.png"), img2.data);

// ---------- relaciones ----------
const rutaRels = path.join(dirDoc, "word", "_rels", "document.xml.rels");
let rels = fs.readFileSync(rutaRels, "utf8");
rels = rels.replace(
  "</Relationships>",
  `<Relationship Id="rId11" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image5.png"/>` +
    `<Relationship Id="rId12" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image6.png"/>` +
    `<Relationship Id="rId13" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="https://github.com/NkAlejandro/guia6-estandares-iso9000-pruebas" TargetMode="External"/>` +
    `</Relationships>`
);
fs.writeFileSync(rutaRels, rels, "utf8");

// ---------- contenido de reemplazo ----------
const REPO = "https://github.com/NkAlejandro/guia6-estandares-iso9000-pruebas";

const d1 = emuDeImagen(img1.w, img1.h, 8200);
const d2 = emuDeImagen(img2.w, img2.h, 8200);

// --- Marcador 1: enlace de YouTube del video de la Sesion 3 ---
const nuevo1 =
  p("Enlace del video de la Sesión 3 (3 a 5 minutos):", { align: "center", bold: true, espacioAntes: 120 }) +
  p("[PENDIENTE: peg aquí la URL de YouTube del video de la Sesión 3]", {
    align: "center", bold: true, color: "C00000",
  }) +
  p("Referencia: el video del Trabajo Autónomo ya está publicado en https://www.youtube.com/shorts/5je8kKdmi0s", {
    align: "center", cursiva: true, sz: 20,
  });

// --- Marcador 2: captura de la publicacion en el foro ---
const nuevo2 =
  p("[PENDIENTE: capturar la publicación del video en el foro de la guía y pegar la imagen aquí]", {
    align: "center", bold: true, color: "C00000",
  }) +
  p("Pasos: 1) abrir el foro de la guía, 2) localizar la publicación del video, 3) tomar captura de pantalla, 4) pegarla en este espacio.", {
    align: "center", cursiva: true, sz: 20,
  });

// --- Marcador 3: comentarios a publicaciones de compañeros ---
const nuevo3 =
  p("La guía exige registrar al menos 2 comentarios hechos a publicaciones de compañeros. Por tratarse de opiniones y enlaces propios de personas reales, este equipo los publica directamente en el foro y luego los documenta aquí con su autorización.", {
    sinInd: true, cursiva: true,
  }) +
  p("", { align: "center" }) +
  p("Comentario 1 — compañero: [PENDIENTE]   Enlace: [PENDIENTE]   Texto: [PENDIENTE]   Captura: [PEGAR AQUÍ]", {
    align: "center", bold: true, color: "C00000", sz: 20,
  }) +
  p("Comentario 2 — compañero: [PENDIENTE]   Enlace: [PENDIENTE]   Texto: [PENDIENTE]   Captura: [PEGAR AQUÍ]", {
    align: "center", bold: true, color: "C00000", sz: 20,
  });

// --- Marcador 4: capturas de la ejecucion de las pruebas (CONTENIDO REAL) ---
const nuevo4 =
  p("9. Evidencia de la ejecución de las pruebas", { align: "left", bold: true, sz: 24, espacioAntes: 200 }) +
  p("El código de la aplicación y de las pruebas está publicado en el repositorio del equipo. Para ejecutar las pruebas basta tener Node.js instalado; el proyecto no requiere instalar dependencias.", { sinInd: true }) +
  p("", { align: "center" }) +
  p("Comandos de ejecución", { align: "left", bold: true, sinInd: true }) +
  p("node app/tests/pruebas.js", { align: "center", mono: true, sz: 20, sombreado: true }) +
  p("node app/tests/pruebas-api.js", { align: "center", mono: true, sz: 20, sombreado: true }) +
  p("", { align: "center" }) +
  p("Resultado del plan de pruebas (escenarios EP-01 a EP-12)", { align: "left", bold: true, sinInd: true }) +
  p("Casos de prueba ejecutados: 12/12 — Casos aprobados: 12 (100.0 %) — Casos fallidos: 0 — Defectos críticos: 0 — Criterio de salida (≥ 95 %): CUMPLIDO", { sinInd: true }) +
  p("Resultado de las pruebas de integración de la API REST: 7/7 casos aprobados (100.0 %), 0 fallidos.", { sinInd: true }) +
  p("", { align: "center" }) +
  p("Figura 1. Salida de la consola de node app/tests/pruebas.js con los 12 escenarios del plan.", {
    align: "center", cursiva: true, sz: 18, espacioAntes: 120,
  }) +
  pImagen("rId11", d1.cx, d1.cy, 101, "evidencia-pruebas-unitarias.png", "Salida de las pruebas de los 12 escenarios del plan de pruebas") +
  p("Figura 2. Salida de la consola de node app/tests/pruebas-api.js con las pruebas de integración de la API REST (autenticación, roles e inyección SQL).", {
    align: "center", cursiva: true, sz: 18,
  }) +
  pImagen("rId12", d2.cx, d2.cy, 102, "evidencia-pruebas-api.png", "Salida de las pruebas de integración de la API REST") +
  p("", { align: "center" }) +
  p("Estas capturas corresponden a ejecuciones reales del código publicado en este repositorio. Para regenerarlas en otra máquina: npm run evidencia.", {
    align: "center", cursiva: true, sz: 19,
  }) +
  p("Incidencias detectadas durante la ejecución. En la primera corrida EP-03 falló con «Error: Stock insuficiente» porque los datos de partida no registraban existencias para el segundo producto del pedido; se corrigió agregando la compra de inventario correspondiente. Además, EP-12 tenía la aserción invertida (reportaba FAIL cuando el validador sí detectaba el patrón malicioso, que es justamente el resultado esperado) y se ajustó la lógica. Estos casos se documentan porque demuestran que las pruebas se ejecutaron y que el resultado se verificó, en línea con el principio de que los datos cuantitativos deben analizarse cuidadosamente.", { sinInd: true }) +
  p("", { align: "center" }) +
  p("Salida de consola — node app/tests/pruebas.js", { align: "left", bold: true, sinInd: true }) +
  SALIDA_UN.split("\n").map((l) => p(l, { align: "left", mono: true, sz: 15, sombreado: true, sinInd: true })).join("") +
  p("", { align: "center" }) +
  p("Salida de consola — node app/tests/pruebas-api.js", { align: "left", bold: true, sinInd: true }) +
  SALIDA_API.split("\n").map((l) => p(l, { align: "left", mono: true, sz: 15, sombreado: true, sinInd: true })).join("");

// --- Marcador 5: repositorio de GitHub e historial de commits (CONTENIDO REAL) ---
const nuevo5 =
  p("10. Repositorio de GitHub del equipo", { align: "left", bold: true, sz: 24, espacioAntes: 200 }) +
  p("Todo el código, la documentación y la evidencia de las pruebas están publicados en el siguiente repositorio:", { sinInd: true }) +
  pLink("rId13", REPO, REPO) +
  p("", { align: "center" }) +
  p("Historial de commits (git log --oneline)", { align: "left", bold: true, sinInd: true }) +
  GIT_LOG.split("\n").map((l) => p(l, { align: "left", mono: true, sz: 15, sombreado: true, sinInd: true })).join("") +
  p("", { align: "center" }) +
  p("Commits por integrante (git shortlog -sn)", { align: "left", bold: true, sinInd: true }) +
  SHORTLOG.split("\n").map((l) => p(l, { align: "left", mono: true, sz: 16, sombreado: true, sinInd: true })).join("") +
  p("Los roles PSP/TSP rotaron entre los integrantes durante el semestre, conforme a la metodología ABP y Aula Invertida de la guía.", { sinInd: true, cursiva: true });

// ---------- aplicacion ----------
const marcadores = [
  { texto: "INSERTAR AQUÍ ENLACE DE YOUTUBE DEL VIDEO", nuevo: nuevo1 },
  { texto: "CAPTURA DE PANTALLA DE LA PUBLICACIÓN EN EL FORO", nuevo: nuevo2 },
  { texto: "CAPTURAS DE AL MENOS 2 COMENTARIOS", nuevo: nuevo3 },
  { texto: "CAPTURAS DE LA EJECUCIÓN DE LAS PRUEBAS", nuevo: nuevo4 },
  { texto: "ENLACE DEL REPOSITORIO DE GITHUB DEL EQUIPO", nuevo: nuevo5 },
];

const rutaDoc = path.join(dirDoc, "word", "document.xml");
let xml = fs.readFileSync(rutaDoc, "utf8");
let reemplazos = 0;

for (const m of marcadores) {
  const re = new RegExp(`<w:p\\b[^>]*>(?:(?!</w:p>)[\\s\\S])*?${m.texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?</w:p>`);
  const r = re.exec(xml);
  if (!r) {
    console.log(`  [AVISO] no se encontro el marcador: ${m.texto}`);
    continue;
  }
  xml = xml.slice(0, r.index) + m.nuevo + xml.slice(r.index + r[0].length);
  reemplazos++;
  console.log(`  [OK] marcador reemplazado: ${m.texto.substring(0, 55)}...`);
}

fs.writeFileSync(rutaDoc, xml, "utf8");
console.log(`\nTotal marcadores reemplazados: ${reemplazos} de ${marcadores.length}`);