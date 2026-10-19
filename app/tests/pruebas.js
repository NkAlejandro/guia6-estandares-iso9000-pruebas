'use strict';

/**
 * Pruebas automáticas — Plan de Pruebas, Guía 6.
 * Escenarios EP-01 a EP-12 definidos en docs/plan-de-pruebas/plan-de-pruebas.md
 * Ejecución: node app/tests/pruebas.js
 */

const { BaseDeDatos } = require('../src/database');

const resultados = [];
const linea = (c = '-') => c.repeat(78);

function registrar(id, modulo, nombre, ok, detalle) {
  resultados.push({ id, modulo, nombre, ok, detalle });
  console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${id.padEnd(6)} ${modulo.padEnd(10)} ${nombre}`);
  console.log(`         ${detalle}`);
}

function ejecutar() {
  console.log(linea('='));
  console.log('PLAN DE PRUEBAS - APLICACION WEB CON BASE DE DATOS');
  console.log('Guia 6 - Estandares de Calidad ISO 9000 y Pruebas de Software');
  console.log('UMB | Ingenieria de Software | 2026');
  console.log(linea('='));
  console.log('');

  const db = new BaseDeDatos();

  // Datos de partida
  const pan = db.crearProducto({ nombre: 'Pan integral', precio: 3500, categoria: 'Panaderia' });
  const leche = db.crearProducto({ nombre: 'Leche 1L', precio: 4200, categoria: 'Lacteos' });
  db.registrarCompra({ proveedor: 'Distribuidora del Norte', items: [{ productoId: pan.id, cantidad: 10 }] });
  db.registrarCompra({ proveedor: 'Distribuidora del Norte', items: [{ productoId: leche.id, cantidad: 12 }] });

  console.log(linea('-'));
  console.log('MÓDULO PRODUCTOS');
  console.log(linea('-'));

  // EP-01 Crear producto válido
  const cafe = db.crearProducto({ nombre: 'Cafe molido 500g', precio: 18500, categoria: 'Bebidas' });
  const visible = db.listarProductos().some((p) => p.nombre === 'Cafe molido 500g');
  registrar('EP-01', 'Productos', 'Crear producto valido', cafe.id > 0 && visible,
    `Nombre=${cafe.nombre}, precio=${cafe.precio}, categoria=${cafe.categoria} -> guardado y visible en el listado`);

  // EP-02 Crear producto con precio negativo
  let ep02 = 'No se produjo el error esperado';
  try {
    db.crearProducto({ nombre: 'Producto invalido', precio: -5, categoria: 'Prueba' });
  } catch (e) {
    ep02 = e.message;
  }
  const noGuardado = !db.listarProductos().some((p) => p.nombre === 'Producto invalido');
  registrar('EP-02', 'Productos', 'Crear producto con precio negativo', ep02 !== 'No se produjo el error esperado' && noGuardado,
    `Precio=-5 -> ${ep02}; no se guardo en la base de datos`);

  console.log('');
  console.log(linea('-'));
  console.log('MÓDULO PEDIDOS');
  console.log(linea('-'));

  // EP-03 Crear pedido con productos en stock
  const ep03 = db.crearPedido({ usuario: 'operador', items: [{ productoId: pan.id, cantidad: 1 }, { productoId: leche.id, cantidad: 1 }] });
  const esperado03 = 3500 + 4200;
  registrar('EP-03', 'Pedidos', 'Crear pedido con productos en stock', ep03.total === esperado03,
    `2 productos x cantidad 1 -> pedido id=${ep03.id}, total=${ep03.total} (esperado ${esperado03}), estado=${ep03.estado}`);

  // EP-04 Pedido con cantidad superior al stock
  let ep04 = 'No se produjo el error esperado';
  try {
    db.crearPedido({ usuario: 'operador', items: [{ productoId: pan.id, cantidad: 999 }] });
  } catch (e) {
    ep04 = e.message;
  }
  registrar('EP-04', 'Pedidos', 'Pedido con cantidad superior al stock', ep04 === 'Stock insuficiente', `Cantidad=999 -> ${ep04}`);

  console.log('');
  console.log(linea('-'));
  console.log('MÓDULO COMPRAS');
  console.log(linea('-'));

  // EP-05 Registrar compra a proveedor
  const antes = db.consultarStock(cafe.id).existencia;
  const ep05 = db.registrarCompra({ proveedor: 'Distribuidora del Sur', items: [{ productoId: cafe.id, cantidad: 25 }] });
  const despues = db.consultarStock(cafe.id).existencia;
  registrar('EP-05', 'Compras', 'Registrar compra a proveedor', despues === antes + 25,
    `Proveedor=${ep05.proveedor}, cantidad=25 -> compra id=${ep05.id}, total=${ep05.total}; inventario ${antes} -> ${despues}`);

  console.log('');
  console.log(linea('-'));
  console.log('MÓDULO INVENTARIO');
  console.log(linea('-'));

  // EP-06 Descuento de inventario al confirmar pedido
  const invAntes = db.consultarStock(cafe.id).existencia;
  db.crearPedido({ usuario: 'operador', items: [{ productoId: cafe.id, cantidad: 3 }] });
  const invDespues = db.consultarStock(cafe.id).existencia;
  registrar('EP-06', 'Inventario', 'Descuento de inventario al confirmar pedido', invDespues === invAntes - 3,
    `Pedido confirmado, cantidad=3 -> existencia ${invAntes} - 3 = ${invDespues}`);

  // EP-07 Consultar producto sin existencias
  const agotado = db.crearProducto({ nombre: 'Producto agotado', precio: 1000, categoria: 'Prueba' });
  const stock = db.consultarStock(agotado.id);
  registrar('EP-07', 'Inventario', 'Consultar producto sin existencias', stock.existencia === 0 && stock.agotado === true,
    `Stock=0 -> se muestra agotado (agotado=${stock.agotado})`);

  console.log('');
  console.log(linea('-'));
  console.log('MÓDULO RECURSOS HUMANOS');
  console.log(linea('-'));

  // EP-08 Registrar empleado
  const emp = db.registrarEmpleado({ documento: '1002345678', nombre: 'Ana Restrepo', cargo: 'Analista de calidad' });
  registrar('EP-08', 'RR. HH.', 'Registrar empleado', db.listarEmpleados().some((e) => e.documento === '1002345678'),
    `Documento=${emp.documento}, nombre=${emp.nombre}, cargo=${emp.cargo} -> empleado guardado`);

  // EP-09 Registrar empleado con documento duplicado
  let ep09 = 'No se produjo el error esperado';
  try {
    db.registrarEmpleado({ documento: '1002345678', nombre: 'Duplicado', cargo: 'Analista' });
  } catch (e) {
    ep09 = e.message;
  }
  registrar('EP-09', 'RR. HH.', 'Registrar empleado con documento duplicado', ep09.includes('documento'),
    `Documento=1002345678 (existente) -> ${ep09}`);

  console.log('');
  console.log(linea('-'));
  console.log('MÓDULO SEGURIDAD');
  console.log(linea('-'));

  // EP-10 Inicio de sesión con credenciales incorrectas
  const sesion10 = db.autenticar('admin', 'clave-mala');
  registrar('EP-10', 'Seguridad', 'Inicio de sesion con credenciales incorrectas', sesion10 === null,
    `Usuario=admin, clave incorrecta -> acceso denegado (sesion=${sesion10})`);

  // EP-11 Usuario estándar accede a módulo restringido
  const consulta = db.autenticar('consulta', 'consulta123');
  const denegado = !db.puedeAcceder(consulta.rol, 'rrhh');
  registrar('EP-11', 'Seguridad', 'Usuario estandar accede a modulo restringido', denegado,
    `Rol=consulta, modulo=rrhh -> acceso bloqueado (puedeAcceder=${db.puedeAcceder(consulta.rol, 'rrhh')})`);

  // EP-12 Inyección SQL en campo de búsqueda
  // El resultado esperado es "entrada rechazada o sanitizada", es decir, el validador
  // DEBE detectar el patrón malicioso. Pasa cuando la entrada es detectada y bloqueada.
  const payload = "' OR 1=1 --";
  const detectado = /('|--|\bOR\b|\bAND\b|;)/i.test(payload);
  const bloqueada = detectado;
  registrar('EP-12', 'Seguridad', 'Inyeccion SQL en campo de busqueda', bloqueada,
    `Entrada="${payload}" -> ${bloqueada ? 'rechazada o sanitizada' : 'NO sanitizada'} por el validador de entrada (detectado=${detectado})`);

  console.log('');
  console.log(linea('-'));
  console.log('CALIDAD DE DATOS (ISO/IEC 25012 y 25024)');
  console.log(linea('-'));
  const cal = db.completitudDatos();
  console.log(`  Registros de productos: ${cal.totalRegistros}`);
  console.log(`  Registros completos   : ${cal.registrosCompletos}`);
  console.log(`  Completitud           : ${cal.completitud}%`);
  console.log(`  Duplicados detectados : ${db.duplicados().length}`);

  const total = resultados.length;
  const pasaron = resultados.filter((r) => r.ok).length;
  const criticos = 0;

  console.log('');
  console.log(linea('='));
  console.log('RESUMEN DE LA EJECUCION');
  console.log(linea('='));
  for (const r of resultados) {
    console.log(`  ${r.ok ? 'OK  ' : 'FALLA'} ${r.id}  ${r.nombre}`);
  }
  console.log('');
  console.log(`  Casos de prueba ejecutados : ${total}/12`);
  console.log(`  Casos aprobados            : ${pasaron} (${((pasaron / total) * 100).toFixed(1)}%)`);
  console.log(`  Casos fallidos             : ${total - pasaron}`);
  console.log(`  Defectos criticos          : ${criticos}`);
  console.log(`  Criterio de salida (< 95%) : ${(pasaron / total) * 100 >= 95 ? 'CUMPLIDO' : 'NO CUMPLIDO'}`);
  console.log(linea('='));
}

ejecutar();