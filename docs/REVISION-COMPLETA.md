# Versión completa para revisión

`npm run render:review` prepara los clips 3D y compone el audio original completo a 720 × 1280, 30 FPS. `npm run render:review -- --final` calcula esos mismos componentes en 1080 × 1920. El nombre de la composición no implica aprobación editorial o clínica de todas las escenas.

La composición `Vasopresores3DReview` utiliza clips de animación renderizados como caché, con una única pista del audio original continuo. Los archivos intermedios en public/renders están excluidos de Git. No son imágenes estáticas. Remotion realiza la composición final y la codificación H.264/AAC.

Recorrido: apertura UCI; infusión y acercamiento 3D hacia mano; fundido al vaso; perfusión distal y coloración; contexto de shock con esquema de flujo heterogéneo; valoración con presión de un dedo enguantado sobre la uña; cierre. La entrada al vaso es todavía un fundido de escenas y necesita un corte anatómico más elaborado. El moteado se intensificó en manos y pies; su patrón es ilustrativo.

Limitaciones que deben revisarse: la escena de enfermería representa un detalle de presión sobre la uña, no una exploración completa de temperatura y pulsos ni un personaje de enfermera completo. La temporización es por frases y está aproximada; falta alineación por palabra. El brazo del operador es esquemático. Los modelos y los parámetros de flujo no son simulaciones fisiológicas validadas. No publicar como versión final sin revisar imagen y narración juntas.
