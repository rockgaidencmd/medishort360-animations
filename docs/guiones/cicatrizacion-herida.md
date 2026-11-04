# Guion de narración: caída de un niño y cicatrización de una herida

## Animación revisada

Rama feat/anatomia-herida. Preview-MasterHealing está registrada en src/Root.tsx con 1350 fotogramas, 30 fps, 1080 × 1920: duración real de 45 segundos. Se revisaron src/compositions/MasterHealing.tsx, src/anatomy/MacroHealing.tsx, src/anatomy/ChildRig.tsx, src/motion/shots.ts, src/anatomy/data/healing-phases.json y src/scenes/WoundHealing.tsx. El modo split de WoundHealing usa MasterHealingView; las vistas previas antiguas no fijan el tiempo de este guion.

Los valores por defecto son: tropiezo a 2 s, impacto a 3,2 s, transición a 6 s, pantalla dividida completa a 7,5 s, zoom superior de 1× a 2,5× entre 6 y 10 s, microscopio a 8×, hemostasia 10–18 s, inflamación 18–26 s, proliferación 26–34 s, remodelación 34–42 s y cierre 42–45 s. El fundido del cierre queda completo a 43 s. La vista microscópica de hemostasia ya está presente durante la apertura 6–10 s, pero su coreografía empieza a avanzar a 10 s.

## Texto limpio para ElevenLabs

Copiar solo el siguiente párrafo; la tabla y las notas no se narran.

¡Hola, hijos de Florence Nightingale! Un niño tropieza, cae y se lastima el antebrazo. La herida sangra. Acerquémonos para observar juntos cómo comienza a repararse. Hemostasia. Las plaquetas se adhieren al corte. La fibrina forma una malla que atrapa glóbulos rojos y refuerza el coágulo. Inflamación. Los neutrófilos avanzan y limpian bacterias y residuos. Después, el macrófago continúa la limpieza, mientras la costra se oscurece. Proliferación. Los fibroblastos depositan colágeno. Brota también un capilar nuevo. Los queratinocitos avanzan bajo la costra y cierran la herida. Remodelación. El colágeno se alinea, disminuyen los capilares y la costra se desprende. Debajo, la piel nueva recupera su aspecto. Piel recuperada. Síguenos en MediShort360.

## Sincronización propuesta

| Segundos | Qué se ve | Narración | Palabras | Base a 2,5 palabras/s |
|---|---|---|---:|---:|
| 0–6 | El niño camina, tropieza a los dos segundos y cae hacia el segundo tres coma dos. | ¡Hola, hijos de Florence Nightingale! Un niño tropieza, cae y se lastima el antebrazo. | 14 | 5.6 s |
| 6–10 | Zoom al antebrazo con gotas e hilo de sangre. Pantalla dividida visible hacia siete coma cinco segundos. | La herida sangra. Acerquémonos para observar juntos cómo comienza a repararse. | 11 | 4.4 s |
| 10–18 | Plaquetas se adhieren; crece la malla de fibrina y retiene glóbulos rojos; el sangrado disminuye. | Hemostasia. Las plaquetas se adhieren al corte. La fibrina forma una malla que atrapa glóbulos rojos y refuerza el coágulo. | 20 | 8.0 s |
| 18–26 | Neutrófilo migra de dieciocho a veintiuno; macrófago avanza de veinte a veintitrés; residuos desaparecen; costra oscura. | Inflamación. Los neutrófilos avanzan y limpian bacterias y residuos. Después, el macrófago continúa la limpieza, mientras la costra se oscurece. | 20 | 8.0 s |
| 26–34 | Fibroblasto avanza, se dibuja colágeno y brota un capilar; queratinocitos cierran desde el segundo veintiocho al treinta y tres. | Proliferación. Los fibroblastos depositan colágeno. Brota también un capilar nuevo. Los queratinocitos avanzan bajo la costra y cierran la herida. | 20 | 8.0 s |
| 34–42 | Colágeno se alinea hasta cuarenta; capilar se retira; la costra inferior cae entre treinta y cuatro y treinta y ocho y la superior desaparece hacia treinta y nueve coma seis. | Remodelación. El colágeno se alinea, disminuyen los capilares y la costra se desprende. Debajo, la piel nueva recupera su aspecto. | 20 | 8.0 s |
| 42–45 | Fundido al check grande y Piel recuperada; fondo de cierre completo desde cuarenta y tres. | Piel recuperada. Síguenos en MediShort360. | 5 | 2.0 s |

Total: 110 palabras, contadas por separación entre espacios; MediShort360 cuenta como una palabra escrita. Tiempo matemático: 44.0 s. Objetivo de interpretación: aproximadamente 45 s; estimación con pausas breves y términos técnicos: 45–49 s, pendiente de medir el audio real. No se generó ni cronometró voz de ElevenLabs. La marca puede convertirse en varias palabras habladas; por eso no se garantiza sincronía exacta a partir del conteo escrito.

Los tramos de ocho segundos contienen veinte palabras cada uno. La introducción suma veinticinco palabras en diez segundos, repartidas en catorce y once; el segundo tramo necesita un ritmo algo más ágil. Reservar los tres segundos finales para Piel recuperada y la llamada a seguir la cuenta. Pronunciar la marca con naturalidad, sin una pausa larga en medio. No alargar los puntos como silencios extensos.

