import { useCallback, useRef } from "react";

export const AudioType = {
    XP: 'xp',
    ZOOM_IN: 'zoom_in',
    ZOOM_OUT: 'zoom_out',
    NETFLIX: 'netflix',
    BUTTON_CLICK: 'button_click',
    BACKGROUND: 'background',
} as const;

export type AudioType = typeof AudioType[keyof typeof AudioType];

const AUDIO_SRC: Record<AudioType, string> = {
    [AudioType.XP]: '/sounds/xp.mp3',
    [AudioType.ZOOM_IN]: '/sounds/zoom.mp3',
    [AudioType.ZOOM_OUT]: '/sounds/zoom.mp3',
    [AudioType.NETFLIX]: '/sounds/netflix.mp3',
    [AudioType.BUTTON_CLICK]: '/sounds/button_click.mp3',
    [AudioType.BACKGROUND]: '/sounds/bg.mp3',
};

const useAudioManager = (
    type: AudioType,
    duration: number = 1000,
    options?: { loop?: boolean; volume?: number }
) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const optionsRef = useRef(options);

    // Update options ref when options change
    if (options) {
        optionsRef.current = options;
    }

    const getAudio = useCallback(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(AUDIO_SRC[type]);
            // Set loop and volume only when audio is first created
            if (optionsRef.current?.loop !== undefined) {
                audioRef.current.loop = optionsRef.current.loop;
            }
            if (optionsRef.current?.volume !== undefined) {
                audioRef.current.volume = optionsRef.current.volume;
            }
        }
        return audioRef.current;
    }, [type]);

    const play = useCallback(() => {
        const audio = getAudio();

        // Only reset currentTime if audio is not already playing
        if (audio.paused) {
            audio.currentTime = 0;
        }

        audio.play().catch(err => console.log('Audio play failed:', err));

        if (!optionsRef.current?.loop && duration > 0) {
            timerRef.current = setTimeout(() => {
                audio.pause();
                timerRef.current = null;
            }, duration);
        }
    }, [getAudio, duration]);

    const pause = useCallback(() => {
        if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
        }
    }, []);

    const resume = useCallback(() => {
        if (audioRef.current && audioRef.current.paused) {
            audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        }
    }, []);

    const cleanup = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    }, []);

    return { play, pause, resume, cleanup };
};

export default useAudioManager;
