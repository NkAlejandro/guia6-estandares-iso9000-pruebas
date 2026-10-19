'use strict';

const { DatabaseSync } = require('node:sqlite');

/**
 * Capa de acceso a datos — SQLite (node:sqlite, sin dependencias externas).
 * Módulos: productos, pedidos, compras, inventario, recursos humanos, control de acceso.
 */

const ESQUEMA = `
CREATE TABLE IF NOT EXISTS usuarios (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario  TEXT    NOT NULL UNIQUE,
  clave    TEXT    NOT NULL,
  rol      TEXT    NOT NULL CHECK (rol IN ('administrador','operador','consulta'))
);

CREATE TABLE IF NOT EXISTS productos (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre    TEXT    NOT NULL UNIQUE,
  precio    REAL    NOT NULL CHECK (precio > 0),
  categoria TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS inventario (
  producto_id INTEGER PRIMARY KEY REFERENCES productos(id),
  existencia  INTEGER NOT NULL DEFAULT 0 CHECK (existencia >= 0)
);

CREATE TABLE IF NOT EXISTS pedidos (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario  TEXT    NOT NULL,
  total    REAL    NOT NULL,
  estado   TEXT    NOT NULL DEFAULT 'CONFIRMADO'
);

CREATE TABLE IF NOT EXISTS detalle_pedido (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  pedido_id   INTEGER NOT NULL REFERENCES pedidos(id),
  producto_id INTEGER NOT NULL REFERENCES productos(id),
  cantidad    INTEGER NOT NULL CHECK (cantidad > 0)
);

CREATE TABLE IF NOT EXISTS compras (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  proveedor  TEXT    NOT NULL,
  total      REAL    NOT NULL
);

CREATE TABLE IF NOT EXISTS detalle_compra (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  compra_id   INTEGER NOT NULL REFERENCES compras(id),
  producto_id INTEGER NOT NULL REFERENCES productos(id),
  cantidad    INTEGER NOT NULL CHECK (cantidad > 0)
);

CREATE TABLE IF NOT EXISTS empleados (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  documento TEXT    NOT NULL UNIQUE,
  nombre    TEXT    NOT NULL,
  cargo     TEXT    NOT NULL
);
`;

class BaseDeDatos {
  constructor(ruta = ':memory:') {
    this.db = new DatabaseSync(ruta);
    this.db.exec('PRAGMA foreign_keys = ON;');
    this.db.exec(ESQUEMA);
    this.#sembrar();
  }

