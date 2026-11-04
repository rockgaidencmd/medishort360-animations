# Audio frente al guion de referencia

Duración de FFprobe: 54.752625 s. Whisper: 54.753 s (redondeo a milisegundos). Modelo small, lenguaje es, tiempos por palabra obtenidos del MP3. La referencia no se usó para fabricar tiempos.

Diferencias reconocidas, aparte de puntuación y espacios de marca:
- Dice «Acerquémonos para observar juntos cómo comienza a repararse», en lugar de «Veamos cómo se repara».
- Dice «Los neutrófilos avanzan y limpian», en lugar de «Los neutrófilos limpian».
- Dice «Después, el macrófago continúa la limpieza, mientras la costra se oscurece», en lugar de «Luego llega el macrófago y la costra se oscurece».
- Dice «Brota también un capilar nuevo», añadiendo «también».
- Dice «disminuyen los capilares», con orden distinto a «los capilares disminuyen».
- Dice «la costra se desprende», en lugar de «la costra cae».
- Añade «Debajo, la piel nueva recupera su aspecto» antes de «Piel recuperada».
- Whisper separa la marca como «MediShort 360»; se mantienen ambas palabras y sus tiempos para los subtítulos.

Correcciones ortográficas de ASR sin modificar ningún start/end: Hemostacia → Hemostasia (11.98–12.70 s), keratinocitos → queratinocitos (36.86–37.64 s), alinia → alinea (43.06–43.52 s). El original se conserva en transcript.whisper-original.json y el registro en transcript-corrections.json.

Las palabras adicionales describen movimientos, limpieza y recuperación ya dibujados. No requieren añadir una acción clínica nueva: se ajustarán los tiempos de las acciones existentes. El evento solicitado «costra cae» se anclará a la frase realmente reconocida «costra se desprende». No se reemplaza el audio por el texto de referencia.
