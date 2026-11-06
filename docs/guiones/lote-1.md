# Lote 1 — cinco guiones de enfermería

- Rama: `chore/guiones-lote-1`. Base comprobada: `cf62d2b5997abb57b92568579a2becd22f35c8fa`, con biblioteca, playbooks y regla de gancho.
- Alcance: solo guiones y planificación escrita. Sin animaciones, audio, proyectos, ramas de video, renders ni merge.
- Estado: propuestas con fuentes consultadas y revisión clínica pendiente; no son narraciones clínicamente aprobadas. No hubo archivo clínico adjunto. Las decisiones institucionales y del dispositivo van en las listas externas de [REVISAR].
- Conteo: palabras separadas por espacios, incluidos gancho, saludo y cierre; `MediShort360` cuenta como una palabra. Estimación nominal: total dividido entre dos palabras por segundo, sin añadir pausas. Duración real pendiente de MP3; no se acelera la voz para ajustarla.
- Enfoque vigente: casi toda la narración explica una cadena causal con verbos dibujables; enfermería queda en una o dos frases al final. El procedimiento de insulina sigue una cadena instrumental. Se conserva el objetivo de noventa a cien palabras; preguntas y fenómeno visibles desde el inicio. La duración oral de cada pregunta se estima en la tabla, sin prometer que una pregunta larga se narra en tres segundos.
- Cada fila de las tablas es un evento propuesto en SVG, no una animación creada ni un tiempo medido. Las frases largas pueden dividirse visualmente sin repetir contenido. El saludo acompaña la acción; los cierres clínicos responden al gancho antes de la marca.
- Piezas comunes previstas: `Camera`, `shotAt`, `LabelBar`/`Callout`, `Watermark` y `Outro` según `docs/BIBLIOTECA.md`. `Captions` se utilizaría solo con tiempos reales del futuro audio. Adaptar tamaños al estándar; ninguna pieza queda clínicamente aprobada por estar inventariada.

## 1. Úlcera por presión

Tipo: enfermedad. **96 palabras; 48 s nominales.**

### Guion — texto de audio

```text
¿Cómo puede morir tejido bajo una piel intacta? ¡Hola, hijos de Florence Nightingale! En las úlceras por presión, el apoyo comprime el tejido contra el hueso. Los capilares se estrechan y llega menos sangre. Entonces faltan oxígeno y nutrientes; las células se lesionan y pueden morir. Esa muerte es la necrosis. El daño puede comenzar junto al hueso mientras la superficie sigue cerrada. Después pueden aparecer cambios de color, ampollas o una herida abierta. Por eso enfermería cambia la posición y descarga el apoyo: retirar la presión protege el tejido que sigue vivo. Síguenos en MediShort360.
```

### Cadena dibujable

Apoyo sobre prominencia → compresión tisular/capilar → menor riego → menor aporte de oxígeno y nutrientes → lesión y posible necrosis → posible alteración superficial. Enfermería al final: cambio de postura y descarga.

### Pantalla en los primeros tres segundos

Piel cerrada sobre talón y corte profundo que revela daño. Pregunta completa visible desde el inicio, comprensible sin sonido. No se crea esta animación en este encargo.

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–4 | Piel cerrada sobre talón y corte profundo que revela daño. | ¿Cómo puede morir tejido bajo una piel intacta? | 8 |
| 4–6.5 | Continúa el apoyo durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 6.5–13 | El talón comprime el tejido contra el hueso; aparece el nombre del tema. | En las úlceras por presión, el apoyo comprime el tejido contra el hueso. | 13 |
| 13–17 | Capilares estrechos y menor flujo de eritrocitos. | Los capilares se estrechan y llega menos sangre. | 8 |
| 17–23 | Menor llegada de oxígeno y nutrientes, seguida de lesión celular. | Entonces faltan oxígeno y nutrientes; las células se lesionan y pueden morir. | 12 |
| 23–25.5 | Células muertas identificadas como necrosis. | Esa muerte es la necrosis. | 5 |
| 25.5–31.5 | Contraste entre lesión profunda y superficie aún cerrada. | El daño puede comenzar junto al hueso mientras la superficie sigue cerrada. | 12 |
| 31.5–37 | Ejemplos alternativos de coloración, ampolla y pérdida de piel; no etapas obligatorias. | Después pueden aparecer cambios de color, ampollas o una herida abierta. | 11 |
| 37–46.5 | Cambio de postura y descarga; tejido viable protegido, sin revivir células necróticas. | Por eso enfermería cambia la posición y descarga el apoyo: retirar la presión protege el tejido que sigue vivo. | 19 |
| 46.5–48 | Cierre de marca. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR, con adaptación posterior:** `SkinSection` (`src/anatomy/SkinSection.tsx`) o `SkinLayers` (`src/anatomy/SkinLayers.tsx`) como base de capas cutáneas; `RedBloodCell` (`src/anatomy/Cells.tsx`) para flujo. No usar la coreografía de cicatrización como si ya representara lesión por presión.
- **FALTARÍA:** talón y prominencia ósea, compresión tisular y alteración del flujo, daño profundo bajo piel intacta, descarga y postura asistida, piel en distintos tonos. Harían falta adaptador y revisión anatómica; no se crean en este lote.

