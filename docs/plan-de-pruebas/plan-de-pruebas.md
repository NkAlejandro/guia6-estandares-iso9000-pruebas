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

| Fase | Fecha estimada | Responsable |
|---|---|---|
| Diseño de casos | [fecha] | Analista de calidad |
| Configuración del entorno | [fecha] | Desarrollador |
| Ejecución de pruebas | [fecha] | Todo el equipo |
| Informe final | [fecha] | Administrador del proyecto |

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

## Referencias

- International Organization for Standardization. (2013). *ISO/IEC/IEEE 29119-3:2013 Software and systems engineering — Software testing — Part 3: Test documentation*. ISO.
- Pressman, R. S., & Maxim, B. R. (2021). *Ingeniería de software*. McGraw-Hill Interamericana.