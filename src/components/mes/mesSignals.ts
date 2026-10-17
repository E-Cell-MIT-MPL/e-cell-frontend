// Window events the MES page components use to talk to each other
// without sharing state (keeps each section self-contained).

import type { MesTrack } from "./mesSynth";

/** Dispatch on window to trigger the easter egg from anywhere on the page. */
export const MES_EGG_EVENT = "mes:easter-egg";

/** Fired on window whenever the soundtrack starts, stops or changes track. */
export const MES_MUSIC_EVENT = "mes:music";

export interface MesMusicDetail {
  playing: boolean;
  track: MesTrack;
}
