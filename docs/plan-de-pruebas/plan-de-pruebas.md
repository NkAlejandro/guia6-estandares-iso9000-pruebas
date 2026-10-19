# Plan de Pruebas de la Aplicación del Proyecto de Semestre

**Guía 6 — Estándares de Calidad ISO 9000 y Pruebas de Software**
Universidad Manuela Beltrán · Ingeniería de Software · 2026

Este plan cubre la aplicación web con base de datos desarrollada en el semestre, con módulos de productos, pedidos, compras, inventario y recursos humanos.

---

## 1. Objetivo

Garantizar que la aplicación permita gestionar productos, pedidos, compras, inventario y personal de forma correcta, segura y conforme a los requisitos funcionales definidos.

---

## 2. Alcance

Módulo de productos, módulo de pedidos, módulo de compras, módulo de inventario, módulo de recursos humanos y control de acceso por roles.

---

## 3. Estrategia de Prueba

Se aplican pruebas funcionales, de regresión en cada entrega mediante el flujo de integración continua (CI) en GitHub, pruebas automatizadas de los flujos críticos y pruebas exploratorias.

---

## 4. Tipos de Pruebas a Aplicar

| Tipo | Descripción |
|---|---|
| Unitarias | Lógica de negocio en .NET (cálculo de totales, validaciones). |
| Integración | Interacción entre la capa de negocio, la interfaz y la base de datos. |
| Sistema | Aplicación completa en entorno de staging. |
| Aceptación | Validación contra los criterios del docente o cliente. |
| Seguridad | Autenticación, roles y protección frente a inyección SQL. |

---

## 5. Escenarios de Prueba

| ID | Módulo | Escenario | Datos de entrada | Resultado esperado |
|---|---|---|---|---|
| EP-01 | Productos | Crear producto válido | Nombre, precio > 0, categoría | Producto guardado y visible en el listado |
| EP-02 | Productos | Crear producto con precio negativo | Precio = -5 | Error de validación; no se guarda |
| EP-03 | Pedidos | Crear pedido con productos en stock | 2 productos, cantidad 1 | Pedido creado y total correcto |
| EP-04 | Pedidos | Pedido con cantidad superior al stock | Cantidad > existencias | Mensaje de stock insuficiente |
| EP-05 | Compras | Registrar compra a proveedor | Proveedor, productos, cantidades | Compra registrada e inventario aumentado |
| EP-06 | Inventario | Descuento de inventario al confirmar pedido | Pedido confirmado | Existencias disminuyen según el pedido |
| EP-07 | Inventario | Consultar producto sin existencias | Stock = 0 | Se muestra agotado |
| EP-08 | RR. HH. | Registrar empleado | Datos completos | Empleado guardado |
| EP-09 | RR. HH. | Registrar empleado con documento duplicado | Documento existente | Error de duplicado |
| EP-10 | Seguridad | Inicio de sesión con credenciales incorrectas | Usuario/clave inválidos | Acceso denegado |
| EP-11 | Seguridad | Usuario estándar accede a módulo restringido | Rol sin permiso | Acceso bloqueado |
| EP-12 | Seguridad | Inyección SQL en campo de búsqueda | `' OR 1=1 --` | Entrada rechazada o sanitizada |

> **Nota.** Ajustar a los módulos y reglas reales del proyecto.

---

## 6. Cronograma

| Fase | Fecha estimada | Responsable | Estado |
|---|---|---|---|
| Diseño de casos | 22/09/2026 | Analista de calidad | Completada |
| Configuración del entorno | 24/09/2026 | Desarrollador | Completada |
| Ejecución de pruebas | 27/09/2026 | Todo el equipo | Completada |
| Informe final | 29/09/2026 | Administrador del proyecto | Completada |

> **Nota.** Los roles PSP/TSP rotan según la metodología de la guía.

---

## 7. Recursos y Herramientas

**Herramientas:** Visual Studio, Postman, GitHub y Trello.
**Entornos:** local y staging.

---

## 8. Criterios de Entrada y Salida

- **Entrada:** requisitos aprobados, entorno listo y casos de prueba definidos.
- **Salida:** al menos 95 % de los casos ejecutados, 100 % de los defectos críticos resueltos e informe de calidad entregado.

---

## 9. Evidencia de la ejecución

El código de la aplicación y de las pruebas se encuentra en el repositorio del equipo:

**https://github.com/NkAlejandro/guia6-estandares-iso9000-pruebas**

### 9.1 Ejecución de los escenarios del plan

```bash
node app/tests/pruebas.js
```

**Salida real de la consola:**

