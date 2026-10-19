'use strict';

const http = require('node:http');
const { BaseDeDatos } = require('./database');

/**
 * API REST de la aplicación web con base de datos.
 * Módulos: productos, pedidos, compras, inventario, recursos humanos, control de acceso por roles.
 */

const RUTAS_PERMITIDAS = {
  'GET /api/productos': 'productos',
  'GET /api/inventario': 'inventario',
  'GET /api/rrhh': 'rrhh',
};

function crearServidor(db = new BaseDeDatos()) {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const partes = url.pathname.split('/').filter(Boolean);

    const responder = (codigo, cuerpo) => {
      res.writeHead(codigo, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(cuerpo, null, 2));
    };

    // POST /api/login  { usuario, clave } -> { token, rol }
    if (url.pathname === '/api/login' && req.method === 'POST') {
      let cuerpo = '';
      req.on('data', (c) => (cuerpo += c));
      req.on('end', () => {
        try {
          const { usuario, clave } = JSON.parse(cuerpo || '{}');
          const u = db.autenticar(usuario, clave);
          if (!u) return responder(401, { error: 'Credenciales invalidas' });
          return responder(200, { token: `tok-${u.id}`, rol: u.rol, usuario: u.usuario });
        } catch {
          return responder(400, { error: 'JSON invalido' });
        }
      });
      return;
    }

    // Control de acceso por rol
    const clave = RUTAS_PERMITIDAS[`${req.method} ${url.pathname}`];
    if (clave) {
      const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
      const sesion = db.db.prepare('SELECT rol FROM usuarios WHERE id = ?').get(Number((token || '').replace('tok-', '')));
      if (!sesion) return responder(401, { error: 'Token invalido' });
      if (!db.puedeAcceder(sesion.rol, clave)) {
        return responder(403, { error: `Acceso denegado al modulo ${clave} para el rol ${sesion.rol}` });
      }
    }

    // Sanitización de entradas contra inyección SQL
    if (partes[0] === 'api' && partes[1] === 'buscar' && req.method === 'GET') {
      const q = url.searchParams.get('q') || '';
      if (/('|--|\bOR\b|\bAND\b|;)/i.test(q)) {
        return responder(400, { error: 'Entrada rechazada: posible intento de inyeccion SQL' });
      }
      const filas = db.db.prepare('SELECT nombre FROM productos WHERE nombre LIKE ?').all(`%${q}%`);
      return responder(200, { resultados: filas });
    }

    if (req.method === 'GET' && url.pathname === '/api/inventario') {
      return responder(200, db.consultarInventario());
    }
    if (req.method === 'GET' && url.pathname === '/api/productos') {
      return responder(200, db.listarProductos());
    }
    if (req.method === 'GET' && url.pathname === '/api/rrhh') {
      return responder(200, db.listarEmpleados());
    }
    if (req.method === 'GET' && url.pathname === '/api/calidad/datos') {
      return responder(200, { completitud: db.completitudDatos(), duplicados: db.duplicados() });
    }

    responder(404, { error: 'Ruta no encontrada' });
  });
}

module.exports = { crearServidor };

if (require.main === module) {
  const puerto = Number(process.env.PORT) || 3000;
  crearServidor().listen(puerto, () => {
    console.log(`API escuchando en http://localhost:${puerto}`);
  });
}