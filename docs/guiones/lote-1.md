# Lote 1 — cinco guiones de enfermería

- Rama: `chore/guiones-lote-1`. Base comprobada: `cf62d2b5997abb57b92568579a2becd22f35c8fa`, con biblioteca, playbooks y regla de gancho.
- Alcance: solo guiones y planificación escrita. Sin animaciones, audio, proyectos, ramas de video, renders ni merge.
- Estado: propuestas con fuentes consultadas y revisión clínica pendiente; no son narraciones clínicamente aprobadas. No hubo archivo clínico adjunto. Las decisiones institucionales y del dispositivo van en las listas externas de [REVISAR].
- Conteo: palabras separadas por espacios, incluidos gancho, saludo y cierre; `MediShort360` cuenta como una palabra. Estimación nominal: total dividido entre dos palabras por segundo, sin añadir pausas. Duración real pendiente de MP3; no se acelera la voz para ajustarla.
- Mantener las preguntas exactas solicitadas. El fenómeno y la pregunta estarán visibles desde el inicio y se entenderán sin sonido. A dos palabras por segundo, las preguntas duran 3,5–4,5 s; el saludo comienza después y acaba hacia 6–7 s. Esto extiende ligeramente el tramo hablado del gancho respecto a 0–3 s; no afirmar que todas las preguntas caben narradas en tres segundos.
- Cada fila de las tablas es un evento propuesto en SVG, no una animación creada ni un tiempo medido. Las frases largas pueden dividirse visualmente sin repetir contenido. El saludo acompaña la acción; los cierres clínicos responden al gancho antes de la marca.
- Piezas comunes previstas: `Camera`, `shotAt`, `LabelBar`/`Callout`, `Watermark` y `Outro` según `docs/BIBLIOTECA.md`. `Captions` se utilizaría solo con tiempos reales del futuro audio. Adaptar tamaños al estándar; ninguna pieza queda clínicamente aprobada por estar inventariada.

## 1. Úlcera por presión

Tipo: enfermedad. **92 palabras; 46 s nominales.**

### Guion — texto de audio

```text
¿Cómo se forma una úlcera por presión? ¡Hola, hijos de Florence Nightingale! La presión sostenida comprime los tejidos y dificulta su riego. El daño puede comenzar bajo una piel todavía cerrada. Observa cambios persistentes de color, dolor, temperatura o consistencia, especialmente sobre prominencias óseas. Enfermería inspecciona la piel, descarga las zonas de apoyo y ayuda a cambiar de posición según el riesgo. También controla la humedad y comunica cualquier lesión. No masajees la zona para prevenirla. La úlcera aparece cuando la presión daña el tejido; aliviarla ayuda a protegerlo. Síguenos en MediShort360.
```

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–3.5 | Talón apoyado y tejido comprimido; pregunta visible desde el inicio. | ¿Cómo se forma una úlcera por presión? | 7 |
| 3.5–6 | Continúa la compresión mientras entra el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 6–11 | Zoom al tejido: compresión y menor flujo capilar. | La presión sostenida comprime los tejidos y dificulta su riego. | 10 |
| 11–15.5 | Corte de piel intacta que revela daño subyacente. | El daño puede comenzar bajo una piel todavía cerrada. | 9 |
| 15.5–22 | Comparación de color en distintos tonos de piel y valoración de dolor, calor y consistencia. | Observa cambios persistentes de color, dolor, temperatura o consistencia, especialmente sobre prominencias óseas. | 13 |
| 22–31 | Inspección del talón, descarga del apoyo y cambio de postura asistido. | Enfermería inspecciona la piel, descarga las zonas de apoyo y ayuda a cambiar de posición según el riesgo. | 18 |
| 31–35 | Retirada de humedad y registro de la lesión. | También controla la humedad y comunica cualquier lesión. | 8 |
| 35–38 | Mano se aparta para evitar el masaje preventivo. | No masajees la zona para prevenirla. | 6 |
| 38–44.5 | Al retirar la presión se libera el tejido: respuesta visual al gancho, sin curación instantánea. | La úlcera aparece cuando la presión daña el tejido; aliviarla ayuda a protegerlo. | 13 |
| 44.5–46 | Cierre de marca con movimiento. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR, con adaptación posterior:** `SkinSection` (`src/anatomy/SkinSection.tsx`) o `SkinLayers` (`src/anatomy/SkinLayers.tsx`) como base de capas cutáneas; `RedBloodCell` (`src/anatomy/Cells.tsx`) para flujo. No usar la coreografía de cicatrización como si ya representara lesión por presión.
- **FALTARÍA:** talón y prominencia ósea, compresión tisular y alteración del flujo, daño profundo bajo piel intacta, descarga y postura asistida, piel en distintos tonos. Harían falta adaptador y revisión anatómica; no se crean en este lote.

