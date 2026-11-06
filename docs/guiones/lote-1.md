# Lote 1 — cinco guiones de enfermería

- Rama: `chore/guiones-lote-1`. Base comprobada: `cf62d2b5997abb57b92568579a2becd22f35c8fa`, con biblioteca, playbooks y regla de gancho.
- Alcance: solo guiones y planificación escrita. Sin animaciones, audio, proyectos, ramas de video, renders ni merge.
- Estado: propuestas con fuentes consultadas y revisión clínica pendiente; no son narraciones clínicamente aprobadas. No hubo archivo clínico adjunto. Las decisiones institucionales y del dispositivo van en las listas externas de [REVISAR].
- Conteo: palabras separadas por espacios, incluidos gancho, saludo y cierre; `MediShort360` cuenta como una palabra. Estimación nominal: total dividido entre dos palabras por segundo, sin añadir pausas. Duración real pendiente de MP3; no se acelera la voz para ajustarla.
- Revisión editorial: ganchos de cuatro a seis palabras, narrables en dos a tres segundos al ritmo nominal. Fenómeno y pregunta visibles desde el primer fotograma y comprensibles sin sonido; el saludo va después, sin detener la acción. Cada guion contiene un giro y exactamente tres acciones de enfermería con su motivo. Ninguno supera el conteo de su versión anterior.
- Cada fila de las tablas es un evento propuesto en SVG, no una animación creada ni un tiempo medido. Las frases largas pueden dividirse visualmente sin repetir contenido. El saludo acompaña la acción; los cierres clínicos responden al gancho antes de la marca.
- Piezas comunes previstas: `Camera`, `shotAt`, `LabelBar`/`Callout`, `Watermark` y `Outro` según `docs/BIBLIOTECA.md`. `Captions` se utilizaría solo con tiempos reales del futuro audio. Adaptar tamaños al estándar; ninguna pieza queda clínicamente aprobada por estar inventariada.

## 1. Úlcera por presión

Tipo: enfermedad. **90 palabras; 45 s nominales.**

### Guion — texto de audio

```text
¿Piel intacta, tejido dañado? ¡Hola, hijos de Florence Nightingale! La presión comprime el tejido y dificulta el riego. Entonces llega menos oxígeno y las células pueden lesionarse. Pero cuidado: la superficie puede seguir cerrada mientras el daño avanza debajo. Inspecciona las zonas de apoyo para detectar cambios persistentes de color. Palpa con suavidad para identificar calor o consistencia diferentes. Descarga la zona según el plan de cuidados para retirar la presión que sigue dañándola. Una piel cerrada no garantiza tejido sano: el problema puede empezar en profundidad. Síguenos en MediShort360.
```

### Pantalla en los primeros tres segundos

Talón apoyado con piel cerrada; una ventana de corte revela tejido profundo comprimido. Pregunta grande: «¿Piel intacta, tejido dañado?». Es una visualización didáctica, no un diagnóstico por apariencia.

### Tres acciones de enfermería y su motivo

