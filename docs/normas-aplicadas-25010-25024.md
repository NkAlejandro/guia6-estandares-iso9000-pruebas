# Informe — Aplicación de las normas ISO/IEC 25010, 25012, 25020, 25021, 25022, 25023 y 25024

**Guía 6 — Estándares de Calidad ISO 9000 y Pruebas de Software**
Universidad Manuela Beltrán · Ingeniería de Software · 2026

---

## ISO/IEC 25010: Modelo de calidad del producto

Esta norma establece un modelo de referencia para identificar y evaluar características de calidad de los productos de software.

La edición **ISO/IEC 25010:2023** establece nueve características de calidad del producto, entre ellas la adecuación funcional, eficiencia de desempeño, compatibilidad, capacidad de interacción, fiabilidad, seguridad, mantenibilidad, flexibilidad y seguridad frente a daños (*safety*).

**Aplicación en el desarrollo de software:** durante el análisis de requisitos se establecen las características de calidad que debe cumplir el sistema. Posteriormente, durante las pruebas, se comprueba su funcionamiento mediante diferentes escenarios.

> **Ejemplo:** en una aplicación web de gestión de usuarios se puede verificar que el registro funcione correctamente, que el inicio de sesión sea seguro y que la plataforma responda adecuadamente cuando varios usuarios acceden simultáneamente.

---

## ISO/IEC 25012: Modelo de calidad de datos

Esta norma proporciona un modelo para evaluar la calidad de los datos almacenados y utilizados dentro de un sistema de información.

Permite analizar características relacionadas con la **exactitud, completitud, consistencia y disponibilidad** de los datos, entre otras.

**Aplicación en el desarrollo de software:** se utiliza para definir reglas de validación en formularios, establecer restricciones en bases de datos y comprobar que la información registrada sea confiable.

> **Ejemplo:** cuando un usuario se registra, el sistema debe verificar que su correo electrónico tenga un formato válido y que no exista previamente otro usuario con el mismo correo.

---

## ISO/IEC 25020: Modelo de referencia para la medición de calidad

La norma ISO/IEC 25020 establece un marco de referencia para seleccionar, desarrollar y aplicar medidas relacionadas con la calidad de sistemas y productos de software.

**Aplicación en el desarrollo de software:** permite organizar el proceso de medición, definiendo qué característica se evaluará, cómo se obtendrán los datos y cómo se interpretarán los resultados.

> **Ejemplo:** para evaluar el rendimiento de una aplicación web, el equipo puede establecer un tiempo de respuesta máximo y utilizar herramientas de pruebas para comprobar su cumplimiento.

---

## ISO/IEC 25021: Elementos de medida de calidad

Esta norma define elementos de medida que pueden utilizarse para construir indicadores cuantitativos de calidad durante el ciclo de vida del software.

**Aplicación en el desarrollo de software:** ayuda a definir medidas básicas, como el número de errores encontrados, la cantidad de pruebas realizadas y el tiempo utilizado para ejecutar una operación.

> **Ejemplo:** si se ejecutan 50 casos de prueba y 45 finalizan correctamente, se puede calcular un porcentaje de aprobación del 90 %.
>
> Este porcentaje es un indicador propuesto para el proyecto, no un valor mínimo universal establecido por la norma.

---

## ISO/IEC 25022: Medición de la calidad en uso

La norma ISO/IEC 25022 establece medidas para evaluar la calidad de un sistema cuando los usuarios lo utilizan en situaciones reales o representativas.

Su aplicación permite analizar aspectos como la **eficacia, eficiencia y satisfacción** de los usuarios.

**Aplicación en el desarrollo de software:** se pueden realizar pruebas de usabilidad con diferentes usuarios para observar si completan correctamente las tareas asignadas.

> **Ejemplo:** se solicita a diez personas que registren una cuenta y consulten su información. Después se mide cuántas completan la actividad, cuánto tiempo emplean y qué dificultades encuentran.

---

## ISO/IEC 25023: Medición de la calidad del producto de software

Esta norma establece medidas cuantitativas para evaluar características de calidad de sistemas y productos de software.

**Aplicación en el desarrollo de software:** se utiliza durante las pruebas técnicas para medir aspectos relacionados con el funcionamiento, el rendimiento, la fiabilidad y otras características del producto.

> **Ejemplo:** el equipo puede ejecutar pruebas de carga para observar el tiempo de respuesta de una aplicación cuando aumenta el número de usuarios simultáneos.
>
> También puede registrar los fallos detectados y comprobar si las funcionalidades cumplen los requisitos establecidos.

---

## ISO/IEC 25024: Medición de la calidad de datos

Esta norma proporciona medidas para evaluar cuantitativamente la calidad de los datos, tomando como referencia el modelo establecido en ISO/IEC 25012.

**Aplicación en el desarrollo de software:** se pueden ejecutar consultas a la base de datos para identificar registros incompletos, duplicados o inconsistentes.

> **Ejemplo:** si una base de datos contiene 1.000 registros y 50 presentan información obligatoria incompleta, se obtiene un porcentaje de completitud del 95 % según el criterio de cálculo definido para el proyecto.

> Las funciones de las normas ISO/IEC 25012, 25020, 25021, 25023 y 25024 descritas anteriormente se fundamentan en la estructura y las descripciones de SQuaRE.

---

## Aplicación conjunta en un proceso de desarrollo

Para comprender la relación entre estas normas, se presenta un ejemplo de aplicación durante las diferentes etapas del desarrollo de una plataforma web.

| Etapa del desarrollo | Norma aplicable | Actividad propuesta |
|---|---|---|
| Análisis de requisitos | **ISO/IEC 25010** | Identificar características de calidad del sistema |
| Diseño de base de datos | **ISO/IEC 25012** | Definir reglas de integridad y consistencia |
| Planificación de pruebas | **ISO/IEC 25020** | Establecer métodos de medición |
| Desarrollo | **ISO/IEC 25021** | Definir y recopilar medidas de calidad |
| Pruebas con usuarios | **ISO/IEC 25022** | Evaluar eficacia, eficiencia y satisfacción |
| Pruebas técnicas | **ISO/IEC 25023** | Medir rendimiento, fiabilidad y comportamiento |
| Validación de información | **ISO/IEC 25024** | Comprobar completitud y exactitud de datos |

---

## Referencias

- International Organization for Standardization. (2011). *ISO/IEC 25010:2011 Systems and software engineering — SQuaRE — System and software quality models*. ISO.
- International Organization for Standardization. (2023). *ISO/IEC 25010:2023 Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — Product quality model*. ISO.
- Pressman, R. S., & Maxim, B. R. (2021). *Ingeniería de software*. McGraw-Hill Interamericana.