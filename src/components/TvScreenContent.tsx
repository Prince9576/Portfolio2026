import { Download, Info } from 'lucide-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import useAudioManager, { AudioType } from '../hooks/useAudioManager';

interface TvScreenContentProps {
    onScreenClick?: () => void;
}

// Extract static styles
const CONTAINER_STYLE: React.CSSProperties = {
    width: '100%',
    height: '100%',
    backgroundColor: '#141414',
    color: '#fff',
    fontFamily: 'Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu, sans-serif',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    pointerEvents: 'auto'
};

const LOGO_CONTAINER_STYLE: React.CSSProperties = {
    position: 'absolute',
    top: '40px',
    left: '30px',
    zIndex: 10,
    transform: 'scaleY(1.45)'
};

const LOGO_STYLE: React.CSSProperties = {
    height: '35px',
    width: 'auto',
    transition: 'opacity 0.3s ease'
};

const SCROLL_CONTAINER_STYLE: React.CSSProperties = {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
    scrollbarColor: '#4a4a4a #141414'
};

const HERO_SECTION_STYLE: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '500px',
    backgroundImage: 'url(/images/netflix_bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: 'scaleY(1.5) translateY(18px)',
    marginBottom: '8rem'
};

const GRADIENT_RIGHT_STYLE: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to right, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 0.8) 50%, transparent 100%)',
    zIndex: 1
};

const GRADIENT_BOTTOM_STYLE: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 50%, rgba(20, 20, 20, 0.5) 80%, #141414 100%)',
    zIndex: 1
};

const HERO_CONTENT_STYLE: React.CSSProperties = {
    position: 'absolute',
    bottom: '80px',
    left: '30px',
    zIndex: 2,
    maxWidth: '500px'
};

const TITLE_STYLE: React.CSSProperties = {
    fontSize: '48px',
    fontWeight: 700,
    margin: '0 0 20px 0',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
};

const DESCRIPTION_STYLE: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 25px 0',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
    color: '#e5e5e5'
};

const BUTTONS_CONTAINER_STYLE: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
};

const BUTTON_BASE_STYLE: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: 'none',
    padding: '12px 28px',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontFamily: 'Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu, sans-serif'
};

const SECTION_STYLE: React.CSSProperties = {
    padding: '20px 30px 30px',
    position: 'relative',
    transform: 'scaleY(1.5) translateY(15px)',
};

const SECTION_TITLE_STYLE: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 600,
    margin: '0 0 15px 0',
    color: '#e5e5e5'
};

const CAROUSEL_CONTAINER_STYLE: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    paddingBottom: '10px'
};

const THUMBNAIL_BASE_STYLE: React.CSSProperties = {
    minWidth: '220px',
    height: '124px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
};

const THUMBNAIL_GRADIENT_STYLE: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))'
};

// Dummy data
const RECOMMENDATIONS = [
    { id: 1, image: '/images/bb.jpg' },
    { id: 2, image: '/images/dark.jpg' },
    { id: 3, image: '/images/interstellar.jpg' },
    { id: 4, image: '/images/coherence.webp' },
];

const TOP_PICKS = [
    { id: 1, image: '/images/aot.webp' },
    { id: 2, image: '/images/naruto.jpeg' },
    { id: 3, image: '/images/deathnote.jpg' },
    { id: 4, image: '/images/code_geass.jpg' },
];