Inspeccionar zonas de apoyo → detectar cambios de color. Palpar suavemente → reconocer cambios de temperatura o consistencia. Descargar la zona → retirar la presión lesiva.

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–2 | Talón y ventana profunda: contraste entre superficie cerrada y tejido afectado. | ¿Piel intacta, tejido dañado? | 4 |
| 2–4.5 | Continúa la compresión durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 4.5–9 | Zoom al tejido comprimido y reducción de flujo. | La presión comprime el tejido y dificulta el riego. | 9 |
| 9–13.5 | Menor aporte de oxígeno y células que cambian de estado. | Entonces llega menos oxígeno y las células pueden lesionarse. | 9 |
| 13.5–19.5 | La superficie sigue cerrada mientras se muestra el daño profundo. | Pero cuidado: la superficie puede seguir cerrada mientras el daño avanza debajo. | 12 |
| 19.5–25 | Inspección de color en zonas de apoyo y distintos tonos de piel. | Inspecciona las zonas de apoyo para detectar cambios persistentes de color. | 11 |
| 25–29.5 | Palpación suave y comparación de temperatura y consistencia; sin masaje. | Palpa con suavidad para identificar calor o consistencia diferentes. | 9 |
| 29.5–37 | Retirada del apoyo según el plan, sin curación instantánea. | Descarga la zona según el plan de cuidados para retirar la presión que sigue dañándola. | 15 |
| 37–43.5 | Vista conectada de piel cerrada y profundidad lesionada: respuesta al gancho. | Una piel cerrada no garantiza tejido sano: el problema puede empezar en profundidad. | 13 |
| 43.5–45 | Cierre de marca. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR, con adaptación posterior:** `SkinSection` (`src/anatomy/SkinSection.tsx`) o `SkinLayers` (`src/anatomy/SkinLayers.tsx`) como base de capas cutáneas; `RedBloodCell` (`src/anatomy/Cells.tsx`) para flujo. No usar la coreografía de cicatrización como si ya representara lesión por presión.
- **FALTARÍA:** talón y prominencia ósea, compresión tisular y alteración del flujo, daño profundo bajo piel intacta, descarga y postura asistida, piel en distintos tonos. Harían falta adaptador y revisión anatómica; no se crean en este lote.

### Afirmaciones y decisiones por confirmar

Revisión clínica pendiente en todas las filas.

| Id | Afirmación o decisión | Fuente y localización | Estado |
|---|---|---|---|
| UPP-1 | Presión, menor riego/oxígeno y lesión bajo piel cerrada | NHS, “Causes”; NPIAP, lesión de tejido profundo; Gefen et al., etiología | [REVISAR] Validar el mecanismo simplificado. También interviene la deformación directa; no dibujar la hipoxia como mecanismo único. |
| UPP-2 | Color, temperatura y consistencia; palpación suave | NHS, “Symptoms”; NICE CG179, 1.1.3–1.1.7 | [REVISAR] Confirmar signos en distintos tonos de piel y técnica de valoración. Palpación no significa masaje. |
| UPP-3 | Descarga para retirar presión lesiva | NICE CG179, reposicionamiento y dispositivos de redistribución | [REVISAR] Confirmar descarga según riesgo y plan individual; no prometer recuperación inmediata. |

### Fuentes consultadas

