// Original music for the MES page, generated live with the Web Audio API
// (no audio files, nothing to license). Two tracks:
//
// - "ambient": the landing soundtrack. Fmaj7 – Am7 – Cmaj7 – G6 at 78 bpm,
//   soft pads, a sparse bell arpeggio with echo and a sub bass. No drums.
// - "party":   the easter-egg track. Am – F – C – G at 118 bpm, plucked
//   arpeggio, bass, kick, clap and hats, after a two-bar intro.
//
// Switching tracks crossfades through silence.

export type MesTrack = "ambient" | "party";

export const MES_BPM: Record<MesTrack, number> = { ambient: 78, party: 118 };
const LEVEL: Record<MesTrack, number> = { ambient: 0.32, party: 0.55 };

const PARTY_CHORDS = [
  [57, 60, 64], // Am
  [53, 57, 60], // F
  [48, 52, 55], // C
  [55, 59, 62], // G
];
const PARTY_ARP = [0, 1, 2, 3, 2, 1, 0, 2, 1, 2, 3, 4, 3, 2, 1, 2];
const PARTY_BASS = new Set([0, 3, 6, 8, 11, 14]);

const AMBIENT_CHORDS = [
  [53, 57, 60, 64], // Fmaj7
  [57, 60, 64, 67], // Am7
  [48, 52, 55, 59], // Cmaj7
  [55, 59, 62, 64], // G6
];
// Bell notes on eighth notes (index into the chord, -1 = rest), one bar.
const AMBIENT_BELLS = [0, -1, 2, 3, -1, 1, -1, 2];

const freq = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

export class MesSynth {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private echo!: GainNode;
  private noise!: AudioBuffer;
  private timer: number | undefined;
  private switchTimer: number | undefined;
  private step = 0;
  private nextTime = 0;
  track: MesTrack = "ambient";
  playing = false;

  private setup() {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AC();
    this.ctx = ctx;

    const comp = ctx.createDynamicsCompressor();
    comp.connect(ctx.destination);
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(comp);

    // Echo bus (filtered feedback delay).
    const delay = ctx.createDelay(2);
    delay.delayTime.value = 0.38;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.35;
    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 2200;
    this.echo = ctx.createGain();
    this.echo.gain.value = 0.35;
    this.echo.connect(delay);
    delay.connect(tone);
    tone.connect(feedback);
    feedback.connect(delay);
    tone.connect(this.master);
    this.delay = delay;

    this.noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = this.noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }

  private delay!: DelayNode;

  /** Start (or resume) playing the given track. Must follow a user gesture. */
  play(track: MesTrack = this.track) {
    if (!this.ctx) this.setup();
    const ctx = this.ctx!;
    void ctx.resume();

    if (this.playing && track === this.track) return;
    window.clearTimeout(this.switchTimer);

    const begin = () => {
      window.clearInterval(this.timer);
      this.track = track;
      this.delay.delayTime.value = (60 / MES_BPM[track]) * 0.75;
      const now = ctx.currentTime;
      this.ramp(LEVEL[track], track === "ambient" ? 2.5 : 1);
      this.step = 0;
      this.nextTime = now + 0.06;
      this.timer = window.setInterval(() => this.schedule(), 25);
    };

    if (this.playing) {
      // Crossfade: fade out the current track, then start the new one.
      this.ramp(0, 0.4);
      this.switchTimer = window.setTimeout(begin, 450);
    } else {
      begin();
    }
    this.playing = true;
  }

  stop() {
    if (!this.ctx || !this.playing) return;
    window.clearTimeout(this.switchTimer);
    this.ramp(0, 0.5);
    this.playing = false;
    window.setTimeout(() => {
      if (!this.playing) window.clearInterval(this.timer);
    }, 600);
  }

  dispose() {
    window.clearInterval(this.timer);
    window.clearTimeout(this.switchTimer);
    void this.ctx?.close();
    this.ctx = null;
    this.playing = false;
  }

  private ramp(to: number, seconds: number) {
    const now = this.ctx!.currentTime;
    const g = this.master.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(to, now + seconds);
  }

  private schedule() {
    const ctx = this.ctx!;
    const sixteenth = 60 / MES_BPM[this.track] / 4;
    while (this.nextTime < ctx.currentTime + 0.12) {
      if (this.track === "party") {
        this.partyStep(this.step, this.nextTime);
        // Loop 8 bars, keeping the intro only for the first pass.
        this.step = this.step + 1 >= 160 ? 32 : this.step + 1;
      } else {
        this.ambientStep(this.step, this.nextTime);
        this.step = (this.step + 1) % 64;
      }
      this.nextTime += sixteenth;
    }
  }