const TvScreenContent = memo(({ onScreenClick }: TvScreenContentProps) => {
    const scrollContainerRef1 = useRef<HTMLDivElement>(null);
    const scrollContainerRef2 = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    const [showIntro, setShowIntro] = useState(true);
    const [contentOpacity, setContentOpacity] = useState(0);

    const { play: playNetflixSound, cleanup: cleanupNetflixSound } = useAudioManager(AudioType.NETFLIX, 2500);

    useEffect(() => {
        // Play sound after a brief delay
        const soundTimer = setTimeout(() => {
            playNetflixSound();
        }, 500);

        // Hide intro and fade in content after GIF duration (typically 3-4 seconds)
        const introTimer = setTimeout(() => {
            setShowIntro(false);
            // Start fading in the content
            setTimeout(() => {
                setContentOpacity(1);
            }, 100);
        }, 2500);

        return () => {
            clearTimeout(soundTimer);
            clearTimeout(introTimer);
            cleanupNetflixSound();
        };
    }, [playNetflixSound, cleanupNetflixSound]);

    const handleContainerClick = useCallback(() => {
        onScreenClick?.();
    }, [onScreenClick]);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop } = e.currentTarget;
        if (scrollTop > 30 && logoRef.current) {
            logoRef.current.style.opacity = '0';
        } else {
            logoRef.current && (logoRef.current.style.opacity = '1');
        }
    }, []);

    return (
        <div className="tv-content-wrapper" onClick={handleContainerClick} style={CONTAINER_STYLE}>
            {/* Netflix Intro Animation */}
            {showIntro && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 999,
                        backgroundColor: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src="images/netflix_intro.gif"
                        alt="Netflix Intro"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            )}

            {/* Main Content with fade-in animation */}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    opacity: contentOpacity,
                    transition: 'opacity 1s ease-in-out',
                }}
            >
                {/* Netflix Logo */}
                <div style={LOGO_CONTAINER_STYLE}>
                    <img
                        ref={logoRef}
                        src="/images/Logonetflix.png"
                        alt="Netflix"
                        style={LOGO_STYLE}
                    />
                </div>

                {/* Scrollable Container */}
                <div style={SCROLL_CONTAINER_STYLE} onScroll={handleScroll}>
                    {/* Hero Section */}
                    <div style={HERO_SECTION_STYLE}>
                        {/* Gradient Overlays */}
                        <div style={GRADIENT_RIGHT_STYLE} />
                        <div style={GRADIENT_BOTTOM_STYLE} />

                        {/* Hero Content */}
                        <div style={HERO_CONTENT_STYLE}>
                            {/* Title */}
                            <h1 style={TITLE_STYLE}>Prince Kumar</h1>

                            {/* Description */}
                            <p style={DESCRIPTION_STYLE}>
                                Senior Frontend Developer with 6+ years of experience crafting exceptional
                                user experiences. Specialized in React, TypeScript, and modern web technologies.
                                Passionate about building performant, scalable, and visually stunning applications.
                            </p>

                            {/* Buttons */}
                            <div style={BUTTONS_CONTAINER_STYLE}>
                                <ResumeButton />
                                <MoreInfoButton />
                            </div>
                        </div>
                    </div>

                    {/* Favourite Recommendations Section */}
                    <div style={{ ...SECTION_STYLE, marginBottom: '70px' }}>
                        <h2 style={SECTION_TITLE_STYLE}>Favourite Recommendations</h2>

                        <div style={{ position: 'relative', width: '100%' }}>
                            <div ref={scrollContainerRef1} style={CAROUSEL_CONTAINER_STYLE}>
                                {RECOMMENDATIONS.map((item) => (
                                    <ThumbnailCard key={item.id} image={item.image} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Top Picks Section */}
                    <div style={{ ...SECTION_STYLE, paddingBottom: '40px' }}>
                        <h2 style={SECTION_TITLE_STYLE}>Top Picks</h2>

                        <div style={{ position: 'relative', width: '100%' }}>
                            <div ref={scrollContainerRef2} style={CAROUSEL_CONTAINER_STYLE}>
                                {TOP_PICKS.map((item) => (
                                    <ThumbnailCard key={item.id} image={item.image} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom scrollbar styles */}
                <style>{`
                div::-webkit-scrollbar {
                    width: 10px;
                    height: 10px;
                }
                div::-webkit-scrollbar-track {
                    background: #141414;
                }
                div::-webkit-scrollbar-thumb {
                    background: #4a4a4a;
                    border-radius: 5px;
                }
                div::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
            </div>
        </div>
    );
});

TvScreenContent.displayName = 'TvScreenContent';

// Extracted sub-components for better performance
const ResumeButton = memo(() => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return (
        <button
            style={{
                ...BUTTON_BASE_STYLE,
                backgroundColor: isHovered ? '#e5e5e5' : '#fff',
                color: '#000'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Download size={20} />
            Resume
        </button>
    );
});

ResumeButton.displayName = 'ResumeButton';

const MoreInfoButton = memo(() => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return (
        <button
            style={{
                ...BUTTON_BASE_STYLE,
                backgroundColor: isHovered ? 'rgba(109, 109, 110, 0.4)' : 'rgba(109, 109, 110, 0.7)',
                color: '#fff'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Info size={20} />
            More Info
        </button>
    );
});

MoreInfoButton.displayName = 'MoreInfoButton';

const ThumbnailCard = memo(({ image }: { image: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                ...THUMBNAIL_BASE_STYLE,
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                zIndex: isHovered ? 5 : 1
            }}
        >
            <img
                src={image}
                alt=""
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
            <div style={THUMBNAIL_GRADIENT_STYLE} />
        </div>
    );
});

ThumbnailCard.displayName = 'ThumbnailCard';

export default TvScreenContent;
