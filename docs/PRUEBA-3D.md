# Prueba de integración 3D

Composición: Arteriole3DProof. Comando: npm run render:3d.

Duración: 8,4 segundos, 1080 × 1920, 30 FPS. Fragmento del audio original desde 14,28 s.

Three.js y React Three Fiber generan paredes vasculares, eritrocitos bicóncavos y contexto tisular con geometría. @remotion/three sincroniza el render con Remotion. No usa imágenes rasterizadas ni modelos de atlas para esta escena. La contracción modifica el radio de las capas; las células mantienen tamaño y movimiento, con posición continua cuando cambia la velocidad.

Es una representación esquemática para validar la integración y el movimiento, no una simulación hemodinámica validada ni una arteriola obtenida de datos anatómicos. La apertura longitudinal es un recurso didáctico. El grosor de pared y la relación flujo/radio no están calibrados fisiológicamente. Los elementos del fondo son contexto abstracto, no histología validada. No demuestra todavía calidad final de personaje, mano o entorno de UCI.

Render de servidor mediante WebGL por software (--gl=swangle), sin requerir GPU física. El audio permanece excluido de Git; hay que subirlo al Codespace para reproducir el render. Esta prueba se revisa antes de decidir la siguiente integración.
