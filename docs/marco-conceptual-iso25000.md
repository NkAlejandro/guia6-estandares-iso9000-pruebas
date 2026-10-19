# Marco Conceptual — Familia ISO/IEC 25000 (SQuaRE)

**Guía 6 — Estándares de Calidad ISO 9000 y Pruebas de Software**
Universidad Manuela Beltrán · Ingeniería de Software · 2026

---

## 1. ¿Qué es la familia ISO/IEC 25000?

La familia de normas **ISO/IEC 25000**, conocida como *SQuaRE* (*Systems and Software Quality Requirements and Evaluation*), establece un marco internacional para definir requisitos de calidad, utilizar modelos de calidad, realizar mediciones y evaluar productos de software y sistemas.

Su propósito principal es proporcionar criterios que permitan determinar si un producto de software cumple con las necesidades de los usuarios y los requisitos establecidos durante su desarrollo.

En Ingeniería de Software, esta familia de normas es importante porque permite evaluar no solamente el funcionamiento de una aplicación, sino también características como su rendimiento, seguridad, fiabilidad, facilidad de mantenimiento y capacidad de adaptación.

Además, proporciona una base para que los equipos de desarrollo, analistas de calidad y responsables de proyectos puedan tomar decisiones fundamentadas en indicadores y resultados de evaluación.

---

## 2. Mapa conceptual — Clasificación de la familia ISO/IEC 25000

```
                        ISO/IEC 25000 (SQuaRE)
        Sistemas y Software: Requisitos y Evaluación de Calidad
                                  │
    ┌──────────────┬──────────────┼──────────────┬─────────────────┐
    │              │              │              │                 │
    ▼              ▼              ▼              ▼                 ▼
 2500n          2501n          2502n          2503n            2504n
 Gestión       Modelos de     Medición de    Requisitos de    Evaluación de
 de calidad      calidad       calidad        calidad           calidad
    │              │              │              │                 │
    │              │              │              │                 │
    │              │              │              │                 │
    ▼              ▼              ▼              ▼                 ▼
 Conceptos y   Características  Medidas y      Orientación para   Procesos y
orientaciones  para evaluar    procedimientos  especificar       criterios de
generales      sistemas,        de medición    requisitos         evaluación
               software y datos                     de calidad
                                    │
                                    │
                                    ▼
                        ISO/IEC 25050–25099
                        Extensiones complementarias
```

| División | Clasificación | Función principal |
|---|---|---|
| **ISO/IEC 2500n** | Gestión de calidad | Establece conceptos y orientaciones generales |
| **ISO/IEC 2501n** | Modelos de calidad | Define características para evaluar sistemas, software y datos |
| **ISO/IEC 2502n** | Medición de calidad | Establece medidas y procedimientos de medición |
| **ISO/IEC 2503n** | Requisitos de calidad | Orienta la especificación de requisitos de calidad |
| **ISO/IEC 2504n** | Evaluación de calidad | Proporciona procesos y criterios de evaluación |
| **ISO/IEC 25050–25099** | Extensiones | Incluye normas complementarias para necesidades específicas |

---

## 3. Importancia de ISO/IEC 25000 en Ingeniería de Software

La aplicación de esta familia de normas permite establecer un enfoque sistemático para garantizar la calidad de los productos informáticos.

Entre sus principales aportes se encuentran:

- La **identificación temprana** de problemas.
- La **definición de requisitos medibles**.
- La **evaluación de la seguridad** y el **rendimiento**.
- La **reducción de defectos**.
- La **mejora continua** de los procesos de desarrollo.

### Ejemplo aplicado al proyecto del semestre

Al desarrollar una aplicación web que administra información de usuarios, ISO/IEC 25000 permite establecer criterios para verificar que:

1. El sistema **responda correctamente**.
2. **Proteja los datos**.
3. **Facilite la navegación**.
4. **Mantenga su funcionamiento** ante diferentes condiciones de uso.

De esta manera, la calidad del software deja de depender únicamente de la percepción de los desarrolladores y puede evaluarse mediante características, medidas y criterios definidos.

---

## 4. Estándares de software relacionados

| Estándar | Enfoque | Descripción breve |
|---|---|---|
| ISO/IEC 12207 | Proceso | Procesos del ciclo de vida del software: adquisición, desarrollo, operación, mantenimiento |
| ISO/IEC/IEEE 15288 | Proceso | Procesos del ciclo de vida de sistemas |
| ISO/IEC 33000 (antes 15504, SPICE) | Proceso | Marco para evaluar capacidad y madurez de procesos |
| ISO/IEC 90003 | Proceso | Directrices para aplicar ISO 9001 al software |
| ISO 9001 | Proceso / gestión | Requisitos del sistema de gestión de calidad |
| ISO/IEC 25000 (SQuaRE) | Producto | Requisitos de calidad y evaluación del producto de software |
| ISO/IEC 25010 | Producto | Modelo de calidad del producto (adecuación funcional, eficiencia, seguridad, usabilidad, etc.) |
| ISO/IEC 25012 | Producto | Modelo de calidad de datos |
| ISO/IEC 9126 y 14598 | Producto (reemplazadas) | Modelo de calidad y evaluación anterior, reemplazado por ISO/IEC 25000 |
| ISO/IEC/IEEE 29119 | Pruebas | Pruebas de software: conceptos, procesos, documentación y técnicas |
| ISO/IEC 27001 | Seguridad | Sistema de gestión de seguridad de la información |
| ISO/IEC 20000 | Servicio | Gestión de servicios de TI |

---

## 5. Relación entre certificaciones y pruebas de software

Las certificaciones como **ISO 9001** y **CMMI** exigen a las organizaciones definir, documentar y medir sus procesos, y las pruebas constituyen una parte central de esos procesos.

- **ISO 9001** exige seguimiento, medición, auditoría interna y acción correctiva frente a no conformidades, lo que en software significa planificación de pruebas, seguimiento de defectos y corrección.
- **CMMI nivel 3** exige procesos estándar y documentados en toda la organización, de modo que la verificación y la validación se realicen de forma consistente y repetible.

En síntesis: **las certificaciones ofrecen el marco de calidad y las pruebas aportan la evidencia de que el producto cumple ese marco.**

---

## Referencias

- International Organization for Standardization. (2011). *ISO/IEC 25010:2011 Systems and software engineering — SQuaRE — System and software quality models*. ISO.
- International Organization for Standardization. (2017). *ISO/IEC 12207:2017 Systems and software engineering — Software life cycle processes*. ISO.
- Pressman, R. S., & Maxim, B. R. (2021). *Ingeniería de software*. McGraw-Hill Interamericana.