# MEDISHORT360 — Motor de animación médica 2.5D

Motor de composición con Remotion, React, TypeScript, SVG y FFmpeg. La prueba de vasopresores dura 9 segundos y usa el tramo real del MP3 original (8,34–17,34 s): norepinefrina, vasoconstricción y estrechamiento arteriolar. Combina ilustraciones anatómicas originales, capas transparentes, movimiento de cámara y glóbulos rojos animados.

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
# Video completo
npm run render:full
```

Las salidas quedan en `output/vasopresores-prueba-v4.mp4` y `output/vasopresores-completo.mp4`, en vertical 1080 × 1920, 30 FPS, H.264 con audio AAC. El repositorio no incluye el MP3: al ser público, añadirlo aquí lo haría público también.

## Render en la nube desde Android con Codespaces

1. Abre esta rama en GitHub y elige **Code → Codespaces → Create codespace**.
2. En el explorador de archivos de VS Code web, crea `public/audio/` y sube allí `vasopresores-original.mp3` desde el teléfono. El MP3 está excluido de Git.
3. Abre la terminal y ejecuta `npm run render:proof`.
4. Descarga `output/vasopresores-prueba-v4.mp4` desde el explorador de archivos de Codespaces.

El contenedor instala Node y FFmpeg automáticamente. El audio permanece en el Codespace y no se publica en este repositorio.

## GitHub Actions

El workflow manual también puede generar un artefacto, pero solo si el MP3 está en el commit renderizado. Como el repositorio es público, usa Codespaces para trabajar con el audio sin publicarlo.

## Estructura y expansión

- `src/components/MedicalProof.tsx`: composición Remotion, movimiento de cámara, audio sincronizado y estados visuales.
- `src/anatomy/`: elementos anatómicos SVG reutilizables.
- `public/anatomy/`: recursos anatómicos originales de mano, microcirculación y arteriolas.
- `public/backgrounds/`: fondos ilustrados para contextualizar las escenas.
- `src/data/vasopresores-audio-map.json`: transcripción inicial y marcas temporales.
- `public/audio/`: audio local de cada producción.
- `output/`: renders locales, fuera de Git.

Para otro tema, crea una composición Remotion independiente y reutiliza componentes de cámara, capas, tipografía y anatomía. Ajusta acciones y textos con transcripción temporizada; no reutilices la misma escena para conceptos distintos.

## Estado

La prueba visual y el video completo son composiciones separadas. Revisa el MP4 completo antes de publicarlo.


## Flujo de proyectos por escenas

Se añadió un flujo para preparar videos desde `projects/<id>/` con `manifest.json`, `transcript.json`, `scenes.json` y `facts.json`. La composición queda registrada en `src/index.tsx`; sus herramientas están en `src/pipeline/`, `src/motion/` y `scripts/`.

```bash
npm run sync
npm run validate -- vasopresores
npm run render:draft -- vasopresores
```

El audio original y los MP4 de trabajo se guardan localmente en `public/audio/` y `public/renders/`, que están excluidos de Git. Por eso, el proyecto JSON de vasopresores se registra ahora, pero no se puede renderizar hasta copiar esos medios al entorno de Codespaces o a la carpeta local. El render final también requiere completar la revisión clínica y las licencias indicadas en `facts.json` y `public/models/assets.json`.