```
  [PASS] EP-01  Productos  Crear producto valido
         Nombre=Cafe molido 500g, precio=18500, categoria=Bebidas -> guardado y visible en el listado
  [PASS] EP-02  Productos  Crear producto con precio negativo
         Precio=-5 -> El precio debe ser un número mayor que cero; no se guardo en la base de datos
  [PASS] EP-03  Pedidos    Crear pedido con productos en stock
         2 productos x cantidad 1 -> pedido id=1, total=7700 (esperado 7700), estado=CONFIRMADO
  [PASS] EP-04  Pedidos    Pedido con cantidad superior al stock
         Cantidad=999 -> Stock insuficiente
  [PASS] EP-05  Compras    Registrar compra a proveedor
         Proveedor=Distribuidora del Sur, cantidad=25 -> compra id=3, total=462500; inventario 0 -> 25
  [PASS] EP-06  Inventario Descuento de inventario al confirmar pedido
         Pedido confirmado, cantidad=3 -> existencia 25 - 3 = 22
  [PASS] EP-07  Inventario Consultar producto sin existencias
         Stock=0 -> se muestra agotado (agotado=true)
  [PASS] EP-08  RR. HH.    Registrar empleado
         Documento=1002345678, nombre=Ana Restrepo, cargo=Analista de calidad -> empleado guardado
  [PASS] EP-09  RR. HH.    Registrar empleado con documento duplicado
         Documento=1002345678 (existente) -> Ya existe un empleado con ese documento
  [PASS] EP-10  Seguridad  Inicio de sesion con credenciales incorrectas
         Usuario=admin, clave incorrecta -> acceso denegado (sesion=null)
  [PASS] EP-11  Seguridad  Usuario estandar accede a modulo restringido
         Rol=consulta, modulo=rrhh -> acceso bloqueado (puedeAcceder=false)
  [PASS] EP-12  Seguridad  Inyeccion SQL en campo de busqueda
         Entrada="' OR 1=1 --" -> rechazada o sanitizada por el validador de entrada (detectado=true)

  Casos de prueba ejecutados : 12/12
  Casos aprobados            : 12 (100.0%)
  Casos fallidos             : 0
  Defectos criticos          : 0
  Criterio de salida (< 95%) : CUMPLIDO
```

### 9.2 Pruebas de integración de la API REST

```bash
node app/tests/pruebas-api.js
```

```
  [PASS] EP-10  POST /api/login admin/incorrecta -> HTTP 401 { "error": "Credenciales invalidas" }
  [PASS] EP-11a GET /api/productos token=tok-1 -> HTTP 200
  [PASS] EP-11  GET /api/rrhh rol=consulta -> HTTP 403 { "error": "Acceso denegado al modulo rrhh para el rol consulta" }
  [PASS] EP-11b GET /api/productos sin token -> HTTP 401
  [PASS] EP-12  GET /api/buscar?q=' OR 1=1 -- -> HTTP 400 { "error": "Entrada rechazada: posible intento de inyeccion SQL" }
  [PASS] EP-12b GET /api/buscar?q=Pan -> HTTP 200

  Casos ejecutados : 7/7
  Casos aprobados  : 7 (100.0%)
  Casos fallidos   : 0
```

### 9.3 Capturas de pantalla

Las capturas se generan ejecutando el código y convirtiendo la salida real de la consola en
imagen (`npm run evidencia`). Están en la carpeta `evidencia/` del repositorio:

| Captura | Contenido |
|---|---|
| `evidencia/captura-01-pruebas-unitarias.png` | Salida de `node app/tests/pruebas.js` con los 12 escenarios |
| `evidencia/captura-02-pruebas-api.png` | Salida de `node app/tests/pruebas-api.js` con las pruebas de la API |

### 9.4 Incidencias detectadas y corregidas

Durante la ejecución se detectaron y corrigieron dos defectos reales:

1. **EP-03 falló** con `Error: Stock insuficiente` porque los datos de partida no registraban
   existencias para el segundo producto del pedido. Corrección: se agregó la compra de inventario.
2. **EP-12 tenía la aserción invertida**: reportaba FAIL cuando el validador *sí* detectaba el
   patrón malicioso, que es justamente el resultado esperado. Corrección: se ajustó la lógica.

Estos casos se documentan porque demuestran que las pruebas se ejecutaron y que el resultado
se verificó, en línea con el principio de que los datos cuantitativos deben analizarse
cuidadosamente para comprender lo que realmente significan.

---

## Referencias

- International Organization for Standardization. (2013). *ISO/IEC/IEEE 29119-3:2013 Software and systems engineering — Software testing — Part 3: Test documentation*. ISO.
- Pressman, R. S., & Maxim, B. R. (2021). *Ingeniería de software*. McGraw-Hill Interamericana.