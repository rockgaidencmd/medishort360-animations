# Mano y perfusión distal — segunda prueba

Comando: `npm run render:hand`. Composición: `HandPerfusion3DProof`.

8,4 segundos en 1080 × 1920 a 30 FPS; audio original desde 23,04 s. Las frases y las acciones están declaradas en `projects/vasopresores/hand-proof.json`. La temporización es inicial por frase; no es una alineación certificada por palabra.

La mano es geometría articulada de WebXR Input Profiles, importada del paquete oficial @webxr-input-profiles/assets 1.0.20. El GLB original no se modifica. La licencia MIT y la procedencia se conservan en `public/models/`. Es una superficie visual de baja resolución, no un atlas clínico; no incorpora músculos, nervios, vasos ni huesos anatómicos internos validados.

El código añade materiales, uñas esquemáticas, un antebrazo construido a partir del contorno proximal, movimiento articular mínimo, coloración distal y un patrón reticular. La ampliación SVG anima eritrocitos y símbolos de oxígeno con movimiento continuo. El indicador de temperatura no inventa valores numéricos. La cama y las barandas son geometría 3D.

La carga asíncrona del modelo mantiene el render en espera y solicita un fotograma de WebGL después de cargarlo, evitando capturar una escena sin la mano. Toda animación depende del fotograma de Remotion.

También se extrajeron `VesselWall3D` y `createErythrocyteGeometry` de la primera prueba para reutilizar su anatomía sin copiar composiciones enteras.

Limitaciones: superficie y uñas simplificadas; unión proximal procedimental; fondo de cama en primer plano, no escena completa de UCI; microcirculación y coloraciones ilustrativas, no simulación clínica. El moteado no debe atribuirse exclusivamente al medicamento. La causa de shock se explica en otro tramo del audio original. Este clip no sustituye esa explicación.
