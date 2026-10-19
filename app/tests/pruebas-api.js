'use strict';

/**
 * Pruebas de la API REST (integración sobre HTTP real).
 * Cubre los escenarios de seguridad EP-10, EP-11 y EP-12 sobre el servidor.
 * Ejecución: node app/tests/pruebas-api.js
 */

const { crearServidor } = require('../src/server');

const linea = (c = '-') => c.repeat(78);
const peticion = (servidor, metodo, ruta, { token, cuerpo } = {}) =>
  new Promise((resolve) => {
    const { port } = servidor.address();
    const opciones = { host: '127.0.0.1', port, path: ruta, method: metodo, headers: {} };
    if (token) opciones.headers.Authorization = `Bearer ${token}`;
    if (cuerpo) {
      opciones.headers['Content-Type'] = 'application/json';
      opciones.headers['Content-Length'] = Buffer.byteLength(cuerpo);
    }
    const req = require('node:http').request(opciones, (res) => {
      let datos = '';
      res.on('data', (d) => (datos += d));
      res.on('end', () => resolve({ estado: res.statusCode, cuerpo: datos }));
    });
    if (cuerpo) req.write(cuerpo);
    req.end();
  });

const r = [];
const registrar = (id, nombre, ok, detalle) => {
  r.push({ id, nombre, ok });
  console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${id} ${nombre}`);
  console.log(`         ${detalle}`);
};

async function ejecutar() {
  console.log(linea('='));
  console.log('PRUEBAS DE INTEGRACION - API REST');
  console.log('Guia 6 - Estandares de Calidad ISO 9000 y Pruebas de Software');
  console.log(linea('='));
  console.log('');

  const servidor = crearServidor();
  await new Promise((res) => servidor.listen(0, '127.0.0.1', res));
  console.log(`  Servidor escuchando en 127.0.0.1:${servidor.address().port}`);
  console.log('');

  // Autenticación
  console.log(linea('-'));
  console.log('AUTENTICACION');
  console.log(linea('-'));

  const loginAdmin = await peticion(servidor, 'POST', '/api/login', { cuerpo: JSON.stringify({ usuario: 'admin', clave: 'admin123' }) });
  const admin = JSON.parse(loginAdmin.cuerpo);
  registrar('EP-10a', 'Login con credenciales validas (admin)', loginAdmin.estado === 200 && admin.rol === 'administrador',
    `POST /api/login admin/admin123 -> HTTP ${loginAdmin.estado}, rol=${admin.rol}, token=${admin.token}`);

  const loginMalo = await peticion(servidor, 'POST', '/api/login', { cuerpo: JSON.stringify({ usuario: 'admin', clave: 'incorrecta' }) });
  registrar('EP-10', 'Inicio de sesion con credenciales incorrectas', loginMalo.estado === 401,
    `POST /api/login admin/incorrecta -> HTTP ${loginMalo.estado} ${loginMalo.cuerpo.replace(/\s+/g, ' ')}`);

  const loginConsulta = await peticion(servidor, 'POST', '/api/login', { cuerpo: JSON.stringify({ usuario: 'consulta', clave: 'consulta123' }) });
  const consulta = JSON.parse(loginConsulta.cuerpo);
  console.log('');

  console.log(linea('-'));
  console.log('CONTROL DE ACCESO POR ROLES');
  console.log(linea('-'));

  const ok = await peticion(servidor, 'GET', '/api/productos', { token: admin.token });
  registrar('EP-11a', 'Administrador accede a modulo permitido', ok.estado === 200,
    `GET /api/productos token=${admin.token} -> HTTP ${ok.estado}`);

  const denegado = await peticion(servidor, 'GET', '/api/rrhh', { token: consulta.token });
  registrar('EP-11', 'Usuario estandar accede a modulo restringido', denegado.estado === 403,
    `GET /api/rrhh rol=consulta -> HTTP ${denegado.estado} ${denegado.cuerpo.replace(/\s+/g, ' ')}`);

  const sinToken = await peticion(servidor, 'GET', '/api/productos');
  registrar('EP-11b', 'Acceso sin token valido', sinToken.estado === 401, `GET /api/productos sin token -> HTTP ${sinToken.estado}`);
  console.log('');

  console.log(lineia2());
  console.log('INYECCION SQL');
  console.log(lineia2());

  const malicioso = await peticion(servidor, 'GET', `/api/buscar?q=${encodeURIComponent("' OR 1=1 --")}`, { token: admin.token });
  registrar('EP-12', 'Inyeccion SQL en campo de busqueda', malicioso.estado === 400,
    `GET /api/buscar?q=' OR 1=1 -- -> HTTP ${malicioso.estado} ${malicioso.cuerpo.replace(/\s+/g, ' ')}`);

  const limpio = await peticion(servidor, 'GET', '/api/buscar?q=Pan', { token: admin.token });
  registrar('EP-12b', 'Consulta legitima sigue funcionando', limpio.estado === 200,
    `GET /api/buscar?q=Pan -> HTTP ${limpio.estado} ${limpio.cuerpo.replace(/\s+/g, ' ')}`);
  console.log('');

  console.log(linea('-'));
  console.log('CALIDAD DE DATOS (ISO/IEC 25012 / 25024)');
  console.log(linea('-'));
  const datos = await peticion(servidor, 'GET', '/api/calidad/datos', { token: admin.token });
  console.log(`  ${datos.cuerpo.replace(/\s+/g, ' ')}`);
  console.log('');

  const total = r.length;
  const pasaron = r.filter((x) => x.ok).length;
  console.log(linea('='));
  console.log('RESUMEN DE LA EJECUCION - API');
  console.log(linea('='));
  for (const x of r) console.log(`  ${x.ok ? 'OK   ' : 'FALLA'} ${x.id}  ${x.nombre}`);
  console.log('');
  console.log(`  Casos ejecutados : ${total}/${total}`);
  console.log(`  Casos aprobados  : ${pasaron} (${((pasaron / total) * 100).toFixed(1)}%)`);
  console.log(`  Casos fallidos   : ${total - pasaron}`);
  console.log(linea('='));

  servidor.close();
}

function lineia2() {
  return '-'.repeat(78);
}

ejecutar().catch((e) => {
  console.error(e);
  process.exit(1);
});