# Evidencia de ejecución de pruebas

**Guía 6 — Estándares de Calidad ISO 9000 y Pruebas de Software**
UMB · Ingeniería de Software · 2026

Este directorio contiene la evidencia de la ejecución real de las pruebas definidas en
[`../docs/plan-de-pruebas/plan-de-pruebas.md`](../docs/plan-de-pruebas/plan-de-pruebas.md).

---

## Contenido

| Archivo | Descripción |
|---|---|
| `captura-01-pruebas-unitarias.png` | Captura de la salida de `node app/tests/pruebas.js` — 12 escenarios EP-01 a EP-12 |
| `captura-02-pruebas-api.png` | Captura de la salida de `node app/tests/pruebas-api.js` — pruebas de integración de la API REST |
| `salida-pruebas.txt` | Salida de consola de las pruebas unitarias, en texto plano |
| `salida-pruebas-api.txt` | Salida de consola de las pruebas de API, en texto plano |

---

## Cómo reproducir la evidencia

```bash
# Pruebas de los 12 escenarios del plan
node app/tests/pruebas.js

# Pruebas de integración de la API REST
node app/tests/pruebas-api.js

# Regenerar las capturas PNG a partir de la salida real
npm run evidencia
```

> Las capturas se generan ejecutando el código y convirtiendo la salida real de la
> consola en imagen. **No son imágenes editadas a mano.**

---

## Resultados obtenidos

### Pruebas de los escenarios del plan (EP-01 a EP-12)

```
  Casos de prueba ejecutados : 12/12
  Casos aprobados            : 12 (100.0%)
  Casos fallidos             : 0
  Defectos criticos          : 0
  Criterio de salida (< 95%) : CUMPLIDO
```

### Pruebas de integración de la API

```
  Casos ejecutados : 7/7
  Casos aprobados  : 7 (100.0%)
  Casos fallidos   : 0
```

### Desglose por escenario

| ID | Módulo | Escenario | Resultado |
|---|---|---|---|
| EP-01 | Productos | Crear producto válido | ✅ PASS |
| EP-02 | Productos | Crear producto con precio negativo | ✅ PASS |
| EP-03 | Pedidos | Crear pedido con productos en stock | ✅ PASS |
| EP-04 | Pedidos | Pedido con cantidad superior al stock | ✅ PASS |
| EP-05 | Compras | Registrar compra a proveedor | ✅ PASS |
| EP-06 | Inventario | Descuento de inventario al confirmar pedido | ✅ PASS |
| EP-07 | Inventario | Consultar producto sin existencias | ✅ PASS |
| EP-08 | RR. HH. | Registrar empleado | ✅ PASS |
| EP-09 | RR. HH. | Registrar empleado con documento duplicado | ✅ PASS |
| EP-10 | Seguridad | Inicio de sesión con credenciales incorrectas | ✅ PASS |
| EP-11 | Seguridad | Usuario estándar accede a módulo restringido | ✅ PASS |
| EP-12 | Seguridad | Inyección SQL en campo de búsqueda | ✅ PASS |

---

## Trazabilidad con las normas ISO/IEC 25000

| Norma | Evidencia obtenida |
|---|---|
| ISO/IEC 25010 | Características de calidad definidas en el análisis de requisitos |
| ISO/IEC 25012 | Completitud de datos: 100 % (4 de 4 registros completos) |
| ISO/IEC 25020 | Método de medición definido en el plan de pruebas |
| ISO/IEC 25021 | Indicadores: casos ejecutados, aprobados y fallidos |
| ISO/IEC 25022 | Criterios de aceptación validados por el docente |
| ISO/IEC 25023 | Pruebas técnicas sobre la API REST real |
| ISO/IEC 25024 | Validación de información: 0 registros duplicados |

---

## Incidencias encontradas durante la ejecución

Dos defectos reales se detectaron y corrigieron mientras se escribían las pruebas:

1. **EP-03 falló en la primera ejecución** con `Error: Stock insuficiente`. Causa: los datos
   de partida no registraban existencias para el segundo producto del pedido. Se corrigió
   agregando la compra de inventario correspondiente.
2. **EP-12 tenía la aserción invertida**: reportaba FAIL cuando el validador *sí* detectaba el
   patrón malicioso, que es justamente el resultado esperado. Se corrigió la lógica para que
   el caso pase cuando la entrada es rechazada o sanitizada.

Ambos casos quedan documentados porque son la evidencia de que las pruebas realmente se
ejecutaron y que el resultado se verificó, en línea con el principio de que los datos
cuantitativos deben analizarse cuidadosamente.