# Guía 6 — Estándares de Calidad ISO 9000 y Pruebas de Software

**Universidad Manuela Beltrán** — Facultad de Ingeniería · Programa de Ingeniería de Software
**Asignatura:** Estándares y Métricas de Calidad de Software
**Guía:** No. 6 · **Bogotá D.C., Colombia** · **2026**

---

## Integrantes

| Rol PSP/TSP (rotativo) | Integrante | GitHub |
|---|---|---|
| Administrador del Proyecto | Juan Esteban Vanegas Torres | @juan-vanegas |
| Desarrollador | Diego Steven Rojas Martinez | @diego-rojas |
| Desarrollador / Tester | Jonathan Soler Guevara | @jonathan-soler |
| Analista de Calidad | Miguel Alejandro Vanegas Carrilo | @miguel-vanegas |

> Según la metodología de la guía (ABP + Aula Invertida + PSP/TSP), los roles rotan entre los integrantes. La evidencia del trabajo colaborativo se verifica en el historial de commits: `git log --oneline --graph --all`.

---

## ¿Qué contiene este repositorio?

```
GUIA06_ESTANDARES_GITHUB/
├── README.md
├── .gitignore
└── docs/
    ├── marco-conceptual-iso25000.md
    ├── normas-aplicadas-25010-25024.md
    ├── trabajo-autonomo-ingles.md
    ├── plan-de-pruebas/
    │   └── plan-de-pruebas.md
    ├── sesiones/
    │   ├── sesion-1-iso9000.md
    │   ├── sesion-2-ventajas-desventajas.md
    │   └── sesion-4-pruebas.md
    └── referencias/
        └── referencias-apa7.md
```

---

## Resultado de aprendizaje de la unidad

> Identifica el contexto, clasificación e importancia de la norma ISO/IEC 25000 en el programa de Ingeniería de Software, mediante la elaboración de un mapa conceptual.

---

## Resumen del marco teórico

### Familia ISO/IEC 25000 (SQuaRE)

La familia de normas **ISO/IEC 25000**, conocida como *SQuaRE* (*Systems and Software Quality Requirements and Evaluation*), establece un marco internacional para definir requisitos de calidad, utilizar modelos de calidad, realizar mediciones y evaluar productos de software y sistemas.

Su propósito principal es proporcionar criterios que permitan determinar si un producto de software cumple con las necesidades de los usuarios y los requisitos establecidos durante su desarrollo.

En Ingeniería de Software esta familia es importante porque permite evaluar no solamente el funcionamiento de una aplicación, sino también características como su rendimiento, seguridad, fiabilidad, facilidad de mantenimiento y capacidad de adaptación. Además, proporciona una base para que los equipos de desarrollo, analistas de calidad y responsables de proyectos puedan tomar decisiones fundamentadas en indicadores y resultados de evaluación.

### Clasificación de la familia ISO/IEC 25000

| División | Clasificación | Función principal |
|---|---|---|
| ISO/IEC 2500n | Gestión de calidad | Establece conceptos y orientaciones generales |
| ISO/IEC 2501n | Modelos de calidad | Define características para evaluar sistemas, software y datos |
| ISO/IEC 2502n | Medición de calidad | Establece medidas y procedimientos de medición |
| ISO/IEC 2503n | Requisitos de calidad | Orienta la especificación de requisitos de calidad |
| ISO/IEC 2504n | Evaluación de calidad | Proporciona procesos y criterios de evaluación |
| ISO/IEC 25050–25099 | Extensiones | Incluye normas complementarias para necesidades específicas |

### Importancia de ISO/IEC 25000 en Ingeniería de Software

La aplicación de esta familia de normas permite establecer un enfoque sistemático para garantizar la calidad de los productos informáticos. Entre sus principales aportes se encuentran la identificación temprana de problemas, la definición de requisitos medibles, la evaluación de la seguridad y el rendimiento, la reducción de defectos y la mejora continua de los procesos de desarrollo.

Por ejemplo, al desarrollar una aplicación web que administra información de usuarios, ISO/IEC 25000 permite establecer criterios para verificar que el sistema responda correctamente, proteja los datos, facilite la navegación y mantenga su funcionamiento ante diferentes condiciones de uso.

De esta manera, la calidad del software deja de depender únicamente de la percepción de los desarrolladores y puede evaluarse mediante características, medidas y criterios definidos.

---

## Normas aplicadas en el proceso de desarrollo

Se elaboró un informe sobre la aplicación de las normas **ISO/IEC 25010, 25012, 25020, 25021, 25022, 25023 y 25024** en un proceso de desarrollo de software. El detalle completo está en [`docs/normas-aplicadas-25010-25024.md`](docs/normas-aplicadas-25010-25024.md).

### Aplicación conjunta en un proceso de desarrollo

| Etapa del desarrollo | Norma aplicable | Actividad propuesta |
|---|---|---|
| Análisis de requisitos | ISO/IEC 25010 | Identificar características de calidad del sistema |
| Diseño de base de datos | ISO/IEC 25012 | Definir reglas de integridad y consistencia |
| Planificación de pruebas | ISO/IEC 25020 | Establecer métodos de medición |
| Desarrollo | ISO/IEC 25021 | Definir y recopilar medidas de calidad |
| Pruebas con usuarios | ISO/IEC 25022 | Evaluar eficacia, eficiencia y satisfacción |
| Pruebas técnicas | ISO/IEC 25023 | Medir rendimiento, fiabilidad y comportamiento |
| Validación de información | ISO/IEC 25024 | Comprobar completitud y exactitud de datos |

---

## Plan de pruebas

El plan completo está en [`docs/plan-de-pruebas/plan-de-pruebas.md`](docs/plan-de-pruebas/plan-de-pruebas.md). Cubre la aplicación web con base de datos del semestre, con módulos de productos, pedidos, compras, inventario y recursos humanos.

---

## Metodología de trabajo (ABP + Aula Invertida + PSP/TSP)

- **PRE-CLASE:** Revisión del marco teórico y subida de avances al repositorio.
- **EN CLASE:** Validación de comprensión, peer-review entre grupos y demo del avance.
- **POST-CLASE:** Refinar e integrar retroalimentación; actualizar el repositorio.

El trabajo en equipo se evidencia en el historial de commits. Cada integrante trabaja en su rama y abre pull request a `main`.

```bash
git log --oneline --graph --all
```

---

## Palabras clave

`ISO 9000` · `ISO/IEC 25000 (SQuaRE)` · `Pruebas de software` · `ISO/IEC 29119` · `Calidad del producto`

---

## Referencias

Ver [`docs/referencias/referencias-apa7.md`](docs/referencias/referencias-apa7.md) con el formato APA 7.ª edición exigido por la guía.

---

*Universidad Manuela Beltrán · Guía de Laboratorio No. 6 · Estándares de Calidad ISO 9000 y Pruebas de Software*