### Afirmaciones y decisiones por confirmar

Todas las filas conservan revisión pendiente (`reviewedBy: null`).

| Id | Afirmación o decisión | Fuente y localización | Estado |
|---|---|---|---|
| UPP-1 | Compresión, menor riego y daño bajo piel intacta | NHS, “Causes”; NPIAP, definición de lesión por presión y lesión de tejido profundo | [REVISAR] Confirmar el mecanismo y la representación del daño profundo; no presentar toda lesión como herida abierta ni como un proceso exclusivamente vascular. |
| UPP-2 | Color persistente, dolor, temperatura, consistencia y prominencias óseas | NHS, “Symptoms”; NICE CG179, 1.1.3–1.1.7 | [REVISAR] Confirmar signos y adaptación a distintos tonos de piel. |
| UPP-3 | Inspección, descarga, postura, humedad y evitar masaje preventivo | NICE CG179, 1.1.3–1.1.10 y 1.1.13–1.1.18 | [REVISAR] Cotejar con protocolo institucional y riesgo individual; no añadir frecuencia universal. |

### Fuentes consultadas

- [NHS: Pressure ulcers](https://www.nhs.uk/conditions/pressure-sores/), apartados Symptoms, Causes y Treatments.
- [NICE CG179: Recommendations](https://www.nice.org.uk/guidance/cg179/chapter/Recommendations), secciones indicadas arriba. El texto completo devolvió acceso denegado; se consultaron los extractos indexados de recomendaciones, no se afirma haber descargado el PDF.
- [NPIAP: Pressure Injury Definitions](https://cdn.ymaws.com/npiap.com/resource/resmgr/online_store/posters/1a._npuap_staging_poster.pdf), definiciones de lesión y daño profundo consultadas mediante extracto indexado.

## 2. Hipoglucemia

Tipo: enfermedad. **94 palabras; 47 s nominales.**

### Guion — texto de audio

```text
¿Por qué sudan, tiemblan y se confunden? ¡Hola, hijos de Florence Nightingale! Cuando baja la glucosa, el cuerpo libera adrenalina: aparecen sudor y temblor. Si al cerebro le falta combustible, puede aparecer confusión. Enfermería comprueba la glucemia y valora la conciencia y la capacidad para tragar. Si puede tragar con seguridad, administra glucosa de acción rápida según protocolo. Si no puede, evita la vía oral y activa la atención urgente. Después, vuelve a comprobar la glucemia y observa la respuesta. El sudor alerta; la confusión puede señalar falta de combustible cerebral. Síguenos en MediShort360.
```

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–3.5 | Mano que tiembla, gotas de sudor y gesto de confusión; pregunta visible. | ¿Por qué sudan, tiemblan y se confunden? | 7 |
| 3.5–6 | Persisten los signos durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 6–12 | Glucosa circulante baja y aparece respuesta de alarma con sudor y temblor. | Cuando baja la glucosa, el cuerpo libera adrenalina: aparecen sudor y temblor. | 12 |
| 12–16.5 | Zoom al cerebro: disminuye el aporte de glucosa y aparece desorientación. | Si al cerebro le falta combustible, puede aparecer confusión. | 9 |
| 16.5–23 | Medición sin cifras y valoración de conciencia y deglución. | Enfermería comprueba la glucemia y valora la conciencia y la capacidad para tragar. | 13 |
| 23–29 | Rama de deglución segura: administración oral según protocolo. | Si puede tragar con seguridad, administra glucosa de acción rápida según protocolo. | 12 |
| 29–35 | Rama de deglución insegura: se retira el recipiente y se activa ayuda urgente. | Si no puede, evita la vía oral y activa la atención urgente. | 12 |
| 35–40 | Nueva medición y comparación de respuesta clínica, sin tiempos inventados. | Después, vuelve a comprobar la glucemia y observa la respuesta. | 10 |
| 40–45.5 | Relacionar respuesta de alarma y afectación cerebral con los signos iniciales. | El sudor alerta; la confusión puede señalar falta de combustible cerebral. | 11 |
| 45.5–47 | Cierre de marca con movimiento. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR:** `RedBloodCell` (`src/anatomy/Cells.tsx`) como contexto vascular, sin presentarlo como transportador de glucosa; `Camera` y `shotAt` para acercamientos futuros.
- **FALTARÍA:** paciente adulto SVG con sudor, temblor y confusión; cerebro y glucosa; glucómetro sin valores, valoración de deglución y bifurcación de atención según seguridad de la vía oral. No reutilizar `ChildRig` como adulto sin adaptación.

### Afirmaciones y decisiones por confirmar

Todas las filas conservan revisión pendiente (`reviewedBy: null`).

| Id | Afirmación o decisión | Fuente y localización | Estado |
|---|---|---|---|
| HIPO-1 | Adrenalina, sudor/temblor y alteración cerebral | ADA, “Signs and symptoms”; NIDDK, “Symptoms” y “How do I treat” | [REVISAR] Validar la explicación conceptual; los signos no son exclusivos ni están siempre presentes. |
| HIPO-2 | Comprobar glucemia, conciencia y deglución; glucosa rápida si es seguro tragar | NIDDK, “How do I treat low blood glucose”; NHS, tratamiento de hipoglucemia | [REVISAR] Confirmar preparación de glucosa y circuito del protocolo local, fuera del audio. |
| HIPO-3 | Evitar vía oral si no puede tragar; ayuda urgente y nueva comprobación | NHS, “How to treat someone who's unconscious”; NIDDK, tratamiento | [REVISAR] Confirmar respuesta institucional para conciencia alterada; no sugerir esperar una medición si retrasa atención urgente. |

### Fuentes consultadas

- [ADA: Signs, Symptoms, and Treatment for Hypoglycemia](https://diabetes.org/living-with-diabetes/hypoglycemia-low-blood-glucose/symptoms-treatment), explicación de adrenalina y síntomas.
- [NIDDK: Low Blood Glucose](https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/low-blood-glucose-hypoglycemia), síntomas y tratamiento.
- [NHS: Low blood sugar](https://www.nhs.uk/conditions/low-blood-sugar-hypoglycaemia/), actuación según conciencia y seguridad de deglución; extracto indexado.

## 3. Insulina en la jeringa

Tipo: procedimiento. **95 palabras; 47.5 s nominales.**

### Guion — texto de audio

```text
¿Cómo sabes que cargaste las unidades correctas? ¡Hola, hijos de Florence Nightingale! Comprueba que la jeringa corresponda a la concentración de insulina. Mira los números y determina cuánto representa cada intervalo; no todas las escalas son iguales. Dos unidades, cuatro unidades, ocho unidades: son ejemplos de lectura, no dosis recomendadas. Alinea el borde del tapón más cercano a la aguja con la marca indicada, siguiendo al fabricante. Revisa que no haya burbujas. Contrasta la lectura con la prescripción antes de administrar. La cantidad se comprueba leyendo la escala, no calculándola a ojo. Síguenos en MediShort360.
```

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–3.5 | Jeringa cargada junto a prescripción; pregunta visible sobre la escala. | ¿Cómo sabes que cargaste las unidades correctas? | 7 |
| 3.5–6 | La cámara sigue acercándose a la escala durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 6–11 | Etiquetas del vial y jeringa se comparan para verificar compatibilidad. | Comprueba que la jeringa corresponda a la concentración de insulina. | 10 |
| 11–18.5 | Recorrer números y marcas; resaltar intervalos sin asumir una graduación universal. | Mira los números y determina cuánto representa cada intervalo; no todas las escalas son iguales. | 15 |
| 18.5–25 | Mostrar por separado dos, cuatro y ocho unidades en una escala validada; rótulo persistente: ejemplos de lectura. | Dos unidades, cuatro unidades, ocho unidades: son ejemplos de lectura, no dosis recomendadas. | 13 |
| 25–33.5 | Zoom al borde de referencia del tapón, que se alinea con la marca. | Alinea el borde del tapón más cercano a la aguja con la marca indicada, siguiendo al fabricante. | 17 |
| 33.5–36 | Inspección ampliada del líquido en busca de burbujas. | Revisa que no haya burbujas. | 5 |
| 36–40.5 | Comparación de marca cargada con prescripción anonimizada. | Contrasta la lectura con la prescripción antes de administrar. | 9 |
| 40.5–46 | Recorrido marca–borde–prescripción que demuestra la comprobación final. | La cantidad se comprueba leyendo la escala, no calculándola a ojo. | 11 |
| 46–47.5 | Cierre de marca con movimiento. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR:** `Camera` (`src/motion/Camera.tsx`), `shotAt` (`src/motion/shots.ts`) y `Callout` (`src/motion/Overlays.tsx`) para zoom y rotulación futuros. No existe un instrumento listo en la biblioteca.
- **FALTARÍA:** jeringa de insulina SVG parametrizable con marcas, escala y borde de lectura del modelo validado; vial/etiqueta, burbujas y prescripción de ejemplo. El conjunto histórico `ICUEquipment3D` no sustituye esta pieza.
- No dibujar la escala definitiva hasta verificar el modelo y sus instrucciones. Los ejemplos no representan una pauta ni indican cuánto administrar a un paciente.

### Afirmaciones y decisiones por confirmar

Todas las filas conservan revisión pendiente (`reviewedBy: null`).

| Id | Afirmación o decisión | Fuente y localización | Estado |
|---|---|---|---|
| INS-1 | Correspondencia jeringa–concentración y valor de intervalos | BD, catálogo, “Injection – Syringes”, p. 13; instrucciones del modelo concreto pendientes | [REVISAR] Confirmar fabricante, modelo, concentración compatible y graduación exacta. No asumir cuánto vale una raya ni hacer conversiones. |
| INS-2 | Borde del tapón y marca de lectura | embecta, “Insulin Syringe Injection Instructions”, pasos 7–9; HealthLink BC, “Insulin syringes”, descripción del émbolo | [REVISAR] La guía embecta alinea la línea negra fina; confirmar que el borde narrado coincide con la referencia del modelo que se dibujará. |
| INS-3 | Comprobar burbujas y lectura contra prescripción | embecta, mismos pasos | [REVISAR] Confirmar método del modelo y verificación institucional. No convertir los ejemplos dos/cuatro/ocho en dosis; no mostrar una inyección con esas cantidades. |

### Fuentes consultadas

- [BD: Medication Delivery Solutions Product Catalogue](https://www.bd.com/documents/international/catalogs/medication-delivery-solutions/MDS_Medication-Delivery-Solutions-Product-Catalogue_CT_EN.pdf), p. 13, graduaciones de jeringa y concentración; extracto indexado.
- [embecta: Getting Started Booklet](https://go.bd.com/rs/565-YXD-236/images/EMBC%20Getting%20Started%20Booklet_22-030_PRINT.pdf), “Insulin Syringe Injection Instructions (Continued)”, pasos 7–9; extracto indexado. El PDF completo excedió el límite del visor. No sustituye las instrucciones del dispositivo local.
- [HealthLink BC: Insulin syringes](https://www.healthlinkbc.ca/healthwise/insulin-syringes), partes y lectura del émbolo, consultado completo.

## 4. Cetoacidosis diabética

Tipo: enfermedad. **93 palabras; 46.5 s nominales.**

### Guion — texto de audio

```text
¿Por qué este paciente respira tan rápido y profundo? ¡Hola, hijos de Florence Nightingale! En la cetoacidosis diabética falta insulina efectiva y se acumulan cetonas que acidifican la sangre. El cuerpo intenta compensarlo eliminando dióxido de carbono al respirar. Puedes ver respiración profunda, vómitos y signos de deshidratación. Enfermería activa la atención urgente, controla glucosa y cetonas, y vigila conciencia, diuresis y potasio. Administra líquidos e insulina según prescripción y protocolo, con vigilancia del potasio. Esa respiración intenta compensar la acidez; reconocerla orienta la valoración, pero no confirma el diagnóstico. Síguenos en MediShort360.
```

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–4.5 | Tórax con respiración rápida y profunda; pregunta visible. | ¿Por qué este paciente respira tan rápido y profundo? | 9 |
| 4.5–7 | La respiración continúa durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 7–14.5 | Esquema metabólico: insulina insuficiente, formación de cetonas y acidez. | En la cetoacidosis diabética falta insulina efectiva y se acumulan cetonas que acidifican la sangre. | 15 |
| 14.5–19.5 | Zoom respiratorio: salida de dióxido de carbono como compensación, sin normalización instantánea. | El cuerpo intenta compensarlo eliminando dióxido de carbono al respirar. | 10 |
| 19.5–24 | Movimiento torácico y signos externos de vómito y deshidratación sin gore. | Puedes ver respiración profunda, vómitos y signos de deshidratación. | 9 |
| 24–31.5 | Aviso urgente y panel de valoración: glucosa, cetonas, conciencia, diuresis y potasio, sin cifras. | Enfermería activa la atención urgente, controla glucosa y cetonas, y vigila conciencia, diuresis y potasio. | 15 |
| 31.5–37.5 | Líquidos e insulina prescritos junto a control de potasio; sin dosis ni velocidades. | Administra líquidos e insulina según prescripción y protocolo, con vigilancia del potasio. | 12 |
| 37.5–45 | Conectar compensación respiratoria con acidez y evaluación diagnóstica. | Esa respiración intenta compensar la acidez; reconocerla orienta la valoración, pero no confirma el diagnóstico. | 15 |
| 45–46.5 | Cierre de marca con movimiento. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR:** `RedBloodCell` (`src/anatomy/Cells.tsx`) como contexto vascular; `Camera` y `shotAt` para conectar vista externa y mecanismo. Ninguno explica por sí solo la cetoacidosis.
- **FALTARÍA:** paciente adulto con respiración profunda, pulmón y eliminación de dióxido de carbono, esquema de cetonas/acidez, valoración y balance de diuresis; bolsa y monitor SVG independientes. `ICUPatient3D` y `ICUEquipment3D` son referencias históricas, no escenas SVG listas.

### Afirmaciones y decisiones por confirmar

Todas las filas conservan revisión pendiente (`reviewedBy: null`).

| Id | Afirmación o decisión | Fuente y localización | Estado |
|---|---|---|---|
| CAD-1 | Insulina insuficiente, cetonas y acidosis | Consenso ADA/EASD/JBDS/AACE/DTS 2024, sección 2, patogenia | [REVISAR] Validar la simplificación metabólica y no asociarla solo a un tipo de diabetes. |
| CAD-2 | Compensación con eliminación de dióxido de carbono, respiración profunda, vómitos y deshidratación | Mismo consenso, sección 3, “Clinical Presentation of DKA and HHS” | [REVISAR] Confirmar representación respiratoria; por sí sola no diagnostica cetoacidosis ni aparece siempre. |
| CAD-3 | Valoración urgente y vigilancia; líquidos, insulina y potasio | Mismo consenso, sección 4, evaluación inicial, “Fluid Therapy”, “Insulin” y “Potassium” | [REVISAR] Confirmar circuito local, balance/diuresis y valoración del potasio antes y durante la insulina. La narración no sustituye el orden clínico del protocolo. |

### Fuentes consultadas

- [Umpierrez et al.: Hyperglycemic Crises in Adults With Diabetes, consenso 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11272983/), secciones 2–4. DOI: 10.2337/dci24-0032. Texto del consenso consultado en PMC; el enlace editorial devolvió acceso denegado.

## 5. Hiperpotasemia

Tipo: enfermedad. **95 palabras; 47.5 s nominales.**

### Guion — texto de audio

```text
¿Por qué el ECG se ve así? ¡Hola, hijos de Florence Nightingale! Cuando aumenta el potasio en sangre, cambia la actividad eléctrica del corazón. Pueden aparecer ondas T picudas y ensancharse los complejos del trazado. Pero un electrocardiograma normal no descarta hiperpotasemia. Enfermería comunica la sospecha, monitoriza el ritmo y gestiona la comprobación del potasio según protocolo. Prepara el tratamiento prescrito y vigila la respuesta. Si se utiliza insulina, controla también la glucemia. El trazado cambia porque el exceso de potasio altera la conducción; hay que valorar al paciente y el laboratorio. Síguenos en MediShort360.
```

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–3.5 | ECG ilustrativo con T picuda; pregunta visible, sin cifra de potasio. | ¿Por qué el ECG se ve así? | 7 |
| 3.5–6 | El trazado sigue avanzando durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 6–12 | Zoom a membrana de célula cardíaca: potasio extracelular y actividad eléctrica. | Cuando aumenta el potasio en sangre, cambia la actividad eléctrica del corazón. | 12 |
| 12–17.5 | T picuda y QRS ancho como ejemplos separados, sin secuencia obligatoria. | Pueden aparecer ondas T picudas y ensancharse los complejos del trazado. | 11 |
| 17.5–21 | ECG aparentemente normal junto a comprobación de laboratorio; no descarta la alteración. | Pero un electrocardiograma normal no descarta hiperpotasemia. | 7 |
| 21–28.5 | Aviso al equipo, monitorización del ritmo y gestión de muestra de potasio. | Enfermería comunica la sospecha, monitoriza el ritmo y gestiona la comprobación del potasio según protocolo. | 15 |
| 28.5–32.5 | Preparación del tratamiento prescrito y reevaluación, sin fármacos ni dosis adicionales. | Prepara el tratamiento prescrito y vigila la respuesta. | 8 |
| 32.5–36.5 | Si aparece tratamiento con insulina, activar la vigilancia de glucemia. | Si se utiliza insulina, controla también la glucemia. | 8 |
| 36.5–46 | Conectar potasio, conducción, paciente y laboratorio para responder al gancho. | El trazado cambia porque el exceso de potasio altera la conducción; hay que valorar al paciente y el laboratorio. | 19 |
| 46–47.5 | Cierre de marca con movimiento. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR:** `Camera`, `shotAt` y `Callout` para acercamiento y etiquetas; `Outro` para cierre futuro.
- **FALTARÍA:** monitor ECG SVG independiente con ondas T y QRS revisables, célula cardíaca y distribución de potasio, muestra de laboratorio y vigilancia de glucemia. El monitor integrado de `ICUEquipment3D` no es un export SVG independiente ni un ECG clínicamente validado.

### Afirmaciones y decisiones por confirmar

Todas las filas conservan revisión pendiente (`reviewedBy: null`).

| Id | Afirmación o decisión | Fuente y localización | Estado |
|---|---|---|---|
| HIPERK-1 | Potasio elevado altera actividad/conducción; T picudas y QRS ancho | UKKA 2023, sección “ECG changes in hyperkalaemia”, pp. 61–64 | [REVISAR] Validar morfologías y trazado ilustrativo: no son exclusivos ni progresan en un orden obligado. |
| HIPERK-2 | ECG normal no descarta; integrar clínica y laboratorio | UKKA 2023, p. 64 y guías 14.1–14.2 | [REVISAR] Confirmar evaluación local, calidad de muestra y respuesta urgente; no retrasar el tratamiento de una situación crítica esperando repetir laboratorio. |
| HIPERK-3 | Monitorización y tratamiento prescrito; glucemia si se usa insulina | UKKA 2023, guías 14.1–14.2 y 17.1–17.2 | [REVISAR] Cotejar con la actualización UKKA anunciada de julio de 2026 y protocolo local; no se pudo recuperar su PDF actualizado. No se fijan dosis ni intervalos en audio. |

### Fuentes consultadas

- [UK Kidney Association: Management of Hyperkalaemia in Adults, 2023](https://www.ukkidney.org/sites/default/files/FINAL%20VERSION%20-%20UKKA%20CLINICAL%20PRACTICE%20GUIDELINE%20-%20MANAGEMENT%20OF%20HYPERKALAEMIA%20IN%20ADULTS%20-%20191223.pdf), ECG y monitorización, secciones indicadas arriba; PDF consultado.
- [Página oficial de la guía UKKA](https://www.ukkidney.org/health-professionals/guidelines/treatment-acute-hyperkalaemia-adults-0): el índice anuncia actualización de julio de 2026. Su PDF no se pudo recuperar por tiempo de espera; comprobar versión vigente antes de producción clínica.

## Verificación y pendientes del lote

- Lectura de `AGENTS.md`, `PLAYBOOKS.md`, `ESTANDAR-CALIDAD.md`, `LECCIONES.md`, `BIBLIOTECA.md` y plantilla; comprobación de existencia de las piezas propuestas para reutilización.
- Los cinco guiones cumplen 90–100 palabras. Solo el procedimiento de insulina contiene cantidades narradas, identificadas como ejemplos de lectura. No hay dosis recomendadas, rangos ni tiempos clínicos específicos.
- Pregunta primero, saludo exacto después y cierre exacto en todos. Sin acotaciones, corchetes, emojis ni cifras añadidas dentro del audio; se conserva la grafía de marca solicitada.
- Revisar pronunciación de hipoglucemia, cetoacidosis, diuresis, hiperpotasemia y ECG antes de grabar. Los conteos escritos no garantizan duración fonética; medir el MP3 cuando exista.
- Pendientes: revisión clínica del usuario, protocolos institucionales, instrucciones del modelo de jeringa y cotejo de la guía UKKA actualizada. Fuentes identificadas no equivalen a aprobación clínica.
- No se ejecutaron checks de código ni renders: el único cambio del repositorio es este documento. Contenido, conteos y diff revisados antes del commit; comprobación de formato aprobada. Sin push solicitado.