- [NHS: Pressure ulcers](https://www.nhs.uk/conditions/pressure-sores/), apartados Symptoms, Causes y Treatments.
- [NICE CG179: Recommendations](https://www.nice.org.uk/guidance/cg179/chapter/Recommendations), secciones indicadas arriba. El texto completo devolvió acceso denegado; se consultaron los extractos indexados de recomendaciones, no se afirma haber descargado el PDF.
- [NPIAP: Pressure Injury Definitions](https://cdn.ymaws.com/npiap.com/resource/resmgr/online_store/posters/1a._npuap_staging_poster.pdf), definiciones de lesión y daño profundo consultadas mediante extracto indexado.
- [Gefen et al.: Our contemporary understanding of the aetiology of pressure ulcers/pressure injuries](https://onlinelibrary.wiley.com/doi/10.1111/iwj.13667), mecanismos de deformación e isquemia; extracto indexado consultado en esta revisión.

## 2. Hipoglucemia

Tipo: enfermedad. **91 palabras; 45.5 s nominales.**

### Guion — texto de audio

```text
¿Sudor, temblor y confusión? ¡Hola, hijos de Florence Nightingale! Cuando baja la glucosa, el cuerpo libera adrenalina; por eso aparecen sudor y temblor. Si al cerebro le falta glucosa, puede aparecer confusión. Pero estos signos no aparecen siempre. Comprueba la glucemia para identificar la bajada. Administra glucosa según protocolo si puede tragar con seguridad; si no, necesita tratamiento urgente por otra vía para evitar atragantamientos. Repite la medición para comprobar la recuperación. Así se conectan los signos: el cuerpo activa su alarma y al cerebro le falta combustible. Síguenos en MediShort360.
```

### Pantalla en los primeros tres segundos

Paciente con gotas de sudor, mano temblorosa y gesto de desorientación; pregunta grande: «¿Sudor, temblor y confusión?».

### Tres acciones de enfermería y su motivo

Comprobar glucemia → identificar la bajada. Administrar glucosa si traga con seguridad, o tratamiento urgente por otra vía según protocolo → evitar atragantamientos. Repetir glucemia → comprobar recuperación.

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–2 | Sudor, mano temblorosa y desorientación. | ¿Sudor, temblor y confusión? | 4 |
| 2–4.5 | Los signos siguen en movimiento durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 4.5–11.5 | Glucosa baja, respuesta de alarma y aparición de sudor y temblor. | Cuando baja la glucosa, el cuerpo libera adrenalina; por eso aparecen sudor y temblor. | 14 |
| 11.5–16 | Zoom al cerebro y menor disponibilidad de glucosa. | Si al cerebro le falta glucosa, puede aparecer confusión. | 9 |
| 16–19 | Contraste con paciente sin esos signos; la ausencia no excluye hipoglucemia. | Pero estos signos no aparecen siempre. | 6 |
| 19–22.5 | Glucómetro sin valores para comprobar la sospecha. | Comprueba la glucemia para identificar la bajada. | 7 |
| 22.5–32.5 | Bifurcación de tratamiento: deglución segura frente a vía oral insegura y atención urgente según protocolo. | Administra glucosa según protocolo si puede tragar con seguridad; si no, necesita tratamiento urgente por otra vía para evitar atragantamientos. | 20 |
| 32.5–36 | Nueva lectura de glucemia sin tiempos ni cifras inventados. | Repite la medición para comprobar la recuperación. | 7 |
| 36–44 | Conectar respuesta de alarma y combustible cerebral con los signos iniciales. | Así se conectan los signos: el cuerpo activa su alarma y al cerebro le falta combustible. | 16 |
| 44–45.5 | Cierre de marca. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR:** `RedBloodCell` (`src/anatomy/Cells.tsx`) como contexto vascular, sin presentarlo como transportador de glucosa; `Camera` y `shotAt` para acercamientos futuros.
- **FALTARÍA:** paciente adulto SVG con sudor, temblor y confusión; cerebro y glucosa; glucómetro sin valores, valoración de deglución y bifurcación de atención según seguridad de la vía oral. No reutilizar `ChildRig` como adulto sin adaptación.

### Afirmaciones y decisiones por confirmar

Revisión clínica pendiente en todas las filas.

| Id | Afirmación o decisión | Fuente y localización | Estado |
|---|---|---|---|
| HIPO-1 | Adrenalina/síntomas y menor glucosa cerebral; signos que pueden faltar | ADA, síntomas; NIDDK, síntomas e hipoglucemia inadvertida | [REVISAR] Validar la cadena causal y la excepción; signos no exclusivos. |
| HIPO-2 | Medición, tratamiento según deglución y nueva medición | NIDDK, tratamiento; NHS, hipoglucemia y pérdida de conciencia | [REVISAR] Confirmar protocolo local: si no traga con seguridad, nada por boca y respuesta urgente con alternativa de tratamiento. No retrasar atención crítica por medir. |

### Fuentes consultadas

- [ADA: Signs, Symptoms, and Treatment for Hypoglycemia](https://diabetes.org/living-with-diabetes/hypoglycemia-low-blood-glucose/symptoms-treatment), explicación de adrenalina y síntomas.
- [NIDDK: Low Blood Glucose](https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/low-blood-glucose-hypoglycemia), síntomas y tratamiento.
- [NHS: Low blood sugar](https://www.nhs.uk/conditions/low-blood-sugar-hypoglycaemia/), actuación según conciencia y seguridad de deglución; extracto indexado.

## 3. Insulina en la jeringa

Tipo: procedimiento. **94 palabras; 47 s nominales.**

### Guion — texto de audio

```text
¿Esa marca indica lo que cargaste? ¡Hola, hijos de Florence Nightingale! La escala relaciona la posición del émbolo con las unidades. Pero una raya no vale lo mismo en todas las jeringas. Comprueba la compatibilidad con la concentración de insulina para evitar una lectura equivocada. Identifica cuánto representa cada intervalo para interpretar las marcas. Dos unidades, cuatro unidades, ocho unidades: son ejemplos de lectura, no dosis. Contrasta la lectura según el fabricante con la prescripción para verificar la cantidad. La respuesta está en la escala, no en cuánto líquido parece haber. Síguenos en MediShort360.
```

### Pantalla en los primeros tres segundos

Jeringa cargada en primer plano; una lupa conecta la escala con la posición del émbolo. Pregunta: «¿Esa marca indica lo que cargaste?». Sin fijar todavía el borde de lectura.

### Tres acciones de enfermería y su motivo

Comprobar compatibilidad → evitar interpretación equivocada. Identificar el intervalo → leer las marcas. Contrastar lectura y prescripción → verificar la cantidad.

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–3 | Lupa sobre escala y émbolo. | ¿Esa marca indica lo que cargaste? | 6 |
| 3–5.5 | El acercamiento sigue durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 5.5–10.5 | El émbolo cambia de posición junto a la escala. | La escala relaciona la posición del émbolo con las unidades. | 10 |
| 10.5–16 | Comparación de graduaciones de modelos validados sin asumir equivalencias. | Pero una raya no vale lo mismo en todas las jeringas. | 11 |
| 16–22.5 | Se comparan etiqueta de insulina y jeringa compatible. | Comprueba la compatibilidad con la concentración de insulina para evitar una lectura equivocada. | 13 |
| 22.5–27 | Se recorre y destaca un intervalo de la escala. | Identifica cuánto representa cada intervalo para interpretar las marcas. | 9 |
| 27–33 | Ejemplos separados: dos, cuatro y ocho unidades; texto persistente «ejemplos de lectura, no dosis». | Dos unidades, cuatro unidades, ocho unidades: son ejemplos de lectura, no dosis. | 12 |
| 33–39.5 | Escala y prescripción se cotejan conforme a las instrucciones del modelo; borde pendiente de revisión. | Contrasta la lectura según el fabricante con la prescripción para verificar la cantidad. | 13 |
| 39.5–45.5 | La lupa vuelve a la escala, separando lectura de estimación visual del volumen. | La respuesta está en la escala, no en cuánto líquido parece haber. | 12 |
| 45.5–47 | Cierre de marca. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR:** `Camera` (`src/motion/Camera.tsx`), `shotAt` (`src/motion/shots.ts`) y `Callout` (`src/motion/Overlays.tsx`) para zoom y rotulación futuros. No existe un instrumento listo en la biblioteca.
- **FALTARÍA:** jeringa de insulina SVG parametrizable con marcas, escala y borde de lectura del modelo validado; vial/etiqueta, burbujas y prescripción de ejemplo. El conjunto histórico `ICUEquipment3D` no sustituye esta pieza.
- No dibujar la escala definitiva hasta verificar el modelo y sus instrucciones. Los ejemplos no representan una pauta ni indican cuánto administrar a un paciente.

### Afirmaciones y decisiones por confirmar

Revisión clínica pendiente en todas las filas.

| Id | Afirmación o decisión | Fuente y localización | Estado |
|---|---|---|---|
| INS-1 | Posición del émbolo, graduaciones y compatibilidad de concentración | BD, catálogo p. 13; HealthLink BC, descripción de jeringa | [REVISAR] Confirmar fabricante, modelo, concentración compatible y valor de cada intervalo. No hacer conversiones ni generalizar una escala. |
| INS-2 | Referencia exacta de lectura y comparación con prescripción | embecta, pasos 7–9; instrucciones del modelo pendientes | [REVISAR] Determinar el borde o línea exactos que deben alinearse y el método de comprobación, incluida presencia de burbujas. El audio no fija ningún borde. |
| INS-3 | Dos, cuatro y ocho unidades como ejemplos, nunca dosis | Instrucciones del modelo que se seleccione | [REVISAR] Verificar que la escala elegida permita mostrar esos ejemplos. No vincularlos a una pauta ni representar administración al paciente. |

### Fuentes consultadas

- [BD: Medication Delivery Solutions Product Catalogue](https://www.bd.com/documents/international/catalogs/medication-delivery-solutions/MDS_Medication-Delivery-Solutions-Product-Catalogue_CT_EN.pdf), p. 13, graduaciones de jeringa y concentración; extracto indexado.
- [embecta: Getting Started Booklet](https://go.bd.com/rs/565-YXD-236/images/EMBC%20Getting%20Started%20Booklet_22-030_PRINT.pdf), “Insulin Syringe Injection Instructions (Continued)”, pasos 7–9; extracto indexado. El PDF completo excedió el límite del visor. No sustituye las instrucciones del dispositivo local.
- [HealthLink BC: Insulin syringes](https://www.healthlinkbc.ca/healthwise/insulin-syringes), partes y lectura del émbolo, consultado completo.

## 4. Cetoacidosis diabética

Tipo: enfermedad. **93 palabras; 46.5 s nominales.**

### Guion — texto de audio

```text
¿Por qué respira tan profundo? ¡Hola, hijos de Florence Nightingale! En la cetoacidosis falta insulina efectiva. Entonces descompone grasa y produce cetonas que acidifican la sangre. Por eso aumenta la ventilación: elimina dióxido de carbono para compensar la acidez. Pero esa respiración no confirma el diagnóstico. Activa la atención urgente porque la alteración es grave. Vigila el potasio porque puede bajar con la insulina. Controla el balance de líquidos para seguir las pérdidas y la reposición prescrita. Ese pecho se mueve así para compensar, no porque la acidez esté resuelta. Síguenos en MediShort360.
```

### Pantalla en los primeros tres segundos

Tórax que se expande profundamente de forma repetida; pregunta grande: «¿Por qué respira tan profundo?».

### Tres acciones de enfermería y su motivo

Activar atención urgente → atender una alteración grave. Vigilar potasio → detectar su descenso con insulina. Controlar balance → seguir pérdidas y reposición.

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–2.5 | Tórax con respiración profunda. | ¿Por qué respira tan profundo? | 5 |
| 2.5–5 | La respiración continúa durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 5–8 | Esquema de insulina insuficiente. | En la cetoacidosis falta insulina efectiva. | 6 |
| 8–13 | Degradación de grasa, formación de cetonas y aumento ilustrativo de acidez. | Entonces descompone grasa y produce cetonas que acidifican la sangre. | 10 |
| 13–19.5 | Zoom respiratorio: salida de dióxido de carbono como compensación. | Por eso aumenta la ventilación: elimina dióxido de carbono para compensar la acidez. | 13 |
| 19.5–23 | Respiración junto a evaluación diagnóstica; no equivale a diagnóstico confirmado. | Pero esa respiración no confirma el diagnóstico. | 7 |
| 23–27.5 | Activación del equipo de atención urgente. | Activa la atención urgente porque la alteración es grave. | 9 |
| 27.5–32 | Vigilancia del potasio asociada al tratamiento con insulina, sin cantidades. | Vigila el potasio porque puede bajar con la insulina. | 9 |
| 32–38.5 | Registro conceptual de entradas y pérdidas de líquido, sin cifras. | Controla el balance de líquidos para seguir las pérdidas y la reposición prescrita. | 13 |
| 38.5–45 | La respiración compensa mientras la acidez requiere tratamiento: respuesta al gancho. | Ese pecho se mueve así para compensar, no porque la acidez esté resuelta. | 13 |
| 45–46.5 | Cierre de marca. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR:** `RedBloodCell` (`src/anatomy/Cells.tsx`) como contexto vascular; `Camera` y `shotAt` para conectar vista externa y mecanismo. Ninguno explica por sí solo la cetoacidosis.
- **FALTARÍA:** paciente adulto con respiración profunda, pulmón y eliminación de dióxido de carbono, esquema de cetonas/acidez, valoración y balance de diuresis; bolsa y monitor SVG independientes. `ICUPatient3D` y `ICUEquipment3D` son referencias históricas, no escenas SVG listas.

### Afirmaciones y decisiones por confirmar

Revisión clínica pendiente en todas las filas.

| Id | Afirmación o decisión | Fuente y localización | Estado |
|---|---|---|---|
| CAD-1 | Insulina insuficiente, cetonas, acidosis y compensación respiratoria | Consenso 2024, secciones 2 y 3, patogenia y presentación | [REVISAR] Validar la simplificación metabólica y respiratoria; la respiración profunda no confirma por sí sola el diagnóstico. |
| CAD-2 | Atención urgente y descenso del potasio con insulina | Consenso 2024, sección 4, tratamiento y “Potassium” | [REVISAR] Confirmar circuito urgente y vigilancia de potasio antes/durante el tratamiento; no se prescribe insulina desde este guion. |
| CAD-3 | Balance para seguir pérdidas y reposición | Consenso 2024, sección 4, “Fluid Therapy” y seguimiento | [REVISAR] Confirmar valoración individual de balance, función renal y sobrecarga según protocolo local. |

### Fuentes consultadas

- [Umpierrez et al.: Hyperglycemic Crises in Adults With Diabetes, consenso 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11272983/), secciones 2–4. DOI: 10.2337/dci24-0032. Texto del consenso consultado en PMC; el enlace editorial devolvió acceso denegado.

## 5. Hiperpotasemia

Tipo: enfermedad. **94 palabras; 47 s nominales.**

### Guion — texto de audio

```text
¿Por qué esas ondas picudas? ¡Hola, hijos de Florence Nightingale! El exceso de potasio cambia la actividad eléctrica del corazón. Por eso pueden aparecer ondas T picudas o complejos ensanchados. Pero un electrocardiograma normal no descarta hiperpotasemia: se necesita valorar el potasio en sangre. Avisa al equipo ante cambios sospechosos porque pueden acompañar arritmias peligrosas. Monitoriza el ritmo para detectar deterioro eléctrico. Si recibe insulina como tratamiento, vigila la glucemia porque puede bajar. Esas ondas pueden reflejar un problema eléctrico por potasio; el trazado orienta, pero el laboratorio completa la valoración. Síguenos en MediShort360.
```

### Pantalla en los primeros tres segundos

Trazo ECG que avanza con ondas T picudas; pregunta grande: «¿Por qué esas ondas picudas?». Sin presentar ese hallazgo como exclusivo de hiperpotasemia.

### Tres acciones de enfermería y su motivo

Avisar al equipo → responder al riesgo de arritmias. Monitorizar ritmo → detectar deterioro eléctrico. Vigilar glucemia si recibe insulina → detectar su descenso.

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–2.5 | ECG con T picudas avanzando. | ¿Por qué esas ondas picudas? | 5 |
| 2.5–5 | El trazado sigue durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 5–10 | Zoom a actividad eléctrica cardíaca y potasio extracelular. | El exceso de potasio cambia la actividad eléctrica del corazón. | 10 |
| 10–15 | T picudas o QRS ancho como ejemplos alternativos, sin progresión obligatoria. | Por eso pueden aparecer ondas T picudas o complejos ensanchados. | 10 |
| 15–22 | ECG aparentemente normal junto a muestra de laboratorio: no excluye hiperpotasemia. | Pero un electrocardiograma normal no descarta hiperpotasemia: se necesita valorar el potasio en sangre. | 14 |
| 22–27.5 | Aviso al equipo por cambio sospechoso; no inventar una arritmia obligatoria. | Avisa al equipo ante cambios sospechosos porque pueden acompañar arritmias peligrosas. | 11 |
| 27.5–31 | Monitorización que sigue el ritmo y detecta cambios. | Monitoriza el ritmo para detectar deterioro eléctrico. | 7 |
| 31–36.5 | Tratamiento con insulina vinculado a vigilancia de glucemia. | Si recibe insulina como tratamiento, vigila la glucemia porque puede bajar. | 11 |
| 36.5–45.5 | Conectar potasio, trazado y laboratorio para responder al gancho sin diagnóstico por ECG aislado. | Esas ondas pueden reflejar un problema eléctrico por potasio; el trazado orienta, pero el laboratorio completa la valoración. | 18 |
| 45.5–47 | Cierre de marca. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR:** `Camera`, `shotAt` y `Callout` para acercamiento y etiquetas; `Outro` para cierre futuro.
- **FALTARÍA:** monitor ECG SVG independiente con ondas T y QRS revisables, célula cardíaca y distribución de potasio, muestra de laboratorio y vigilancia de glucemia. El monitor integrado de `ICUEquipment3D` no es un export SVG independiente ni un ECG clínicamente validado.

### Afirmaciones y decisiones por confirmar

Revisión clínica pendiente en todas las filas.

| Id | Afirmación o decisión | Fuente y localización | Estado |
|---|---|---|---|
| HIPERK-1 | Potasio y actividad eléctrica; T picudas/QRS ancho; ECG normal no excluye | UKKA 2023, cambios ECG, pp. 61–64 | [REVISAR] Validar morfologías, ausencia posible de cambios y necesidad de laboratorio; no son hallazgos exclusivos. |
| HIPERK-2 | Aviso por riesgo de arritmias y monitorización | UKKA 2023, guías 14.1–14.2 | [REVISAR] Confirmar circuito urgente y monitorización local. No esperar laboratorio para actuar ante deterioro crítico. |
| HIPERK-3 | Insulina puede bajar glucemia y requiere vigilancia | UKKA 2023, guía 17.2 | [REVISAR] Confirmar protocolo y cotejar actualización anunciada de julio de 2026, cuyo PDF no se recuperó en la consulta anterior. |

### Fuentes consultadas

- [UK Kidney Association: Management of Hyperkalaemia in Adults, 2023](https://www.ukkidney.org/sites/default/files/FINAL%20VERSION%20-%20UKKA%20CLINICAL%20PRACTICE%20GUIDELINE%20-%20MANAGEMENT%20OF%20HYPERKALAEMIA%20IN%20ADULTS%20-%20191223.pdf), ECG y monitorización, secciones indicadas arriba; PDF consultado.
- [Página oficial de la guía UKKA](https://www.ukkidney.org/health-professionals/guidelines/treatment-acute-hyperkalaemia-adults-0): el índice anuncia actualización de julio de 2026. Su PDF no se pudo recuperar por tiempo de espera; comprobar versión vigente antes de producción clínica.

## Verificación y pendientes del lote

- Revisión exclusiva de este documento en `chore/guiones-lote-1`, sin animaciones ni ramas nuevas. Se conservan todas las fuentes anteriores y el inventario previsto.
- Conteos anteriores → revisados: 92 → 90; 94 → 91; 95 → 94; 93 → 93; 95 → 94. Todos cumplen noventa a cien palabras y ninguno se alarga. Estimaciones nominales entre 45 y 47 segundos; confirmar pausas y duración real con el futuro MP3.
- Ganchos de cuatro a seis palabras, saludo y cierre exactos. Tres acciones concretas con su porqué por tema; giro breve y respuesta al gancho. Cada frase tiene evento SVG propuesto; no se ha creado ninguna animación.
- No hay cifras, dosis, rangos ni tiempos clínicos en el audio. Los ejemplos de insulina se identifican como lectura, no dosis; el borde exacto queda fuera del audio, en [REVISAR]. Se conserva la grafía MediShort360.
- Pendientes: revisión clínica, protocolos locales, instrucciones de la jeringa y cotejo de actualización UKKA. Conservar `reviewedBy: null` hasta revisión del usuario. Fuentes identificadas no equivalen a aprobación clínica.
- Comprobaciones de documentación: conteos, integridad de fuentes, coherencia de tablas y diff. No corresponden pruebas de código ni renders. Sin merge ni push.
