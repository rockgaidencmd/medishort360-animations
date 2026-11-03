export type SceneProps = {
  /** Segundos desde el inicio nominal de la escena (negativo durante el fundido de entrada). */
  t: number;
  /** Duración total de la capa en segundos (incluye el fundido de entrada). */
  durationSec: number;
  /** scenes.json -> props */
  props: Record<string, unknown>;
};