  // ---------- Tracks ----------

  private ambientStep(step: number, t: number) {
    const s = step % 16;
    const chord = AMBIENT_CHORDS[Math.floor(step / 16) % 4];
    if (s === 0) {
      this.pad(chord, t, "triangle", 0.045, 2200);
      this.sub(chord[0] - 12, t);
    }
    if (s % 2 === 0) {
      const n = AMBIENT_BELLS[s / 2];
      if (n >= 0) this.bell(chord[n] + 12, t, s === 0 ? 0.05 : 0.032);
    }
  }

  private partyStep(step: number, t: number) {
    const s = step % 16;
    const chord = PARTY_CHORDS[Math.floor(step / 16) % 4];
    const drums = step >= 32;

    if (s === 0) this.pad(chord, t, "sawtooth", 0.05, 1400);
    const n = PARTY_ARP[s];
    const note = chord[n % 3] + 12 * Math.floor(n / 3) + 12;
    this.pluck(note, t, s % 4 === 0 ? 0.07 : 0.045);

    if (!drums) return;
    if (PARTY_BASS.has(s)) this.bass(chord[0] - 24, t);
    if (s % 4 === 0) this.kick(t);
    if (s === 4 || s === 12) this.clap(t);
    if (s % 2 === 1) this.hat(t, s % 4 === 3 ? 0.05 : 0.025);
  }

  // ---------- Instruments ----------

  private env(
    g: GainNode,
    t: number,
    peak: number,
    attack: number,
    decay: number,
  ) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }

  private pad(
    chord: number[],
    t: number,
    type: OscillatorType,
    level: number,
    cutoff: number,
  ) {
    const ctx = this.ctx!;
    const bar = (60 / MES_BPM[this.track]) * 4;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(cutoff * 0.4, t);
    filter.frequency.linearRampToValueAtTime(cutoff, t + bar * 0.6);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(level, t + bar * 0.15);
    g.gain.linearRampToValueAtTime(0.0001, t + bar + 0.3);
    filter.connect(g);
    g.connect(this.master);
    for (const m of chord) {
      for (const detune of [-7, 7]) {
        const o = ctx.createOscillator();
        o.type = type;
        o.frequency.value = freq(m);
        o.detune.value = detune;
        o.connect(filter);
        o.start(t);
        o.stop(t + bar + 0.4);
      }
    }
  }

  private bell(midi: number, t: number, peak: number) {
    const ctx = this.ctx!;
    const g = ctx.createGain();
    this.env(g, t, peak, 0.004, 1.6);
    g.connect(this.master);
    g.connect(this.echo);
    // Sine plus a quiet inharmonic partial for a soft glassy tone.
    for (const [ratio, amp] of [
      [1, 1],
      [2.76, 0.18],
    ] as const) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = freq(midi) * ratio;
      const a = ctx.createGain();
      a.gain.value = amp;
      o.connect(a);
      a.connect(g);
      o.start(t);
      o.stop(t + 1.7);
    }
  }

  private sub(midi: number, t: number) {
    const ctx = this.ctx!;
    const bar = (60 / MES_BPM[this.track]) * 4;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = freq(midi);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.09, t + 0.3);
    g.gain.linearRampToValueAtTime(0.0001, t + bar);
    o.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + bar + 0.1);
  }

  private pluck(midi: number, t: number, peak: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = "square";
    o.frequency.value = freq(midi);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(3200, t);
    filter.frequency.exponentialRampToValueAtTime(500, t + 0.18);
    const g = ctx.createGain();
    this.env(g, t, peak, 0.005, 0.22);
    o.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    g.connect(this.echo);
    o.start(t);
    o.stop(t + 0.3);
  }

  private bass(midi: number, t: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = freq(midi);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 380;
    const g = ctx.createGain();
    this.env(g, t, 0.16, 0.01, 0.2);
    o.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + 0.3);
  }

  private kick(t: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    const g = ctx.createGain();
    this.env(g, t, 0.7, 0.002, 0.3);
    o.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + 0.35);
  }

  private noiseHit(
    t: number,
    type: BiquadFilterType,
    f: number,
    peak: number,
    decay: number,
  ) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = f;
    const g = ctx.createGain();
    this.env(g, t, peak, 0.002, decay);
    src.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    src.start(t);
    src.stop(t + decay + 0.05);
  }

  private clap(t: number) {
    this.noiseHit(t, "bandpass", 1400, 0.22, 0.16);
  }

  private hat(t: number, peak: number) {
    this.noiseHit(t, "highpass", 7500, peak, 0.05);
  }
}