  #sembrar() {
    const insUsuario = this.db.prepare('INSERT INTO usuarios (usuario, clave, rol) VALUES (?, ?, ?)');
    insUsuario.run('admin', 'admin123', 'administrador');
    insUsuario.run('operador', 'oper123', 'operador');
    insUsuario.run('consulta', 'consulta123', 'consulta');
  }

  // ---------- Autenticación y roles ----------
  autenticar(usuario, clave) {
    const u = this.db.prepare('SELECT * FROM usuarios WHERE usuario = ?').get(usuario);
    if (!u || u.clave !== clave) return null;
    return { id: u.id, usuario: u.usuario, rol: u.rol };
  }

  puedeAcceder(rol, modulo) {
    const permisos = {
      administrador: ['productos', 'pedidos', 'compras', 'inventario', 'rrhh'],
      operador: ['productos', 'pedidos', 'compras', 'inventario'],
      consulta: ['productos', 'inventario'],
    };
    return (permisos[rol] || []).includes(modulo);
  }

  // ---------- Productos ----------
  crearProducto({ nombre, precio, categoria }) {
    if (typeof precio !== 'number' || precio <= 0) {
      throw new Error('El precio debe ser un número mayor que cero');
    }
    const r = this.db
      .prepare('INSERT INTO productos (nombre, precio, categoria) VALUES (?, ?, ?)')
      .run(nombre, precio, categoria);
    this.db.prepare('INSERT INTO inventario (producto_id, existencia) VALUES (?, 0)').run(r.lastInsertRowid);
    return { id: Number(r.lastInsertRowid), nombre, precio, categoria };
  }

  listarProductos() {
    return this.db
      .prepare('SELECT p.*, i.existencia FROM productos p JOIN inventario i ON i.producto_id = p.id ORDER BY p.id')
      .all();
  }

  // ---------- Pedidos ----------
  crearPedido({ usuario, items }) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('El pedido debe tener al menos un producto');
    }
    const total = items.reduce((suma, it) => {
      const p = this.db.prepare('SELECT precio FROM productos WHERE id = ?').get(it.productoId);
      if (!p) throw new Error(`Producto ${it.productoId} no encontrado`);
      const inv = this.db.prepare('SELECT existencia FROM inventario WHERE producto_id = ?').get(it.productoId);
      if (inv.existencia < it.cantidad) {
        throw new Error('Stock insuficiente');
      }
      return suma + p.precio * it.cantidad;
    }, 0);

    const ped = this.db
      .prepare('INSERT INTO pedidos (usuario, total) VALUES (?, ?)')
      .run(usuario, Number(total.toFixed(2)));

    const det = this.db.prepare('INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)');
    const descontar = this.db.prepare('UPDATE inventario SET existencia = existencia - ? WHERE producto_id = ?');

    for (const it of items) {
      det.run(Number(ped.lastInsertRowid), it.productoId, it.cantidad);
      descontar.run(it.cantidad, it.productoId);
    }

    return { id: Number(ped.lastInsertRowid), usuario, total: Number(total.toFixed(2)), estado: 'CONFIRMADO' };
  }

  // ---------- Compras ----------
  registrarCompra({ proveedor, items }) {
    if (!proveedor) throw new Error('El proveedor es obligatorio');
    const total = items.reduce((s, it) => {
      const p = this.db.prepare('SELECT precio FROM productos WHERE id = ?').get(it.productoId);
      if (!p) throw new Error(`Producto ${it.productoId} no encontrado`);
      return s + p.precio * it.cantidad;
    }, 0);

    const c = this.db.prepare('INSERT INTO compras (proveedor, total) VALUES (?, ?)').run(proveedor, Number(total.toFixed(2)));
    const det = this.db.prepare('INSERT INTO detalle_compra (compra_id, producto_id, cantidad) VALUES (?, ?, ?)');
    const sumar = this.db.prepare('UPDATE inventario SET existencia = existencia + ? WHERE producto_id = ?');

    for (const it of items) {
      det.run(Number(c.lastInsertRowid), it.productoId, it.cantidad);
      sumar.run(it.cantidad, it.productoId);
    }

    return { id: Number(c.lastInsertRowid), proveedor, total: Number(total.toFixed(2)) };
  }

  // ---------- Inventario ----------
  consultarStock(productoId) {
    const r = this.db
      .prepare('SELECT p.nombre, p.precio, i.existencia FROM productos p JOIN inventario i ON i.producto_id = p.id WHERE p.id = ?')
      .get(productoId);
    if (!r) return null;
    return { ...r, agotado: r.existencia === 0 };
  }

  consultarInventario() {
    return this.db
      .prepare('SELECT p.id, p.nombre, p.categoria, p.precio, i.existencia FROM productos p JOIN inventario i ON i.producto_id = p.id ORDER BY p.id')
      .all();
  }

  // ---------- Recursos Humanos ----------
  registrarEmpleado({ documento, nombre, cargo }) {
    const existe = this.db.prepare('SELECT 1 FROM empleados WHERE documento = ?').get(documento);
    if (existe) throw new Error('Ya existe un empleado con ese documento');
    const r = this.db.prepare('INSERT INTO empleados (documento, nombre, cargo) VALUES (?, ?, ?)').run(documento, nombre, cargo);
    return { id: Number(r.lastInsertRowid), documento, nombre, cargo };
  }

  listarEmpleados() {
    return this.db.prepare('SELECT * FROM empleados ORDER BY id').all();
  }

  // ---------- Calidad de datos (ISO/IEC 25012 y 25024) ----------
  completitudDatos() {
    const total = this.db.prepare('SELECT COUNT(*) AS n FROM productos').get().n;
    const completos = this.db
      .prepare("SELECT COUNT(*) AS n FROM productos WHERE nombre IS NOT NULL AND precio IS NOT NULL AND categoria IS NOT NULL AND TRIM(nombre) <> '' AND TRIM(categoria) <> ''")
      .get().n;
    return {
      totalRegistros: total,
      registrosCompletos: completos,
      completitud: total === 0 ? 100 : Number(((completos / total) * 100).toFixed(1)),
    };
  }

  duplicados() {
    return this.db.prepare('SELECT nombre, COUNT(*) AS n FROM productos GROUP BY nombre HAVING n > 1').all();
  }
}

module.exports = { BaseDeDatos };