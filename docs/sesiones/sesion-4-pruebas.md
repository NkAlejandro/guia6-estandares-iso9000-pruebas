# Sesión 4 — Revisión de compañeros y tipos de pruebas de software

**Guía 6 — Estándares de Calidad ISO 9000 y Pruebas de Software**
Universidad Manuela Beltrán · Ingeniería de Software · 2026

---

## 1. Tipos de pruebas de software en una empresa de desarrollo

Las pruebas buscan verificar que el software cumple los requisitos, detectar defectos antes de que lleguen al usuario y aumentar la confianza en el producto.

### Tabla 3 — Tipos de pruebas de software

| Tipo de prueba | Descripción | Ejemplo en el proyecto |
|---|---|---|
| Unitarias | Verifican componentes individuales (funciones, clases). | Calcular el total de un pedido. |
| Integración | Comprueban que los módulos funcionen juntos. | Compra que actualiza el inventario. |
| Sistema | Evalúan el sistema completo. | Flujo completo en ambiente de staging. |
| Aceptación | Validan los criterios del cliente o usuario. | El docente valida los requisitos. |
| Funcionales | Comprueban que cada función haga lo esperado. | Crear un producto. |
| No funcionales | Rendimiento, seguridad, usabilidad. | Tiempo de respuesta del listado. |
| Regresión | Verifican que los cambios no dañen lo existente. | Ejecutar pruebas en cada commit (CI). |
| Automatizadas | Se ejecutan con herramientas y son repetibles. | xUnit o Selenium. |
| Exploratorias | Se basan en la experiencia del tester, sin guion. | Probar datos inesperados en formularios. |

> **Nota.** Elaboración propia a partir de la guía de laboratorio No. 6.

### Figura 2 — Mapa conceptual de los tipos de pruebas de software

```
                        TIPOS DE PRUEBAS
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
  Según el NIVEL         Según el OBJETIVO        Según la EJECUCIÓN
        │                      │                      │
   ┌────┼────┐            ┌────┼────┐            ┌─────┴─────┐
   │    │    │            │    │    │            │           │
   ▼    ▼    ▼            ▼    ▼    ▼            ▼           ▼
Unitaria Integ. Sistema  Func. No func. Regresión  Automat. Explorat.
   │      │      │         │      │      │          │           │
   └──────┴──────┴─────────┴──────┴──────┘          └───────────┘
          │                                             │
          │                                             │
  Verifican          Comprueban funciones,      Se ejecutan con      Se basan en la
  niveles del        rendimiento, seguridad,     herramientas y      experiencia del
  sistema            usabilidad y que los        son repetibles      tester, sin guion
                     cambios no dañen
                     lo existente
```

> **Nota.** Elaboración propia.
>
> *En el documento Word final, esta figura se reemplaza por el mapa conceptual exigido por la guía.*

---

## 2. Comentarios a publicaciones de compañeros

> **Pendiente de completar por el equipo.** La guía exige insertar las capturas de **al menos 2 comentarios** hechos a publicaciones de compañeros (nombre del compañero, enlace y texto del comentario).
>
> | # | Compañero | Enlace a su publicación | Texto del comentario | Captura |
> |---|---|---|---|---|
> | 1 | [pendiente] | [pendiente] | [pendiente] | [INSERTAR CAPTURA] |
> | 2 | [pendiente] | [pendiente] | [pendiente] | [INSERTAR CAPTURA] |
>
> Estos comentarios deben publicarse realmente en el foro antes de tomar la captura; el equipo debe usar su propio palabras y opinión técnica.

---

## Referencias

- International Organization for Standardization. (2013). *ISO/IEC/IEEE 29119-3:2013 Software and systems engineering — Software testing — Part 3: Test documentation*. ISO.
- Pressman, R. S., & Maxim, B. R. (2021). *Ingeniería de software*. McGraw-Hill Interamericana.