### Afirmaciones y decisiones por confirmar

- [REVISAR] Compresión y reducción del riego son una simplificación: también hay deformación directa. Confirmar necrosis y lesión profunda; coloración, ampolla y herida son posibilidades, no una progresión universal. No afirmar que descargar revierte necrosis. Fuentes: NPIAP, NICE, NHS y Gefen et al.
- Revisión clínica pendiente; conservar reviewedBy en null. Confirmar representaciones concretas antes de producir audio o animaciones.

### Fuentes consultadas

- [NHS: Pressure ulcers](https://www.nhs.uk/conditions/pressure-sores/), apartados Symptoms, Causes y Treatments.
- [NICE CG179: Recommendations](https://www.nice.org.uk/guidance/cg179/chapter/Recommendations), secciones indicadas arriba. El texto completo devolvió acceso denegado; se consultaron los extractos indexados de recomendaciones, no se afirma haber descargado el PDF.
- [NPIAP: Pressure Injury Definitions](https://cdn.ymaws.com/npiap.com/resource/resmgr/online_store/posters/1a._npuap_staging_poster.pdf), definiciones de lesión y daño profundo consultadas mediante extracto indexado.
- [Gefen et al.: Our contemporary understanding of the aetiology of pressure ulcers/pressure injuries](https://onlinelibrary.wiley.com/doi/10.1111/iwj.13667), mecanismos de deformación e isquemia; extracto indexado consultado en esta revisión.

## 2. Hipoglucemia

Tipo: enfermedad. **96 palabras; 48 s nominales.**

### Guion — texto de audio

```text
¿Por qué sudan, tiemblan y se confunden? ¡Hola, hijos de Florence Nightingale! La glucosa baja y el cuerpo libera adrenalina para movilizar combustible. Esa respuesta acelera el corazón y hace temblar las manos; también aparece sudor. Mientras tanto, al cerebro le llega menos glucosa. Sus células pierden combustible y pueden aparecer confusión, somnolencia o convulsiones. Pero algunas personas no sienten las señales de alarma. Enfermería comprueba la glucemia y trata según protocolo, con una vía segura si no pueden tragar. El temblor viene de la alarma; la confusión, del cerebro sin suficiente glucosa. Síguenos en MediShort360.
```

### Cadena dibujable

Glucosa baja → respuesta de adrenalina → temblor y otros signos de alarma; en paralelo, menor glucosa cerebral → disfunción neurológica. Enfermería al final: comprobación y tratamiento seguro.

### Pantalla en los primeros tres segundos

Sudor, mano temblorosa y gesto de confusión. Pregunta completa visible desde el inicio, comprensible sin sonido. No se crea esta animación en este encargo.

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–3.5 | Sudor, mano temblorosa y gesto de confusión. | ¿Por qué sudan, tiemblan y se confunden? | 7 |
| 3.5–6 | Los signos siguen durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 6–11.5 | Baja la glucosa y aparece la respuesta de adrenalina. | La glucosa baja y el cuerpo libera adrenalina para movilizar combustible. | 11 |
| 11.5–18 | Latido acelerado, temblor y sudor como respuestas de alarma. | Esa respuesta acelera el corazón y hace temblar las manos; también aparece sudor. | 13 |
| 18–22 | Zoom al cerebro: menor disponibilidad de glucosa. | Mientras tanto, al cerebro le llega menos glucosa. | 8 |
| 22–27.5 | Alteración neuronal y posibles manifestaciones neurológicas, sin gore. | Sus células pierden combustible y pueden aparecer confusión, somnolencia o convulsiones. | 11 |
| 27.5–32 | Paciente sin señales de alarma junto a glucosa baja. | Pero algunas personas no sienten las señales de alarma. | 9 |
| 32–40 | Comprobación de glucemia y tratamiento por vía segura según protocolo. | Enfermería comprueba la glucemia y trata según protocolo, con una vía segura si no pueden tragar. | 16 |
| 40–46.5 | Conectar respuesta de alarma con temblor y menor glucosa cerebral con confusión. | El temblor viene de la alarma; la confusión, del cerebro sin suficiente glucosa. | 13 |
| 46.5–48 | Cierre de marca. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR:** `RedBloodCell` (`src/anatomy/Cells.tsx`) como contexto vascular, sin presentarlo como transportador de glucosa; `Camera` y `shotAt` para acercamientos futuros.
- **FALTARÍA:** paciente adulto SVG con sudor, temblor y confusión; cerebro y glucosa; glucómetro sin valores, valoración de deglución y bifurcación de atención según seguridad de la vía oral. No reutilizar `ChildRig` como adulto sin adaptación.

### Afirmaciones y decisiones por confirmar

- [REVISAR] Confirmar respuesta de adrenalina, síntomas autonómicos y manifestaciones neurológicas incluida convulsión; las señales pueden faltar. Validar vía de tratamiento según deglución y protocolo urgente. Fuentes: ADA, NIDDK y NHS.
- Revisión clínica pendiente; conservar reviewedBy en null. Confirmar representaciones concretas antes de producir audio o animaciones.

### Fuentes consultadas

- [ADA: Signs, Symptoms, and Treatment for Hypoglycemia](https://diabetes.org/living-with-diabetes/hypoglycemia-low-blood-glucose/symptoms-treatment), explicación de adrenalina y síntomas.
- [NIDDK: Low Blood Glucose](https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/low-blood-glucose-hypoglycemia), síntomas y tratamiento.
- [NHS: Low blood sugar](https://www.nhs.uk/conditions/low-blood-sugar-hypoglycaemia/), actuación según conciencia y seguridad de deglución; extracto indexado.

## 3. Insulina en la jeringa

Tipo: procedimiento. **98 palabras; 49 s nominales.**

### Guion — texto de audio

```text
¿Cómo sabes que cargaste las unidades correctas? ¡Hola, hijos de Florence Nightingale! Al tirar del émbolo, aumenta el espacio dentro de la jeringa y entra insulina. El émbolo se desplaza por la escala; su posición permite leer la cantidad. Entre los números hay marcas, pero cada intervalo depende del modelo. Dos unidades, cuatro unidades, ocho unidades: son ejemplos de lectura, no dosis. Una burbuja ocupa espacio sin aportar insulina; por eso puede falsear la cantidad cargada. Enfermería verifica la jeringa compatible y contrasta la lectura con la prescripción: la marca debe corresponder a lo indicado. Síguenos en MediShort360.
```

### Cadena dibujable

Retracción del émbolo → entrada de insulina → posición sobre escala → lectura de marcas; burbuja → espacio ocupado sin insulina. Es un mecanismo instrumental, no se fuerza fisiopatología ajena al procedimiento. Enfermería al final: compatibilidad y cotejo con prescripción.

### Pantalla en los primeros tres segundos

Jeringa cargada y pregunta sobre escala. Pregunta completa visible desde el inicio, comprensible sin sonido. No se crea esta animación en este encargo.

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–3.5 | Jeringa cargada y pregunta sobre escala. | ¿Cómo sabes que cargaste las unidades correctas? | 7 |
| 3.5–6 | Acercamiento a escala durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 6–13 | Émbolo se retrae e insulina entra desde vial; nunca desde una pluma. | Al tirar del émbolo, aumenta el espacio dentro de la jeringa y entra insulina. | 14 |
| 13–19.5 | Posición del émbolo vinculada a escala. | El émbolo se desplaza por la escala; su posición permite leer la cantidad. | 13 |
| 19.5–25 | Se recorren marcas; comparación entre modelos sin equivalencias inventadas. | Entre los números hay marcas, pero cada intervalo depende del modelo. | 11 |
| 25–31 | Ejemplos de dos, cuatro y ocho unidades, rotulados como lectura, no dosis. | Dos unidades, cuatro unidades, ocho unidades: son ejemplos de lectura, no dosis. | 12 |
| 31–38 | Burbuja ocupa parte del espacio: menos líquido para la misma posición. | Una burbuja ocupa espacio sin aportar insulina; por eso puede falsear la cantidad cargada. | 14 |
| 38–47.5 | Comprobar compatibilidad y cotejar escala con prescripción; borde exacto pendiente. | Enfermería verifica la jeringa compatible y contrasta la lectura con la prescripción: la marca debe corresponder a lo indicado. | 19 |
| 47.5–49 | Cierre de marca. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR:** `Camera` (`src/motion/Camera.tsx`), `shotAt` (`src/motion/shots.ts`) y `Callout` (`src/motion/Overlays.tsx`) para zoom y rotulación futuros. No existe un instrumento listo en la biblioteca.
- **FALTARÍA:** jeringa de insulina SVG parametrizable con marcas, escala y borde de lectura del modelo validado; vial/etiqueta, burbujas y prescripción de ejemplo. El conjunto histórico `ICUEquipment3D` no sustituye esta pieza.
- No dibujar la escala definitiva hasta verificar el modelo y sus instrucciones. Los ejemplos no representan una pauta ni indican cuánto administrar a un paciente.

### Afirmaciones y decisiones por confirmar

- [REVISAR] Confirmar modelo, concentración, valor de marcas, efecto de burbujas y borde o línea exactos de lectura. Ese borde queda fuera del audio. Los ejemplos no son dosis. Fuentes: BD, embecta y HealthLink BC.
- Revisión clínica pendiente; conservar reviewedBy en null. Confirmar representaciones concretas antes de producir audio o animaciones.

### Fuentes consultadas

- [BD: Medication Delivery Solutions Product Catalogue](https://www.bd.com/documents/international/catalogs/medication-delivery-solutions/MDS_Medication-Delivery-Solutions-Product-Catalogue_CT_EN.pdf), p. 13, graduaciones de jeringa y concentración; extracto indexado.
- [embecta: Getting Started Booklet](https://go.bd.com/rs/565-YXD-236/images/EMBC%20Getting%20Started%20Booklet_22-030_PRINT.pdf), “Insulin Syringe Injection Instructions (Continued)”, pasos 7–9; extracto indexado. El PDF completo excedió el límite del visor. No sustituye las instrucciones del dispositivo local.
- [HealthLink BC: Insulin syringes](https://www.healthlinkbc.ca/healthwise/insulin-syringes), partes y lectura del émbolo, consultado completo.

## 4. Cetoacidosis diabética

Tipo: enfermedad. **96 palabras; 48 s nominales.**

### Guion — texto de audio

```text
¿Por qué este paciente respira tan profundo? ¡Hola, hijos de Florence Nightingale! Falta insulina efectiva y el cuerpo descompone grasa. El hígado transforma parte de esa grasa en cetonas. Cuando se acumulan, acidifican la sangre. Entonces aumenta la ventilación: el pecho se expande profundamente y expulsa más dióxido de carbono. Al eliminarlo, el cuerpo intenta compensar la acidez. Pero respirar así no elimina las cetonas ni resuelve la causa. Enfermería activa la atención urgente y vigila el potasio durante el tratamiento, porque la insulina puede hacerlo bajar. Esa respiración es compensación, no recuperación. Síguenos en MediShort360.
```

### Cadena dibujable

Insulina insuficiente → degradación de grasa → cetogénesis hepática → acidosis → mayor ventilación → eliminación de dióxido de carbono como compensación. Enfermería al final: atención urgente y vigilancia de potasio.

### Pantalla en los primeros tres segundos

Paciente con respiración profunda. Pregunta completa visible desde el inicio, comprensible sin sonido. No se crea esta animación en este encargo.

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–3.5 | Paciente con respiración profunda. | ¿Por qué este paciente respira tan profundo? | 7 |
| 3.5–6 | Continúa el movimiento torácico durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 6–10 | Insulina insuficiente y liberación de grasa. | Falta insulina efectiva y el cuerpo descompone grasa. | 8 |
| 10–14.5 | Ácidos grasos llegan al hígado y se forman cetonas. | El hígado transforma parte de esa grasa en cetonas. | 9 |
| 14.5–17.5 | Cetonas se acumulan y aumenta la acidez ilustrativa. | Cuando se acumulan, acidifican la sangre. | 6 |
| 17.5–25 | Tórax se expande y expulsa dióxido de carbono. | Entonces aumenta la ventilación: el pecho se expande profundamente y expulsa más dióxido de carbono. | 15 |
| 25–29 | Salida de dióxido de carbono compensa parcialmente la acidez. | Al eliminarlo, el cuerpo intenta compensar la acidez. | 8 |
| 29–34.5 | Persisten cetonas y causa subyacente pese a la compensación. | Pero respirar así no elimina las cetonas ni resuelve la causa. | 11 |
| 34.5–43.5 | Aviso urgente y vigilancia de potasio durante tratamiento. | Enfermería activa la atención urgente y vigila el potasio durante el tratamiento, porque la insulina puede hacerlo bajar. | 18 |
| 43.5–46.5 | Distinguir compensación respiratoria de recuperación metabólica. | Esa respiración es compensación, no recuperación. | 6 |
| 46.5–48 | Cierre de marca. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR:** `RedBloodCell` (`src/anatomy/Cells.tsx`) como contexto vascular; `Camera` y `shotAt` para conectar vista externa y mecanismo. Ninguno explica por sí solo la cetoacidosis.
- **FALTARÍA:** paciente adulto con respiración profunda, pulmón y eliminación de dióxido de carbono, esquema de cetonas/acidez, valoración y balance de diuresis; bolsa y monitor SVG independientes. `ICUPatient3D` y `ICUEquipment3D` son referencias históricas, no escenas SVG listas.

### Afirmaciones y decisiones por confirmar

- [REVISAR] Confirmar cadena lipólisis–cetogénesis hepática–acidosis, compensación respiratoria y descenso de potasio con insulina. La respiración no confirma por sí sola el diagnóstico. Fuente: consenso internacional de 2024, patogenia, presentación y potasio.
- Revisión clínica pendiente; conservar reviewedBy en null. Confirmar representaciones concretas antes de producir audio o animaciones.

### Fuentes consultadas

- [Umpierrez et al.: Hyperglycemic Crises in Adults With Diabetes, consenso 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11272983/), secciones 2–4. DOI: 10.2337/dci24-0032. Texto del consenso consultado en PMC; el enlace editorial devolvió acceso denegado.

## 5. Hiperpotasemia

Tipo: enfermedad. **96 palabras; 48 s nominales.**

### Guion — texto de audio

```text
¿Por qué el ECG se ve así? ¡Hola, hijos de Florence Nightingale! El potasio se acumula fuera de las células cardíacas y cambia su equilibrio eléctrico. Al principio puede acelerar la recuperación eléctrica y formar ondas T picudas. Si la alteración aumenta, puede frenar la conducción: el impulso se propaga más lento y el complejo se ensancha. Pero esos cambios no siguen siempre ese orden; incluso puede haber un trazado normal. Enfermería monitoriza el ritmo y avisa ante cambios sospechosos. Esas ondas pueden ser la huella del potasio alterando la electricidad del corazón. Síguenos en MediShort360.
```

### Cadena dibujable

Potasio extracelular elevado → cambios de excitabilidad/recuperación eléctrica → posibles T picudas y enlentecimiento de conducción → posibles complejos anchos. Manifestaciones variables, no escalera obligatoria. Enfermería al final: monitorización y aviso.

### Pantalla en los primeros tres segundos

ECG con ondas T picudas. Pregunta completa visible desde el inicio, comprensible sin sonido. No se crea esta animación en este encargo.

### Plan escrito de eventos

| Segundo estimado | Evento visual propuesto | Frase exacta | Palabras |
|---|---|---|---:|
| 0–3.5 | ECG con ondas T picudas. | ¿Por qué el ECG se ve así? | 7 |
| 3.5–6 | El trazado sigue durante el saludo. | ¡Hola, hijos de Florence Nightingale! | 5 |
| 6–13 | Zoom a célula cardíaca y acumulación extracelular de potasio. | El potasio se acumula fuera de las células cardíacas y cambia su equilibrio eléctrico. | 14 |
| 13–19 | Recuperación eléctrica alterada, conectada a la onda T. | Al principio puede acelerar la recuperación eléctrica y formar ondas T picudas. | 12 |
| 19–28.5 | Impulso más lento y complejo ancho. | Si la alteración aumenta, puede frenar la conducción: el impulso se propaga más lento y el complejo se ensancha. | 19 |
| 28.5–35.5 | Ejemplos alternativos y ECG aparentemente normal, sin secuencia obligatoria. | Pero esos cambios no siguen siempre ese orden; incluso puede haber un trazado normal. | 14 |
| 35.5–40 | Monitorización y aviso ante cambios. | Enfermería monitoriza el ritmo y avisa ante cambios sospechosos. | 9 |
| 40–46.5 | Conectar distribución de potasio, electricidad cardíaca y ECG. | Esas ondas pueden ser la huella del potasio alterando la electricidad del corazón. | 13 |
| 46.5–48 | Cierre de marca. | Síguenos en MediShort360. | 3 |

### Piezas previstas

- **REUTILIZAR:** `Camera`, `shotAt` y `Callout` para acercamiento y etiquetas; `Outro` para cierre futuro.
- **FALTARÍA:** monitor ECG SVG independiente con ondas T y QRS revisables, célula cardíaca y distribución de potasio, muestra de laboratorio y vigilancia de glucemia. El monitor integrado de `ICUEquipment3D` no es un export SVG independiente ni un ECG clínicamente validado.

### Afirmaciones y decisiones por confirmar

- [REVISAR] Confirmar simplificación de recuperación eléctrica y conducción, morfologías y ausencia de secuencia fija; un ECG normal no excluye hiperpotasemia ni sustituye laboratorio. Conservar cotejo pendiente de UKKA actualizada. Fuente: UKKA, ECG y monitorización.
- Revisión clínica pendiente; conservar reviewedBy en null. Confirmar representaciones concretas antes de producir audio o animaciones.

### Fuentes consultadas

- [UK Kidney Association: Management of Hyperkalaemia in Adults, 2023](https://www.ukkidney.org/sites/default/files/FINAL%20VERSION%20-%20UKKA%20CLINICAL%20PRACTICE%20GUIDELINE%20-%20MANAGEMENT%20OF%20HYPERKALAEMIA%20IN%20ADULTS%20-%20191223.pdf), ECG y monitorización, secciones indicadas arriba; PDF consultado.
- [Página oficial de la guía UKKA](https://www.ukkidney.org/health-professionals/guidelines/treatment-acute-hyperkalaemia-adults-0): el índice anuncia actualización de julio de 2026. Su PDF no se pudo recuperar por tiempo de espera; comprobar versión vigente antes de producción clínica.

## Verificación y pendientes del lote

- Nueva dirección editorial: cadena causal predominante, verbos animables y enfermería en una frase final por tema. No se crearon animaciones ni ramas de video.
- Los cinco guiones cumplen noventa a cien palabras. Saludo después del gancho y cierre exacto; ejemplos de unidades solo en insulina. Sin acotaciones ni notas clínicas dentro del audio.
- El guion de úlcera menciona expresamente «úlceras por presión» después del saludo. Frente al ejemplo propuesto, evita una progresión superficial universal y la promesa de recuperar tejido necrótico.
- Fuentes anteriores conservadas. Las afirmaciones siguen pendientes de revisión clínica; no presentar una clasificación de lesiones como secuencia temporal obligatoria.
- Comprobar conteos, tablas, fuentes y diff; no corresponden renders ni pruebas de código. Commit en chore/guiones-lote-1, sin merge ni push.
