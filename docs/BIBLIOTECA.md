# Biblioteca comprobada
Inventario inicial comprobado en el árbol local; no presume recursos de otras ramas.
| Recurso | Ruta | Uso |
|---|---|---|
| Cámara | src/motion/Camera.tsx | Movimientos deterministas |
| Subtítulos | src/motion/Captions.tsx | Palabras con marcas reales |
| Rótulos | src/motion/Overlays.tsx | Marca y etiquetas |
| UCI | src/scenes/ICUEquipment3D.tsx, ICUPatient3D.tsx | Equipo y paciente |
| Eritrocito | src/anatomy/Erythrocyte3D.tsx | Célula 3D disponible |
| Pared vascular | src/anatomy/VesselWall3D.tsx | Adaptar, no asumir cerebral |
| Lupa | src/components/MicroperfusionLens.tsx | Referencia; microcirculación distinta |
| ECV | src/anatomy/ECV.tsx | Brain, CerebralArteries, Clot, Hematoma, VesselSection, TimeClock, ComparisonTable, SignIcons; prototipos |
| Preview ECV | src/scenes/ECVPreview.tsx | Composición de inspección de piezas |
Contador sin cifras, tarjetas y tabla ECV: no había equivalente genérico comprobado; nuevos dentro del módulo ECV. Las capturas de prototipos no certifican calidad final ni validación médica.

## ECV con audio — Fase 2
- `src/anatomy/ECVTissue.tsx`: BrainMap con lupa, TissueZoom con parénquima/neuronas/arteria, trombo local y émbolo alternativo, rotura pulsátil, hematoma deformante, MeningealCut con sangre contenida en el espacio, LargeClock y Tag.
- `src/anatomy/ECVNursing.tsx`: NursingPatient con cara/brazo/habla, pupila reactiva, respiración y vigilancia; ClosingBrain.
- `src/scenes/ECVAudioFilm.tsx`: disparadores extraídos del transcript; ECVRedesign registrado, ECVWordCaptions reutiliza buildChunks. Entrada aislada src/ecv-audio.tsx; composición ECV-Audio también en Studio.
- `scripts/ecv-build.py` y `scripts/ecv-contact.py`: escenas, selección de fotogramas y medidas por cuadro.
