/**
 * Procedural Web Audio API Sound Effects
 * Generates synthetic sounds without external audio files
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Play bubble pop sound (when adding liquid drops in virtual lab)
   */
  playBubbleSound() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  /**
   * Play success chime
   */
  playSuccessSound() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.26);
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  /**
   * Play gentle wrong tone
   */
  playErrorSound() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.2);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  /**
   * Victory Fanfare
   */
  playFanfareSound() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const sequence = [
        { f: 523.25, d: 0.12 }, // C
        { f: 659.25, d: 0.12 }, // E
        { f: 783.99, d: 0.12 }, // G
        { f: 1046.50, d: 0.35 } // C high
      ];
      let t = ctx.currentTime;
      sequence.forEach((item) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, t);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + item.d + 0.05);
        t += item.d * 0.8;
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  /**
   * Button click tick
   */
  playClickSound() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }
}

export const soundEffects = new SoundEffectsManager();
