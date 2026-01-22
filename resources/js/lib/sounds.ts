/**
 * Sound utilities for notifications
 * Uses Web Audio API to generate notification sounds
 */

let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export type SoundType = 'newOrder' | 'statusChange' | 'alert';

const soundConfigs: Record<SoundType, { frequency: number; duration: number; type: OscillatorType; pattern?: number[] }> = {
  newOrder: { frequency: 800, duration: 0.15, type: 'sine', pattern: [1, 0.1, 1, 0.1, 1] },
  statusChange: { frequency: 600, duration: 0.1, type: 'sine', pattern: [1] },
  alert: { frequency: 400, duration: 0.2, type: 'square', pattern: [1, 0.1, 1] },
};

export const playSound = async (type: SoundType): Promise<void> => {
  try {
    const ctx = getAudioContext();
    
    // Resume context if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const config = soundConfigs[type];
    const pattern = config.pattern || [1];
    
    let startTime = ctx.currentTime;
    
    for (const beat of pattern) {
      if (beat === 1) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = config.type;
        oscillator.frequency.setValueAtTime(config.frequency, startTime);
        
        // Fade in/out for smoother sound
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, startTime + config.duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + config.duration);
      }
      startTime += config.duration + 0.05;
    }
  } catch (error) {
    console.warn('Failed to play notification sound:', error);
  }
};

// Initialize audio context on first user interaction
export const initAudio = (): void => {
  try {
    getAudioContext();
  } catch (error) {
    console.warn('Failed to initialize audio context:', error);
  }
};
