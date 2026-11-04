# Preview-MasterHealing — verificación final

Composición vigente de 45 s, 1080 × 1920, 30 fps.

## Animación

- Hemostasia: llegada de plaquetas, malla de fibrina y eritrocitos retenidos.
- Inflamación: migración de neutrófilo y macrófago, desaparición secuencial de residuos y destellos al completar la limpieza.
- Proliferación: fibroblasto en movimiento, fibras que se dibujan, capilar que brota y queratinocitos que cierran los bordes.
- Remodelación: fibras que se alinean, retirada del capilar, desprendimiento de costra y piel nueva.
- Superficie: gotas con gravedad, hilo de sangre que cesa, herida que se achica, costra que se desprende, partículas de reparación, checks por fase y cierre de piel recuperada.
- Los días se interpolan desde healing-phases.json.

## Controles

appearAt, tripAt, impactAt, splitAt, healingAt, healedAt, closeAt, healingFrom, healingTo, zoomTop (2–3), zoomBottom (6–10), showDayCounter.

## Capturas finales

Generadas con npx remotion still, frames 60, 150, 240, 360, 540, 780, 1020, 1200 y 1320. Se conservan las nueve imágenes dentro de output/previews/.

| Segundo | Fase | Zoom inferior | Célula menor (px) | Fuente menor (px) | Cumple |
|---|---|---:|---:|---:|---|
| 2 | Caída | No aplica | No aplica | 64 | Sí |
| 5 | Caída | No aplica | No aplica | 64 | Sí |
| 8 | Hemostasia | 8× | 120 | 30 | Sí |
| 12 | Hemostasia | 8× | 120 | 30 | Sí |
| 18 | Inflamación | 8× | 200 | 30 | Sí |
| 26 | Proliferación | 8× | 140 | 30 | Sí |
| 34 | Remodelación | 8× | 160 | 30 | Sí |
| 40 | Remodelación | 8× | 160 | 30 | Sí |
| 44 | Cierre | No aplica | No aplica | 48 | Sí |

Las dimensiones se obtienen de la misma geometría SVG que dibuja las membranas celulares, excluyendo el grosor decorativo del trazo; se informa su menor dimensión. Núcleos y otras estructuras internas no son células adicionales. Las fuentes se informan en CSS/SVG px, no como altura de los píxeles de cada glifo. Las células completas miden de 120 a 240 px. Las etiquetas celulares usan 36 px; los textos de apoyo, 30 px; las fases, 64 px; días y porcentaje, 72 px.

Durante la caída y el cierre no se muestra la ventana microscópica: zoom y tamaño celular no aplican. Las nueve imágenes se revisaron visualmente; master-metrics.json contiene dimensiones, límites y SHA-256.

La revisión clínica y las fuentes del JSON siguen pendientes, como ya indica su campo revisar. Esta verificación comprueba la composición visual. No se abrió navegador ni Studio; no se generó un video final ni se hizo merge.
