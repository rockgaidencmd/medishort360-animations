# MEDISHORT360 — Arquitectura de producción
Estado: decisión técnica inicial. No equivale a un motor automático terminado.

## Objetivo
Un único repositorio, rockgaidencmd/medishort360-animations, contiene el motor reutilizable y los proyectos de video. El audio original define la duración y las acciones visuales. Primero se valida una muestra MP4; después se produce el video completo.

## Herramientas elegidas y responsabilidad
| Herramienta | Función | Estado |
|---|---|---|
| Node.js + TypeScript | Ejecutar y coordinar las etapas | Disponible; coordinador pendiente |
| Whisper local en el servidor | Transcripción y tiempos iniciales | Integración pendiente; alineación debe revisarse |
| Three.js + React Three Fiber | Geometría, materiales, luces, cámara y animación anatómica | Integrado en pruebas de arteriola y mano |
| @remotion/three | Integrar escenas 3D en Remotion | Integrado; render por software comprobado en el servidor actual |
| Remotion + React | Composición, sincronización, rótulos y render por fotograma | Instalado |
| SVG | Motion graphics, máscaras, indicadores y elementos vectoriales animados | Disponible |
| FFmpeg + ffprobe | Ensamblado, codificación H.264/AAC y controles técnicos | Disponible en el entorno actual |
| GitHub | Código, versiones y revisión de cambios | Configurado |
| GitHub Codespaces | Primer entorno de ejecución en la nube accesible desde Android | Configuración presente; render 3D por validar |

Motion graphics es una disciplina implementada con código, no un programa adicional. Renderizar es una etapa; Render.com no forma parte de esta arquitectura inicial.

## Recursos anatómicos
Los modelos 3D son geometría animable, no fotografías usadas como escenas.
Z-Anatomy/BodyParts3D son candidatos de biblioteca, no dependencias ya integradas. Se seleccionarán únicamente estructuras necesarias, con fuente, licencia y atribución por archivo. Los componentes con restricciones no comerciales no se incorporarán al material comercial sin permiso.
Un atlas no proporciona automáticamente rigging, animaciones fisiológicas, capilares ni todos los detalles de tejidos. Arteriolas, eritrocitos y microcirculación requieren componentes propios revisados.
Ninguna biblioteca garantiza anatomía perfecta.

## Flujo y salidas
1. Entrada: audio original de ElevenLabs; se conserva sin regenerar voz.
2. Análisis: transcript.json con frases, tiempos, duración y confianza.
3. Dirección: scenes.json vincula cada frase con estructuras, acción visible, cámara, entorno y recursos.
4. Preparación: recursos anatómicos optimizados y registro de procedencia; revisión de anatomía y licencias.
5. Animación: escenas con objetos articulados o deformables, flujo y movimiento interno; cámara y motion graphics complementan la acción.
6. Composición: Remotion sincroniza escenas con el audio original y la marca.
7. Render: muestra o segmentos según límites de frase; ensamblado final con audio continuo.
8. Revisión: reproducción, sincronía, anatomía, coloración distal, ausencia de cuadros negros, formato y descarga desde Android.

Los rótulos, un zoom o un fundido por sí solos no cumplen el criterio de escena anatómica animada. Todo movimiento debe depender del fotograma para que el render sea reproducible.

## Organización objetivo
Se migrará de forma gradual, conservando composiciones actuales como prototipos:
- projects/vasopresores/: manifiesto, transcripción y mapa de escenas.
- src/pipeline/: coordinación de etapas y validación de entradas.
- src/anatomy/: geometrías, materiales, rigs y deformaciones reutilizables.
- src/scenes/: escenas médicas y entornos.
- src/motion/: cámaras, transiciones y motion graphics.
- src/compositions/: montaje Remotion.
- public/models/: modelos aprobados y optimizados.
- public/audio/: audio de trabajo excluido de Git.
- docs/: arquitectura y registros de recursos.
- scripts/: transcripción, render, ensamblado y control.
- output/: MP4 y reportes fuera de Git.

No hace falta un repositorio por herramienta. Las herramientas se instalan como dependencias; las carpetas contienen nuestros módulos.

## Criterio para incorporar una dependencia
Debe resolver una necesidad concreta, tener licencia compatible, renderizar de forma determinista y funcionar en el servidor elegido. Primero se prueba una escena corta. No se considera integrada por haber creado una carpeta o documentado su nombre.

## Validación inicial y siguiente revisión
La prueba de arteriola deformable y eritrocitos bicóncavos se renderizó con el audio existente y fue aprobada como base técnica. La siguiente prueba incorpora una mano articulada de WebXR Input Profiles (MIT), cambio distal y ampliación de microcirculación. La calidad anatómica y visual de esta escena sigue sujeta a revisión; el personaje/paciente todavía no está integrado.
La v4 queda como prototipo de composición; no demuestra todavía el funcionamiento de esta arquitectura.

## Alcance actual y límites
No existe aún una interfaz para subir audio desde Android ni una cadena automática audio→escenas médicas completas. La generación de escenas requiere dirección y revisión humana. El render 3D puede aumentar tiempo y memoria; se validará con modelos optimizados antes de adoptar un servicio de alojamiento adicional.
No se contratarán servicios ni se generará otra narración sin autorización.

## Fuentes técnicas
- https://github.com/remotion-dev/template-three
- https://github.com/remotion-dev/remotion/tree/main/packages/three
- https://github.com/Z-Anatomy/Models-of-human-anatomy

