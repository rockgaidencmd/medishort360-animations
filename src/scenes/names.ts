/**
 * Lista de componentes de escena válidos para scenes.json.
 * Para añadir uno: 1) agrega el nombre aquí, 2) regístralo en registry.ts.
 */
export const SCENE_COMPONENT_NAMES = ['Clip', 'ShockMicrocirculation', 'Outro', 'ChildFall', 'WoundHealing'] as const;
export type SceneComponentName = (typeof SCENE_COMPONENT_NAMES)[number];

