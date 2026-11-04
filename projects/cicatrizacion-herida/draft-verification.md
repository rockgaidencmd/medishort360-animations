# Borrador con narración original

Se ejecutó npm run render:draft -- cicatrizacion-herida con REMOTION_ENTRY=src/index.tsx. Borrador a 540 × 960, 30 fps; no es un render final.

El render de Remotion se completó. Su QA automático inicial detectó exactamente:

```
✖ pixel format yuv420p (compatibilidad Android/iOS): pix_fmt: yuvj420p
QA técnico: 1 fallo(s)
```

Se corrigió únicamente el rango de color del MP4 mediante scripts/normalize-cicatrizacion-draft.mjs, conservando el render original con su hash en el nombre. No se alteraron los dibujos, la velocidad de voz ni el audio original en public/. La pista AAC del borrador se copió sin recodificar y se limitó el padding al tiempo objetivo del transcript. La normalización es solo para este borrador, sin modificar el formato de otros proyectos.

Después se ejecutó npm run qa -- cicatrizacion-herida --draft: APROBADO. Video H.264 yuv420p, audio AAC, resolución/fps correctos, duración dentro de un fotograma del MP3 original, sin cuadros negros ni congelación de más de un segundo. Medición exacta en draft-media-info.json; comprobaciones detalladas en qa-report.json.

La medida del contenedor MP4 y de su pista de video es 54.766667 s. El MP3 mide 54.752625 s: diferencia de 0.014042 s, debida a cuantización de fotogramas. No se afirma igualdad subfotograma.

El comprobador de sincronía verifica 111 palabras, 26 eventos, conservación de todos los tiempos tras las correcciones ortográficas, escenas contiguas y healing monotónico por fases reales. Los eventos se adelantan 0.1 s respecto a Whisper; el mayor adelanto efectivo al cuantizar escenas/fotogramas es 0.106667 s, menor que 0.15 s. Whisper no equivale a una revisión fonética humana.

Las fuentes y revisiones clínicas siguen null, según la solicitud. Las advertencias de dos rutas antiguas de recursos ausentes no se usan en este proyecto SVG y no se borraron ni sustituyeron los registros de otros proyectos.

Actualización: render-options.json activa la normalización automáticamente solo para cicatrizacion-herida. La ejecución final de npm run render:draft -- cicatrizacion-herida terminó con código cero y QA aprobado, sin configurar REMOTION_ENTRY. El check final incorpora el brillo pulsante al inicio de Piel recuperada; solo se actualizó esa captura, porque el cambio queda limitado al cierre con eventTimes.
