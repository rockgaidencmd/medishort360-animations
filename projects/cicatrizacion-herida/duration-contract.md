# Duración y control temporal por audio

FFprobe: 54.752625 s. transcript.durationSec: 54.753 s, redondeo del transcriptor a milisegundos. La pista original no se estira ni se corta.

La composición registrada por projectCompositions usa ceil(durationSec × fps). A 30 fps son 1643 fotogramas: 54.766667 s de imagen. Esta cuantización supone 0.014042 s de diferencia respecto al MP3, menos de un fotograma. Las escenas JSON terminan exactamente en 54.753 s. No se promete una igualdad subfotograma físicamente imposible a 30 fps.

Los inicios de fase proceden de las palabras reconocidas (adelanto uniforme de 0.1 s permitido por la solicitud). El healing interpola los intervalos del JSON entre esos inicios, hasta Piel recuperada. No usa cuatro tramos fijos de ocho segundos en este proyecto. Cada célula/etiqueta tiene su propia puerta temporal y progreso; los otros previews conservan sus valores y coreografías por defecto.

El movimiento ambiental y la respiración usan el tiempo continuo del audio incluso después de completar un recorrido. No se reemplaza una fase larga por un cuadro fijo.