## Palabras clave y eventos

Los instantes de voz son objetivos de montaje calculados desde el orden de palabras, no marcas medidas de una grabación.

- «Sangra» hacia 7 s: gotas e hilo sobre el antebrazo; visible desde la transición de 6 s.
- «Hemostasia» a 10 s: tarjeta de fase; «plaquetas» hacia 10,8 s: se acercan al corte, se adhieren hasta 11,6 s.
- «Fibrina» hacia 13,2 s: malla que se dibuja entre 11,2 y 14,2 s; «glóbulos rojos» hacia 15,2 s: ya están retenidos.
- «Coágulo» hacia 17,6 s: tapón reforzado por la malla y descenso del sangrado.
- «Inflamación» a 18 s; «neutrófilos» hacia 18,8 s: migran entre 18 y 21 s y desaparecen los primeros residuos.
- «Macrófago» hacia 22,4 s: migra entre 20 y 23 s y continúa la limpieza de los residuos restantes.
- «Proliferación» a 26 s; «fibroblastos» hacia 26,8 s: avanzan; «colágeno» hacia 27,6 s: fibras que empiezan a dibujarse a 27 s.
- «Capilar nuevo» hacia 29,2–29,6 s: el brote crece entre 26,5 y 31,5 s.
- «Queratinocitos» hacia 30,4 s: se deslizan entre 28 y 33 s hacia el cierre.
- «Remodelación» a 34 s; «colágeno» hacia 34,8 s: fibras que se alinean hasta 40 s; «capilares» hacia 36,8 s: el capilar se retira.
- «Costra se desprende» hacia 38–39,2 s: la inferior ya termina de desaparecer hacia 38 s; la superior aún se despega y desaparece hacia 39,6 s. Esta frase se refiere al antebrazo superior.
- «Piel recuperada» a 42 s: fundido al check grande y título final; «Síguenos en MediShort360» durante 43–45 s.

## Pronunciación

Conservar la escritura médica correcta en el texto limpio. Escuchar especialmente: neutrófilos (neu-TRÓ-fi-los), macrófago (ma-CRÓ-fa-go), fibroblastos (fi-bro-BLAS-tos), queratinocitos (que-ra-ti-no-CI-tos), hemostasia, proliferación y colágeno. Florence Nightingale es un nombre inglés que puede requerir revisión de pronunciación; no se sustituye porque el saludo exacto fue solicitado. MediShort360 conserva su grafía por la misma razón; es la única cifra del texto limpio y corresponde a la marca exigida en el cierre.

## Datos a confirmar con una fuente

Todas las fases de healing-phases.json tienen fuentes: null y revisar: true. Este guion reproduce ese material y los eventos dibujados; no certifica su exactitud clínica. No se consultaron ni añadieron hechos externos.

- [REVISAR] Rangos del JSON: hemostasia, minutos a horas; inflamación, uno a cuatro días; proliferación, cuatro días a tres semanas; remodelación, semanas a meses. No se narran estos rangos para no añadir densidad ni presentar tiempos sin fuente como universales.
- [REVISAR] El contador termina en Día 21+ y la animación llega a piel recuperada: confirmar que el conjunto no se interprete como una fecha universal de recuperación ni como fin de la remodelación.
- [REVISAR] Correspondencia y terminología de las funciones narradas: adhesión plaquetaria, fibrina y coágulo; limpieza por neutrófilos y macrófagos; depósito de colágeno por fibroblastos; brote capilar; migración de queratinocitos y desprendimiento de costra. Todo procede del JSON y de la animación, pero sigue pendiente de revisión clínica.
- [REVISAR] Validar con fuente la simplificación de las fases mostradas consecutivamente. El texto no afirma que sean etapas clínicas estrictamente separadas.
- No se introdujeron datos nuevos marcados [REVISAR] dentro del texto a leer; estas marcas son notas editoriales externas.

## Si la voz supera el tiempo

La estimación no supera cincuenta segundos: no se ha eliminado ninguna frase por ese motivo. Si la toma real excede cincuenta segundos, propondría, sin aplicar el recorte automáticamente: quitar «juntos» (una palabra), quitar «también» (una), y sustituir «Debajo, la piel nueva recupera su aspecto» por «La piel recupera su aspecto» (dos palabras menos). Ahorro propuesto total: cuatro palabras, aproximadamente 1,6 segundos a 2,5 palabras/s. No recortar los nombres de células, los títulos de fase, el saludo ni el cierre. Para sincronizar con un clip fijo de 45 s también debe medirse cada tramo: una toma de 49 s no encaja automáticamente solo por estar bajo el máximo de 50 s. Si falta tiempo, ajustar el ritmo de locución antes de considerar un recorte que debe aprobar el usuario.

## Alcance de esta entrega

Solo se escribió el guion y se contó su texto. La animación no fue modificada, no se generó voz, no se renderizó otro video y no se hizo merge. No se ejecutaron pruebas de código porque solo se añadió este documento.
