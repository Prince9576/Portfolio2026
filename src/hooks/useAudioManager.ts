import { useCallback, useRef } from "react";

export const AudioType = {
    XP: 'xp',
    ZOOM_IN: 'zoom_in',
    ZOOM_OUT: 'zoom_out',
    NETFLIX: 'netflix',
    BUTTON_CLICK: 'button_click',
} as const;

export type AudioType = typeof AudioType[keyof typeof AudioType];

const AUDIO_SRC: Record<AudioType, string> = {
    [AudioType.XP]: '/sounds/xp.mp3',
    [AudioType.ZOOM_IN]: '/sounds/zoom.mp3',
    [AudioType.ZOOM_OUT]: '/sounds/zoom.mp3',
    [AudioType.NETFLIX]: '/sounds/netflix.mp3',
    [AudioType.BUTTON_CLICK]: '/sounds/button_click.mp3',
};

const useAudioManager = (type: AudioType, duration: number = 1000) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const getAudio = useCallback(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(AUDIO_SRC[type]);
        }
        return audioRef.current;
    }, [type]);

    const play = useCallback(() => {
        const audio = getAudio();
        audio.currentTime = 0;
        audio.play().catch(err => console.log('Audio play failed:', err));
        timerRef.current = setTimeout(() => {
            audio.pause();
            timerRef.current = null;
        }, duration);
    }, [getAudio, duration]);

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

    return { play, cleanup };
};

export default useAudioManager;
