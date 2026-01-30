import { useRef } from "react";

export const AudioType = {
    XP: 'xp',
    ZOOM_IN: 'zoom_in',
    ZOOM_OUT: 'zoom_out',
} as const;

export type AudioType = typeof AudioType[keyof typeof AudioType];

const useAudioManager = (type: AudioType, duration: number = 1000) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    switch (type) {
        case AudioType.XP:
            audioRef.current = new Audio('/sounds/xp.mp3');
            break;
        case AudioType.ZOOM_IN:
            audioRef.current = new Audio('/sounds/zoom.mp3');
            break;
        case AudioType.ZOOM_OUT:
            audioRef.current = new Audio('/sounds/zoom.mp3');
            break;
    }

    function play() {
        audioRef.current?.play().catch(err => console.log('Audio play failed:', err));
        timerRef.current = setTimeout(() => {
            audioRef.current?.pause();
            timerRef.current = null;
        }, duration);
    }

    function cleanup() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    }
    return { play, cleanup };
}

export default useAudioManager;