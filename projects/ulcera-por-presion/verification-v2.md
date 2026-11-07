# Revisión v2 — úlcera por presión

Audio: 44.042438 s. Video: 44.066667 s. Diferencia: 0.024229 s, inferior a un fotograma. Voz y tiempos previos conservados.

## Diagnóstico antes del diseño

Las cinco búsquedas fallaban por ausencia real en este MP3: superficie, Después, ampollas, herida abierta y vivo. No era un fallo de acentos, mayúsculas o puntuación. La búsqueda antigua no eliminaba acentos, lo que sí limitaba variantes de entrada; la nueva elimina diacríticos/signos y une tokens fragmentados solo para buscar. «MediShort360» son dos tokens; «no palidece» está en 27.260–28.000 s. No se corrigió el audio ni se cambiaron intervalos.

Transcript completo por palabra: transcript-words.md. Datos auditables: search-diagnostic-v2.json, time-integrity-v2.json y check-v2.json.

## Escenas con anclas reales

- Escena ocho: El daño, 21.500 s; junto al hueso termina en 24.620 s. La superficie cerrada se ve en ese corte, aunque la palabra no se dice.
- Escena nueve: Por fuera, 25.040 s; no palidece, 27.260 s; presionarla, 28.120 s.
- Escena diez: Si la presión continúa, 28.800 s; continúa termina en 30.560 s; oscurece, 30.920 s; rompe, 32.000 s; úlcera, 33.540 s. La ampolla y los iconos fueron pedidos expresamente en v2: ilustración adicional, no palabra recuperada del audio.
- Escena doce: salva el tejido empieza en 39.420 s. Se recupera solo tejido viable; la necrosis no desaparece.

## Veinte capturas, sin relleno

| Cuadro | Fotograma / segundo | Audio usado como ancla | Zoom | Célula menor | Letra menor | Marca |
|---|---|---|---:|---:|---:|---|
| 1. Paciente en cama | 0 / 0.000 s | ¿Cómo | 1 | No aplica | 40 px | Visible |
| 2. Push-in | 49 / 1.633 s | puede | 1.757 | No aplica | 40 px | Visible |
| 3. Región sacra y lupa | 89 / 2.967 s | piel intacta? | 2.2 | No aplica | 40 px | Visible |
| 4. Hueso | 265 / 8.833 s | hueso, | 1 | No aplica | 40 px | Visible |
| 5. Capilares comprimidos | 384 / 12.800 s | capilares | 8 | 122 px | 40 px | Visible |
| 6. Sangre detenida | 445 / 14.833 s | deja de llegar. | 8 | 122 px | 40 px | Visible |
| 7. Oxígeno | 478 / 15.933 s | oxígeno | 8 | 122 px | 40 px | Visible |
| 8. Célula lesionada | 553 / 18.433 s | debilitan | 8 | 216 px | 40 px | Visible |
| 9. Cielito, desprendimiento | 580 / 19.333 s | mueren. | 8 | 160 px | 40 px | Visible |
| 10. Cielito, ascenso | 628 / 20.933 s | necrosis. | 8 | 160 px | 40 px | Visible |
| 11. Necrosis | 637 / 21.233 s | necrosis. | 8 | 216 px | 40 px | Visible |
| 12. Superficie | 738 / 24.600 s | junto al hueso. | 1 | No aplica | 40 px | Visible |
| 13. Después con reloj | 764 / 25.467 s | Por fuera, | 1 | No aplica | 44 px | Visible |
| 14. No palidece | 863 / 28.767 s | presionarla. | 1 | No aplica | 44 px | Visible |
| 15. Ampolla | 938 / 31.267 s | oscurece, | 1 | No aplica | 36 px | Visible |
| 16. Herida abierta | 1013 / 33.767 s | úlcera. | 1 | No aplica | 36 px | Visible |
| 17. Posición | 1086 / 36.200 s | posición | 8 | 122 px | 40 px | Visible |
| 18. Descarga | 1112 / 37.067 s | descarga | 8 | 122 px | 40 px | Visible |
| 19. Tejido vivo | 1212 / 40.400 s | tejido. | 8 | 122 px | 40 px | Visible |
| 20. MediShort360 | 1277 / 42.567 s | MediShort 360. | 1 | No aplica | 44 px | Visible |

Medidas a resolución de diseño 1080 × 1920; el borrador es 540 × 960. Son cotas conservadoras de geometría SVG y font-size efectivo, no altura raster de glifos. Microscopio ocho sobre el espacio normalizado; apertura uno a dos coma dos aplicado al contenido. Eritrocitos: al menos 122 px; células de tejido: 172 px en dividido y 216 px en macro completa; siluetas metafóricas: 160 px. «No aplica» indica vista de paciente, piel, reloj, herida o marca sin micromundo celular. La captura se toma en una muestra derivada de un intervalo o pausa real; la columna de audio no atribuye al MP3 una palabra ausente.

## Textos y motivos

- MEDISHORT360: marca constante.
- ÚLCERAS POR PRESIÓN: identifica el tema sin sonido.
- Región sacra, Talones, Epidermis, Dermis, Tejido graso, Músculo, Hueso, Capilar, Glóbulos rojos, Célula, Núcleo, Oxígeno, Nutrientes, Necrosis, NECROSIS, Ampolla, Herida abierta: identificación anatómica o de elementos mostrados.
- Piel roja, Ampolla y Herida abierta: tres nombres de los iconos de evolución pedidos en v2; no afirma una progresión clínica universal.
- Subtítulos exactos por token: ¿Cómo · puede · morir · tejido · bajo · una · piel · intacta? · ¡Hola, · hijos · de · Florence · Nightingale! · Todo · empieza · con · presión · sostenida · sobre · un · hueso, · como · el · talón · o · el · sacro. · La · presión · aplasta · los · capilares · y · la · sangre · deja · de · llegar. · Sin · oxígeno · ni · nutrientes, · las · células · se · debilitan · y · mueren. · Es · la · necrosis. · El · daño · suele · empezar · en · profundidad, · junto · al · hueso. · Por · fuera, · la · piel · se · enrojece · y · no · palidece · al · presionarla. · Si · la · presión · continúa, · se · oscurece, · se · rompe · y · se · forma · la · úlcera. · Por · eso, · enfermería · cambia · la · posición · y · descarga · el · apoyo. · Devolver · la · sangre · salva · el · tejido. · Síguenos · en · MediShort · 360..

## Verificado y pendiente

- Marca detectada en los 1322 fotogramas; mínimo 1220 píxeles claros en la zona fija, más revisión visual de capturas.
- Validación sin errores y typecheck aprobados; se conservan advertencias de hechos sin fuente/revisión y de dos recursos históricos no utilizados. Render de borrador y QA técnico registrados en qa-draft-v2.json.
- Se añadió HospitalRoom con parámetro site, CellSoul y StructureLabel con adaptadores SceneProps registrados. Los defaults de los componentes compartidos se conservan.
- Se eliminan la mezcla de capas previas y las partículas de fondo durante la muerte celular; las células muertas quedan en su lugar. El cielito es una metáfora visual expresamente solicitada, no fisiopatología.
- Hubo un primer fallo de permisos al leer remotion.config.ts; se conservó completo en render-v2-initial-error.log y se reintentó en el entorno autorizado. No se instaló ninguna dependencia.
- Pendiente revisión humana de anatomía, interpretación del montaje, metáfora y sincronía percibida. No se hizo escucha fonética humana ni revisión clínica integral. No se editó el MP3, no hubo render final ni merge.
