import { Download, Info } from 'lucide-react';
import { useRef } from 'react';

interface TvScreenContentProps {
    onScreenClick?: () => void;
}

const TvScreenContent = ({ onScreenClick }: TvScreenContentProps) => {
    const scrollContainerRef1 = useRef<HTMLDivElement>(null);
    const scrollContainerRef2 = useRef<HTMLDivElement>(null);

    // Dummy thumbnails for recommendations
    const recommendations = [
        { id: 1, color: '#E50914' },
        { id: 2, color: '#564d4d' },
        { id: 3, color: '#831010' },
        { id: 4, color: '#221f1f' },
        { id: 5, color: '#B20710' },
        { id: 6, color: '#666666' },
    ];

    // Dummy thumbnails for top picks
    const topPicks = [
        { id: 1, color: '#141414' },
        { id: 2, color: '#831010' },
        { id: 3, color: '#E50914' },
        { id: 4, color: '#564d4d' },
        { id: 5, color: '#221f1f' },
        { id: 6, color: '#B20710' },
    ];

    return (
        <div
            onClick={onScreenClick}
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#141414',
                color: '#fff',
                fontFamily: 'Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu, sans-serif',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer'
            }}
        >
            {/* Netflix Logo */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '30px',
                zIndex: 10
            }}>
                <img
                    src="/images/Logonetflix.png"
                    alt="Netflix"
                    style={{
                        height: '35px',
                        width: 'auto'
                    }}
                />
            </div>

            {/* Scrollable Container */}
            <div style={{
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarWidth: 'thin',
                scrollbarColor: '#4a4a4a #141414'
            }}>
                {/* Hero Section */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '500px',
                    backgroundImage: 'url(/images/netflix_bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    {/* Gradient Overlays */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to right, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 0.8) 50%, transparent 100%)',
                        zIndex: 1
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, transparent 50%, rgba(20, 20, 20, 0.5) 80%, #141414 100%)',
                        zIndex: 1
                    }} />

                    {/* Hero Content */}
                    <div style={{
                        position: 'absolute',
                        bottom: '80px',
                        left: '30px',
                        zIndex: 2,
                        maxWidth: '500px'
                    }}>
                        {/* Title */}
                        <h1 style={{
                            fontSize: '48px',
                            fontWeight: 700,
                            margin: '0 0 20px 0',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                        }}>
                            Prince Kumar
                        </h1>

                        {/* Description */}
                        <p style={{
                            fontSize: '16px',
                            lineHeight: '1.6',
                            margin: '0 0 25px 0',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                            color: '#e5e5e5'
                        }}>
                            Senior Frontend Developer with 6+ years of experience crafting exceptional
                            user experiences. Specialized in React, TypeScript, and modern web technologies.
                            Passionate about building performant, scalable, and visually stunning applications.
                        </p>

                        {/* Buttons */}
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center'
                        }}>
                            {/* Resume Button */}
                            <button style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: '#fff',
                                color: '#000',
                                border: 'none',
                                padding: '12px 28px',
                                fontSize: '16px',
                                fontWeight: 600,
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                fontFamily: 'Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu, sans-serif'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e5e5'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                            >
                                <Download size={20} />
                                Resume
                            </button>

                            {/* More Info Button */}
                            <button style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: 'rgba(109, 109, 110, 0.7)',
                                color: '#fff',
                                border: 'none',
                                padding: '12px 28px',
                                fontSize: '16px',
                                fontWeight: 600,
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                fontFamily: 'Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu, sans-serif'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(109, 109, 110, 0.4)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(109, 109, 110, 0.7)'}
                            >
                                <Info size={20} />
                                More Info
                            </button>
                        </div>
                    </div>
                </div>

                {/* Favourite Recommendations Section */}
                <div style={{
                    padding: '20px 30px 30px',
                    position: 'relative'
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        margin: '0 0 15px 0',
                        color: '#e5e5e5'
                    }}>
                        Favourite Recommendations
                    </h2>

                    <div style={{
                        position: 'relative',
                        width: '100%'
                    }}>
                        {/* Carousel Container */}
                        <div
                            ref={scrollContainerRef1}
                            style={{
                                display: 'flex',
                                gap: '8px',
                                overflowX: 'auto',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                paddingBottom: '10px'
                            }}
                        >
                            {recommendations.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        minWidth: '220px',
                                        height: '124px',
                                        backgroundColor: item.color,
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s ease',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.08)';
                                        e.currentTarget.style.zIndex = '5';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.zIndex = '1';
                                    }}
                                >
                                    {/* Subtle gradient overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '50%',
                                        background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))'
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Picks Section */}
                <div style={{
                    padding: '20px 30px 40px',
                    position: 'relative'
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        margin: '0 0 15px 0',
                        color: '#e5e5e5'
                    }}>
                        Top Picks
                    </h2>

                    <div style={{
                        position: 'relative',
                        width: '100%'
                    }}>
                        {/* Carousel Container */}
                        <div
                            ref={scrollContainerRef2}
                            style={{
                                display: 'flex',
                                gap: '8px',
                                overflowX: 'auto',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                paddingBottom: '10px'
                            }}
                        >
                            {topPicks.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        minWidth: '220px',
                                        height: '124px',
                                        backgroundColor: item.color,
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s ease',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.08)';
                                        e.currentTarget.style.zIndex = '5';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.zIndex = '1';
                                    }}
                                >
                                    {/* Subtle gradient overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '50%',
                                        background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))'
                                    }} />
                                </div>
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
    );
};

export default TvScreenContent;
