# MEDISHORT360 — Motor de animación médica 2.5D

Base inicial con Remotion, React, TypeScript, SVG y FFmpeg. La prueba de vasopresores dura 9 segundos y usa un tramo real del MP3 original (8,34–17,34 s): norepinefrina, vasoconstricción y estrechamiento arteriolar.

## Requisitos

- Node.js 20+
- npm
- FFmpeg

## Ejecutar en local

```bash
npm install
mkdir -p public/audio
# Copia el audio original como public/audio/vasopresores-original.mp3
npm run start
npm run render:proof
```

La salida local es `output/vasopresores-prueba.mp4`, en vertical 1080 × 1920, 30 FPS, H.264 con audio AAC. El repositorio no incluye el MP3: al ser público, añadirlo aquí lo haría público también.

## Render desde el teléfono con GitHub Actions

1. Sube `vasopresores-original.mp3` a `public/audio/` en una rama del repositorio.
2. Abre **Actions → Render vasopresores proof → Run workflow**.
3. Descarga el artefacto `medishort360-vasopresores-prueba` desde la ejecución.

GitHub Actions requiere que el archivo esté presente en el commit que se renderiza. No se sube audio automáticamente ni se activa ningún servicio de pago.

## Estructura y expansión

- `src/components/MedicalProof.tsx`: escena 2.5D ilustrada y animada con SVG.
- `src/data/vasopresores-audio-map.json`: transcripción inicial y marcas temporales.
- `public/audio/`: audio local de cada producción.
- `output/`: renders locales, fuera de Git.

Para otro tema, crea una composición Remotion independiente y reutiliza componentes de cámara, capas, tipografía y anatomía. Ajusta acciones y textos con transcripción temporizada; no reutilices la misma escena para conceptos distintos.

## Estado

Esta rama contiene la prueba visual solicitada. El video completo queda pendiente de la revisión de esta prueba.
