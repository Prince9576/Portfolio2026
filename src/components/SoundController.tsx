import { Volume2, VolumeX } from "lucide-react";

const SoundController = () => {
    return (
        <button style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000000000,
            background: 'rgba(10, 15, 30, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '100px',
            cursor: 'pointer',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            padding: '10px',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
        }}>
            <VolumeX />
        </button>
    )
}

export default SoundController;