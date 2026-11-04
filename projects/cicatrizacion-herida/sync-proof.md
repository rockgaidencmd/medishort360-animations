# Prueba de sincronía con la narración final

Audio original medido con FFprobe: 54.752625 s. Video borrador medido: 54.766667 s. La diferencia es 0.014042 s, menor que un fotograma a treinta fps. Las escenas terminan exactamente en transcript.durationSec = 54.753 s.

Se generaron y revisaron las diez imágenes de la composición cicatrizacion-herida, no del preview silencioso. Las palabras están en sus tiempos de Whisper, corregidas solo en ortografía. Cada evento se adelanta 0.1 s para que ya se vea al decir la palabra; el adelanto efectivo máximo medido al cuantizar el reloj es 0.106667 s.

| Palabra/frase real | Inicio palabra (s) | Inicio evento (s) | Fotograma | Instante del fotograma (s) | Evento observado | Coincide |
|---|---:|---:|---:|---:|---|---|
| sangra | 6.900 | 6.800 | 207 | 6.900000 | Gotas e hilo de sangre en la herida; todavía no se adelanta la tarjeta de Hemostasia. | Sí, inicio |
| plaquetas | 13.500 | 13.400 | 405 | 13.500000 | Plaquetas y etiqueta visibles; comienza su llegada al corte. | Sí, inicio |
| fibrina | 15.720 | 15.620 | 472 | 15.733333 | Primeros trazos de la malla y etiqueta Fibrina visibles; los glóbulos rojos aún esperan su palabra. | Sí, inicio |
| neutrófilos | 22.200 | 22.100 | 666 | 22.200000 | Neutrófilo y etiqueta visibles, comienza su migración; macrófago aún oculto. | Sí, inicio |
| macrófago | 26.560 | 26.460 | 797 | 26.566667 | Macrófago y etiqueta visibles junto a los residuos que continúan limpiándose. | Sí, inicio |
| fibroblastos | 32.320 | 32.220 | 970 | 32.333333 | Fibroblasto y etiqueta visibles; todavía no se adelantan queratinocitos ni capilar. | Sí, inicio |
| capilar nuevo | 35.500 | 35.400 | 1065 | 35.500000 | Etiqueta Capilar nuevo y primer tramo del brote visibles; el vaso termina de crecer después. | Sí, inicio |
| queratinocitos | 36.860 | 36.760 | 1106 | 36.866667 | Queratinocitos y etiqueta visibles; comienza el avance hacia los bordes. | Sí, inicio |
| costra se desprende | 45.520 | 45.420 | 1366 | 45.533333 | La costra inicia su desprendimiento en el antebrazo y la ventana inferior. La frase del audio es costra se desprende. | Sí, inicio |
| Piel recuperada | 50.400 | 50.300 | 1512 | 50.400000 | Check grande, brillo y Piel recuperada visibles junto al subtítulo Piel. | Sí, inicio |

Las capturas usan el primer fotograma disponible en o después de cada palabra. No afirman que una acción de varios segundos ya esté completada en la primera sílaba. La máxima diferencia entre palabra y captura en estas diez pruebas es 0.013333 s.

Resultado: sync, validate y typecheck sin errores; QA técnico del borrador aprobado; comprobador de 111 palabras/26 eventos aprobado; escenas contiguas; tiempos originales conservados tras las tres correcciones. La captura de control del preview anterior a doce segundos coincide byte por byte, según visual-regression.json.

Whisper proporciona alineación automática real del MP3; queda pendiente la revisión fonética fina por escucha humana y la revisión clínica de facts.json. No se han aprobado fuentes médicas ni hecho un render final, merge o cambios en otros proyectos. El MP3 original permanece local y excluido de Git. Las diez capturas y los informes sí se incluyen en la rama.
