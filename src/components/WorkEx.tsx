import { useEffect, useRef, useState } from 'react';
import { Briefcase, Code, Trophy, Zap, Star, Target, Award, TrendingUp } from 'lucide-react';

const WorkEx = () => {
    const [scrollY, setScrollY] = useState(0);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [collectedSkills, setCollectedSkills] = useState<Set<string>>(new Set());
    const containerRef = useRef<HTMLDivElement>(null);
    const [xpPoints, setXpPoints] = useState(0);
    const [animatingSkill, setAnimatingSkill] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            setScrollY(container.scrollTop);
        };

        container.addEventListener('scroll', handleScroll);

        // Initialize audio
        audioRef.current = new Audio('/sounds/xp.mp3');
        audioRef.current.volume = 0.5;

        return () => {
            container.removeEventListener('scroll', handleScroll);
            if (audioRef.current) {
                audioRef.current = null;
            }
        };
    }, []);

    const experiences = [
        {
            id: 1,
            company: 'Pratishthan Software Ventures Pvt Ltd.',
            logo: '/images/pratishtan.png',
            duration: '2 years 9 months',
            startYear: '2019',
            endYear: '2021',
            position: 'Frontend Developer',
            xp: 2750,
            color: '#4F46E5',
            achievements: [
                'Led the development of responsive web applications using React and TypeScript',
                'Implemented pixel-perfect UI designs with 98% accuracy, improving user satisfaction',
                'Optimized application performance, reducing load times by 40% through code splitting',
                'Collaborated with cross-functional teams to deliver 15+ projects on time',
                'Mentored 3 junior developers in modern frontend best practices',
                'Integrated RESTful APIs and managed state using Redux and Context API'
            ],
            skills: ['React', 'TypeScript', 'Redux', 'CSS3', 'REST APIs']
        },
        {
            id: 2,
            company: 'Joveo',
            logo: '/images/joveo.webp',
            duration: '3 years 2 months',
            startYear: '2022',
            endYear: 'Present',
            position: 'Senior Frontend Developer',
            xp: 3200,
            color: '#10B981',
            achievements: [
                'Architected and developed scalable frontend solutions for enterprise-level applications',
                'Spearheaded the migration from legacy codebase to modern React architecture',
                'Implemented advanced data visualization dashboards using D3.js and Chart.js',
                'Reduced bug reports by 65% through comprehensive testing with Jest and RTL',
                'Enhanced developer experience by setting up CI/CD pipelines and automated workflows',
                'Led technical interviews and contributed to building a high-performing frontend team'
            ],
            skills: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'Three.js', 'D3.js']
        }
    ];

    const allSkills = experiences.flatMap(exp => exp.skills);
    const uniqueSkills = [...new Set(allSkills)];
    const totalXP = uniqueSkills.length * 100; // 100 XP per unique skill

    const handleSkillClick = (skill: string) => {
        if (!collectedSkills.has(skill)) {
            setCollectedSkills(new Set([...collectedSkills, skill]));
            setXpPoints(prev => Math.min(prev + 100, totalXP));

            // Play sound effect
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(err => console.log('Audio play failed:', err));
            }

            // Trigger animation on the absolute positioned star
            setAnimatingSkill(skill);

            // Remove animation after it completes (1s)
            setTimeout(() => {
                setAnimatingSkill(null);
            }, 1000);
        }
    };

    const progressPercentage = (xpPoints / totalXP) * 100;

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#0a0a0a',
                color: '#ffffff',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                overflowY: 'auto',
                overflowX: 'hidden',
                position: 'relative',
                scrollbarWidth: 'thin',
                scrollbarColor: '#4F46E5 #1a1a1a'
            }}
        >
            {/* Animated Background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)',
                transform: `translateY(${scrollY * 0.3}px)`,
                pointerEvents: 'none'
            }} />

            {/* Floating Particles */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                opacity: 0.3
            }}>
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: '2px',
                            height: '2px',
                            backgroundColor: '#4F46E5',
                            borderRadius: '50%',
                            left: `${(i * 5) % 100}%`,
                            top: `${(i * 7) % 100}%`,
                            transform: `translateY(${scrollY * (0.1 + i * 0.01)}px)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                ))}
            </div>

            {/* Header Section */}
            <div style={{
                padding: '60px 40px 40px',
                textAlign: 'center',
                position: 'relative',
                transform: `translateY(${scrollY * -0.5}px)`,
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '15px',
                    marginBottom: '20px'
                }}>
                    <Briefcase size={40} color="#4F46E5" />
                    <h1 style={{
                        fontSize: '48px',
                        fontWeight: 700,
                        margin: 0,
                        background: 'linear-gradient(135deg, #4F46E5 0%, #10B981 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Career Journey
                    </h1>
                </div>

                <p style={{
                    fontSize: '18px',
                    color: '#a0a0a0',
                    maxWidth: '600px',
                    margin: '0 auto 30px',
                    lineHeight: 1.6
                }}>
                    6 years of crafting exceptional digital experiences. Collect skills along the way!
                </p>

                {/* XP Bar */}
                <div style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '20px',
                    padding: '15px 20px',
                    border: '2px solid #2a2a2a'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Zap size={20} color="#FCD34D" />
                            <span style={{ fontSize: '14px', fontWeight: 600 }}>Total XP</span>
                        </div>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: '#4F46E5' }}>
                            {xpPoints} / {totalXP}
                        </span>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '12px',
                        backgroundColor: '#2a2a2a',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <div style={{
                            width: `${progressPercentage}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
                            borderRadius: '10px',
                            transition: 'width 0.5s ease',
                            boxShadow: '0 0 10px rgba(79, 70, 229, 0.5)'
                        }} />
                    </div>
                    <p style={{
                        fontSize: '12px',
                        color: '#666',
                        margin: '8px 0 0',
                        textAlign: 'center'
                    }}>
                        Click on skills to collect XP! ({collectedSkills.size}/{uniqueSkills.length} skills collected)
                    </p>
                </div>
            </div>

            {/* Timeline Container */}
            <div style={{
                position: 'relative',
                padding: '40px 40px 80px',
                maxWidth: '1200px',
                margin: '0 auto',
                boxSizing: 'border-box'
            }}>
                {/* Vertical Timeline Line - Left Aligned */}
                <div style={{
                    position: 'absolute',
                    left: '60px',
                    top: '40px',
                    bottom: '80px',
                    width: '3px',
                    background: 'linear-gradient(180deg, #4F46E5 0%, #10B981 100%)',
                    boxShadow: '0 0 20px rgba(79, 70, 229, 0.5)',
                    zIndex: 1
                }} />

                {/* Timeline Nodes - Fixed on the line */}
                {experiences.map((exp, index) => {
                    const nodeTopPosition = 40 + (index * 650) + 50; // 40px padding + spacing between cards + offset

                    return (
                        <div
                            key={`node-${exp.id}`}
                            style={{
                                position: 'absolute',
                                left: '60px',
                                top: `${nodeTopPosition}px`,
                                transform: 'translateX(-50%)',
                                width: '24px',
                                height: '24px',
                                backgroundColor: exp.color,
                                borderRadius: '50%',
                                border: '4px solid #0a0a0a',
                                boxShadow: `0 0 20px ${exp.color}`,
                                zIndex: 10,
                                animation: 'pulse 2s ease-in-out infinite'
                            }}
                        />
                    );
                })}

                {/* Experience Cards */}
                {experiences.map((exp, index) => {
                    const parallaxOffset = (scrollY - (index * 600)) * 0.05;
                    const isHovered = hoveredCard === exp.id;

                    return (
                        <div
                            key={exp.id}
                            style={{
                                position: 'relative',
                                marginBottom: '100px',
                                paddingLeft: '120px',
                                transform: `translateX(${parallaxOffset}px)`,
                                transition: 'transform 0.3s ease-out'
                            }}
                        >

                            {/* Card */}
                            <div
                                onMouseEnter={() => setHoveredCard(exp.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '16px',
                                    padding: '30px',
                                    border: `2px solid ${isHovered ? exp.color : '#2a2a2a'}`,
                                    transform: `scale(${isHovered ? 1.02 : 1}) translateY(${isHovered ? -5 : 0}px)`,
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    boxShadow: isHovered
                                        ? `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${exp.color}40`
                                        : '0 10px 30px rgba(0,0,0,0.3)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Gradient Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '6px',
                                    background: `linear-gradient(90deg, ${exp.color} 0%, transparent 100%)`
                                }} />

                                {/* Header */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '20px'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        {/* Company Logo */}
                                        <div style={{
                                            marginBottom: '15px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '15px'
                                        }}>
                                            <img
                                                src={exp.logo}
                                                alt={exp.company}
                                                style={{
                                                    height: '50px',
                                                    width: 'auto',
                                                    maxWidth: '120px',
                                                    objectFit: 'contain',
                                                    filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
                                                    transition: 'filter 0.3s ease'
                                                }}
                                            />
                                        </div>

                                        <h2 style={{
                                            fontSize: '24px',
                                            fontWeight: 700,
                                            margin: '0 0 8px 0',
                                            color: exp.color
                                        }}>
                                            {exp.company}
                                        </h2>
                                        <p style={{
                                            fontSize: '16px',
                                            color: '#a0a0a0',
                                            margin: '0 0 4px 0'
                                        }}>
                                            {exp.position}
                                        </p>
                                        <p style={{
                                            fontSize: '14px',
                                            color: '#666',
                                            margin: 0
                                        }}>
                                            {exp.startYear} - {exp.endYear} • {exp.duration}
                                        </p>
                                    </div>

                                    {/* XP Badge */}
                                    <div style={{
                                        backgroundColor: exp.color,
                                        color: '#fff',
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        boxShadow: `0 4px 12px ${exp.color}40`,
                                        height: 'fit-content'
                                    }}>
                                        <Trophy size={16} />
                                        {exp.xp} XP
                                    </div>
                                </div>

                                {/* Achievements */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginBottom: '12px'
                                    }}>
                                        <Target size={18} color={exp.color} />
                                        <h3 style={{
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            margin: 0,
                                            color: '#e0e0e0'
                                        }}>
                                            Key Achievements
                                        </h3>
                                    </div>
                                    <ul style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#b0b0b0',
                                        lineHeight: 1.8
                                    }}>
                                        {exp.achievements.map((achievement, i) => (
                                            <li key={i} style={{ fontSize: '14px', marginBottom: '8px' }}>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Skills */}
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginBottom: '12px'
                                    }}>
                                        <Code size={18} color={exp.color} />
                                        <h3 style={{
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            margin: 0,
                                            color: '#e0e0e0'
                                        }}>
                                            Skills Acquired
                                        </h3>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '10px'
                                    }}>
                                        {exp.skills.map((skill, i) => {
                                            const isCollected = collectedSkills.has(skill);
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSkillClick(skill)}
                                                    style={{
                                                        padding: '8px 16px',
                                                        backgroundColor: isCollected ? exp.color : '#2a2a2a',
                                                        color: isCollected ? '#fff' : '#a0a0a0',
                                                        border: `2px solid ${isCollected ? exp.color : '#3a3a3a'}`,
                                                        borderRadius: '20px',
                                                        fontSize: '13px',
                                                        fontWeight: 600,
                                                        cursor: isCollected ? 'default' : 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        transform: isCollected ? 'scale(1.05)' : 'scale(1)',
                                                        boxShadow: isCollected ? `0 0 15px ${exp.color}60` : 'none',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (!isCollected) {
                                                            e.currentTarget.style.backgroundColor = '#3a3a3a';
                                                            e.currentTarget.style.transform = 'scale(1.05)';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (!isCollected) {
                                                            e.currentTarget.style.backgroundColor = '#2a2a2a';
                                                            e.currentTarget.style.transform = 'scale(1)';
                                                        }
                                                    }}
                                                >
                                                    <div style={{ position: 'relative' }}>
                                                        <Star size={14} fill={isCollected ? "currentColor" : "none"} />
                                                        {animatingSkill === skill && (
                                                            <Star
                                                                size={14}
                                                                fill="currentColor"
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    left: 0,
                                                                    animation: 'starFloat 1s ease-out forwards'
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                    {skill}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Hover Effect Glow */}
                                {isHovered && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        width: '200%',
                                        height: '200%',
                                        background: `radial-gradient(circle, ${exp.color}15 0%, transparent 70%)`,
                                        transform: 'translate(-50%, -50%)',
                                        pointerEvents: 'none',
                                        zIndex: -1
                                    }} />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Achievement Summary */}
            <div style={{
                padding: '40px',
                textAlign: 'center',
                background: 'linear-gradient(180deg, transparent 0%, #1a1a1a 50%)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    marginBottom: '30px'
                }}>
                    <Award size={32} color="#FCD34D" />
                    <h2 style={{
                        fontSize: '32px',
                        fontWeight: 700,
                        margin: 0,
                        background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Career Stats
                    </h2>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '30px',
                    flexWrap: 'wrap',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    {[
                        { icon: TrendingUp, label: 'Years of Experience', value: '6+', color: '#4F46E5' },
                        { icon: Briefcase, label: 'Companies', value: '2', color: '#10B981' },
                        { icon: Code, label: 'Technologies', value: uniqueSkills.length, color: '#F59E0B' },
                        { icon: Trophy, label: 'Total XP', value: totalXP, color: '#EF4444' }
                    ].map((stat, i) => (
                        <div
                            key={i}
                            style={{
                                backgroundColor: '#1a1a1a',
                                borderRadius: '12px',
                                padding: '20px 30px',
                                border: '2px solid #2a2a2a',
                                minWidth: '150px',
                                transition: 'all 0.3s ease',
                                cursor: 'default'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = stat.color;
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = `0 10px 30px ${stat.color}40`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#2a2a2a';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <stat.icon size={28} color={stat.color} style={{ marginBottom: '10px' }} />
                            <div style={{
                                fontSize: '28px',
                                fontWeight: 700,
                                color: stat.color,
                                marginBottom: '5px'
                            }}>
                                {stat.value}
                            </div>
                            <div style={{
                                fontSize: '14px',
                                color: '#a0a0a0'
                            }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Animations */}
            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.2);
                        opacity: 0.8;
                    }
                }

                @keyframes starFloat {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-20px) rotate(360deg);
                        opacity: 0;
                    }
                }

                div::-webkit-scrollbar {
                    width: 10px;
                }
                div::-webkit-scrollbar-track {
                    background: #1a1a1a;
                }
                div::-webkit-scrollbar-thumb {
                    background: #4F46E5;
                    border-radius: 5px;
                }
                div::-webkit-scrollbar-thumb:hover {
                    background: #5B52EC;
                }
            `}</style>
        </div>
    );
};

export default WorkEx;
