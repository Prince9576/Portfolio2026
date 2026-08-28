import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Briefcase,
  Code,
  Trophy,
  Zap,
  Star,
  Target,
  Award,
  TrendingUp,
} from "lucide-react";
import useAudioManager, { AudioType } from "../hooks/useAudioManager";

const CONTAINER_STYLE: React.CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundColor: "#0a0a0a",
  color: "#ffffff",
  fontFamily: "system-ui, -apple-system, sans-serif",
  overflowY: "auto",
  overflowX: "hidden",
  position: "relative",
  scrollbarWidth: "thin",
  scrollbarColor: "#4F46E5 #1a1a1a",
  touchAction: "pan-y pan-x",
  WebkitOverflowScrolling: "touch",
};

const BACKGROUND_GRADIENT_STYLE: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)",
  pointerEvents: "none",
};

const PARTICLES_CONTAINER_STYLE: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  pointerEvents: "none",
  opacity: 0.3,
};

const PARTICLE_BASE_STYLE: React.CSSProperties = {
  position: "absolute",
  width: "2px",
  height: "2px",
  backgroundColor: "#4F46E5",
  borderRadius: "50%",
  transition: "transform 0.1s ease-out",
};

const HEADER_SECTION_STYLE: React.CSSProperties = {
  padding: "60px 40px 40px",
  textAlign: "center",
  position: "relative",
};

const HEADER_FLEX_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
  marginBottom: "20px",
};

const TITLE_STYLE: React.CSSProperties = {
  fontSize: "clamp(32px, 6vw, 48px)",
  fontWeight: 700,
  margin: 0,
  background: "linear-gradient(135deg, #4F46E5 0%, #10B981 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const SUBTITLE_STYLE: React.CSSProperties = {
  fontSize: "18px",
  color: "#a0a0a0",
  maxWidth: "600px",
  margin: "0 auto 30px",
  lineHeight: 1.6,
};

const XP_BAR_CONTAINER_STYLE: React.CSSProperties = {
  maxWidth: "500px",
  margin: "0 auto",
  backgroundColor: "#1a1a1a",
  borderRadius: "20px",
  padding: "15px 20px",
  border: "2px solid #2a2a2a",
};

const XP_BAR_PROGRESS_CONTAINER_STYLE: React.CSSProperties = {
  width: "100%",
  height: "12px",
  backgroundColor: "#2a2a2a",
  borderRadius: "10px",
  overflow: "hidden",
  position: "relative",
};

const TIMELINE_CONTAINER_STYLE: React.CSSProperties = {
  position: "relative",
  padding: "40px 40px 80px",
  maxWidth: "1200px",
  margin: "0 auto",
  boxSizing: "border-box",
};

const TIMELINE_LINE_STYLE: React.CSSProperties = {
  position: "absolute",
  left: "60px",
  top: "40px",
  bottom: "80px",
  width: "3px",
  background: "linear-gradient(180deg, #4F46E5 0%, #10B981 100%)",
  boxShadow: "0 0 20px rgba(79, 70, 229, 0.5)",
  zIndex: 1,
};

const CARD_STYLE: React.CSSProperties = {
  backgroundColor: "#1a1a1a",
  borderRadius: "16px",
  padding: "30px",
  position: "relative",
  overflow: "hidden",
};

interface Experience {
  id: number;
  company: string;
  logo: string;
  start: string;
  end: string | null;
  position: string;
  location: string;
  xp: number;
  color: string;
  achievements: string[];
  skills: string[];
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const parseMonth = (value: string) => {
  const [year, month] = value.split("-").map(Number);
  return new Date(year, month - 1, 1);
};

const formatMonth = (value: string | null) => {
  if (!value) return "Present";
  const date = parseMonth(value);
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

const formatDuration = (start: string, end: string | null) => {
  const from = parseMonth(start);
  const to = end ? parseMonth(end) : new Date();
  const months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  const years = Math.floor(months / 12);
  const remainder = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (remainder > 0)
    parts.push(`${remainder} ${remainder === 1 ? "month" : "months"}`);
  return parts.join(" ") || "Less than a month";
};

const WorkEx = memo(() => {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [collectedSkills, setCollectedSkills] = useState<Set<string>>(
    new Set(),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [xpPoints, setXpPoints] = useState(0);
  const [animatingSkill, setAnimatingSkill] = useState<string | null>(null);
  const { play, cleanup } = useAudioManager(AudioType.XP);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setScrollY(container.scrollTop);
        rafId = null;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const experiences = useMemo<Experience[]>(
    () => [
      {
        id: 1,
        company: "Joveo",
        logo: "/images/joveo.webp",
        start: "2022-05",
        end: null,
        position: "Software Engineer L4 (L3 until Dec 2023)",
        location: "Bangalore, India",
        xp: 4200,
        color: "#10B981",
        achievements: [
          "Architected a reusable data grid platform on AG Grid, shipped as a centralized React and TypeScript library now used across multiple products",
          "Covered it with Jest unit tests, enforced ESLint and Prettier in CI, and review contributions from the teams adopting it",
          "Migrated large legacy modules onto the platform in about a month, work that had taken six months before, by building reusable migration patterns",
          "Built the internal Studio Platform in Next.js for the Trading team using a server first RSC architecture with TanStack Query",
          "Led frontend for a high visibility product with a modular architecture that cut feature delivery from around 20 days to 5 or 6",
          "Cut First Contentful Paint by 30 to 40% and brought runtime warnings from thousands down to single digits",
          "Owned the backend for Audit Logs and Filter Presets in Spring Boot and MySQL, including REST APIs, CDC and Kafka",
        ],
        skills: [
          "React",
          "TypeScript",
          "Next.js",
          "AG Grid",
          "TanStack Query",
          "Jest",
          "Spring Boot",
          "Kafka",
        ],
      },
      {
        id: 2,
        company: "EdYoda (ZekeLabs Technologies)",
        logo: "/images/edyoda.png",
        start: "2023-11",
        end: "2024-05",
        position: "Instructor, part time",
        location: "Remote",
        xp: 900,
        color: "#F59E0B",
        achievements: [
          "Taught core frontend to college graduates alongside my full time job, covering HTML, CSS, JavaScript, React and Angular",
          "Ran sessions on data structures and algorithms, and on preparing for product company interviews",
        ],
        skills: ["JavaScript", "React", "Angular", "DSA"],
      },
      {
        id: 3,
        company: "Pratishthan Software Ventures Pvt Ltd",
        logo: "/images/pratishtan.png",
        start: "2019-09",
        end: "2022-05",
        position: "Senior Frontend Developer",
        location: "Bangalore, India",
        xp: 2750,
        color: "#4F46E5",
        achievements: [
          "Built cross-platform web and mobile applications with React, Redux, Angular and Ionic, using reusable configuration-driven components",
          "Led a complex React to Angular migration from scratch, driving planning, task allocation and execution",
          "Mentored junior developers and worked directly with clients on delivery in Agile teams",
          "Improved performance, code quality and maintainability through sustained refactoring",
        ],
        skills: ["React", "Redux", "Angular", "Ionic", "RxJS"],
      },
    ],
    [],
  );

  const allSkills = useMemo(
    () => experiences.flatMap((exp) => exp.skills),
    [experiences],
  );
  const uniqueSkills = useMemo(() => [...new Set(allSkills)], [allSkills]);
  const totalXP = useMemo(() => uniqueSkills.length * 100, [uniqueSkills]);

  const totalYears = 7

  const employerCount = 3

  const handleSkillClick = useCallback(
    (skill: string) => {
      if (!collectedSkills.has(skill)) {
        setCollectedSkills(new Set([...collectedSkills, skill]));
        setXpPoints((prev) => Math.min(prev + 100, totalXP));

        play();

        setAnimatingSkill(skill);

        setTimeout(() => {
          setAnimatingSkill(null);
        }, 1000);
      }
    },
    [collectedSkills, totalXP, play],
  );

  const handleCardMouseEnter = useCallback((id: number) => {
    setHoveredCard(id);
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  const progressPercentage = totalXP === 0 ? 0 : (xpPoints / totalXP) * 100;

  return (
    <div ref={containerRef} className="workex-root" style={CONTAINER_STYLE}>
      <div
        style={{
          ...BACKGROUND_GRADIENT_STYLE,
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />

      <div style={PARTICLES_CONTAINER_STYLE}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              ...PARTICLE_BASE_STYLE,
              left: `${(i * 12.5) % 100}%`,
              top: `${(i * 12.5) % 100}%`,
              transform: `translateY(${scrollY * (0.1 + i * 0.02)}px)`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          ...HEADER_SECTION_STYLE,
          transform: `translateY(${scrollY * -0.5}px)`,
        }}
      >
        <div style={HEADER_FLEX_STYLE}>
          <Briefcase size={40} color="#4F46E5" />
          <h1 style={TITLE_STYLE}>Career Journey</h1>
        </div>

        <p style={SUBTITLE_STYLE}>
          {totalYears} years of building frontend at scale. Collect skills along
          the way.
        </p>

        <div style={XP_BAR_CONTAINER_STYLE}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Zap size={20} color="#FCD34D" />
              <span style={{ fontSize: "14px", fontWeight: 600 }}>
                Total XP
              </span>
            </div>
            <span
              style={{ fontSize: "16px", fontWeight: 700, color: "#4F46E5" }}
            >
              {xpPoints} / {totalXP}
            </span>
          </div>
          <div
            style={XP_BAR_PROGRESS_CONTAINER_STYLE}
            role="progressbar"
            aria-valuenow={collectedSkills.size}
            aria-valuemin={0}
            aria-valuemax={uniqueSkills.length}
            aria-label="Skills collected"
          >
            <div
              style={{
                width: `${progressPercentage}%`,
                height: "100%",
                background: "linear-gradient(90deg, #4F46E5 0%, #10B981 100%)",
                borderRadius: "10px",
                transition: "width 0.5s ease",
                boxShadow: "0 0 10px rgba(79, 70, 229, 0.5)",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "12px",
              color: "#666",
              margin: "8px 0 0",
              textAlign: "center",
            }}
          >
            Click a skill to collect XP ({collectedSkills.size} of{" "}
            {uniqueSkills.length} collected)
          </p>
        </div>
      </div>

      <div className="workex-timeline" style={TIMELINE_CONTAINER_STYLE}>
        <div className="workex-line" style={TIMELINE_LINE_STYLE} />

        {experiences.map((exp) => (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            isHovered={hoveredCard === exp.id}
            collectedSkills={collectedSkills}
            animatingSkill={animatingSkill}
            onSkillClick={handleSkillClick}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          />
        ))}
      </div>

      <div
        style={{
          padding: "40px",
          textAlign: "center",
          background: "linear-gradient(180deg, transparent 0%, #1a1a1a 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "30px",
          }}
        >
          <Award size={32} color="#FCD34D" />
          <h2
            style={{
              fontSize: "clamp(24px, 5vw, 32px)",
              fontWeight: 700,
              margin: 0,
              background: "linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Career Stats
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {[
            {
              icon: TrendingUp,
              label: "Years of Experience",
              value: `${totalYears}+`,
              color: "#4F46E5",
            },
            {
              icon: Briefcase,
              label: "Organisations",
              value: employerCount,
              color: "#10B981",
            },
            {
              icon: Code,
              label: "Technologies",
              value: uniqueSkills.length,
              color: "#F59E0B",
            },
            {
              icon: Trophy,
              label: "Total XP",
              value: totalXP,
              color: "#EF4444",
            },
          ].map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes workexPulse {
          0%, 100% {
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateX(-50%) scale(1.25);
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

        .workex-root::-webkit-scrollbar {
          width: 10px;
        }
        .workex-root::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .workex-root::-webkit-scrollbar-thumb {
          background: #4F46E5;
          border-radius: 5px;
        }
        .workex-root::-webkit-scrollbar-thumb:hover {
          background: #5B52EC;
        }

        .workex-root button:focus-visible {
          outline: 2px solid #10B981;
          outline-offset: 2px;
        }

        @media (max-width: 640px) {
          .workex-timeline {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .workex-line {
            left: 26px !important;
          }
          .workex-entry {
            padding-left: 56px !important;
          }
          .workex-node {
            left: 6px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .workex-root *,
          .workex-root *::before,
          .workex-root *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
});

WorkEx.displayName = "WorkEx";

const ExperienceCard = memo(
  ({
    exp,
    isHovered,
    collectedSkills,
    animatingSkill,
    onSkillClick,
    onMouseEnter,
    onMouseLeave,
  }: {
    exp: Experience;
    isHovered: boolean;
    collectedSkills: Set<string>;
    animatingSkill: string | null;
    onSkillClick: (skill: string) => void;
    onMouseEnter: (id: number) => void;
    onMouseLeave: () => void;
  }) => {
    const entryRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const node = entryRef.current;
      if (!node) return;

      if (typeof IntersectionObserver === "undefined") {
        setIsVisible(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15 },
      );

      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    const handleEnter = useCallback(
      () => onMouseEnter(exp.id),
      [onMouseEnter, exp.id],
    );

    return (
      <div
        ref={entryRef}
        className="workex-entry"
        style={{
          position: "relative",
          marginBottom: "100px",
          paddingLeft: "120px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        <div
          className="workex-node"
          style={{
            position: "absolute",
            left: "20px",
            top: "50px",
            transform: "translateX(-50%)",
            width: "24px",
            height: "24px",
            backgroundColor: exp.color,
            borderRadius: "50%",
            border: "4px solid #0a0a0a",
            boxShadow: `0 0 20px ${exp.color}`,
            zIndex: 10,
            animation: "workexPulse 2s ease-in-out infinite",
          }}
        />

        <div
          onMouseEnter={handleEnter}
          onMouseLeave={onMouseLeave}
          style={{
            ...CARD_STYLE,
            border: `2px solid ${isHovered ? exp.color : "#2a2a2a"}`,
            transform: `scale(${isHovered ? 1.02 : 1}) translateY(${isHovered ? -5 : 0}px)`,
            transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
            boxShadow: isHovered
              ? `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${exp.color}40`
              : "0 10px 30px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "6px",
              background: `linear-gradient(90deg, ${exp.color} 0%, transparent 100%)`,
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: "1 1 260px", minWidth: 0 }}>
              <div
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <img
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  loading="lazy"
                  decoding="async"
                  style={{
                    height: "50px",
                    width: "auto",
                    maxWidth: "120px",
                    objectFit: "contain",
                    filter: isHovered ? "brightness(1.2)" : "brightness(1)",
                    transition: "filter 0.3s ease",
                  }}
                />
              </div>

              <h2
                style={{
                  fontSize: "clamp(20px, 3vw, 24px)",
                  fontWeight: 700,
                  margin: "0 0 8px 0",
                  color: exp.color,
                }}
              >
                {exp.company}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#a0a0a0",
                  margin: "0 0 4px 0",
                }}
              >
                {exp.position}
              </p>
              <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
                {formatMonth(exp.start)} - {formatMonth(exp.end)} •{" "}
                {formatDuration(exp.start, exp.end)} • {exp.location}
              </p>
            </div>

            <div
              style={{
                backgroundColor: exp.color,
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: `0 4px 12px ${exp.color}40`,
                height: "fit-content",
                whiteSpace: "nowrap",
              }}
            >
              <Trophy size={16} />
              {exp.xp} XP
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <Target size={18} color={exp.color} />
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  margin: 0,
                  color: "#e0e0e0",
                }}
              >
                What I did
              </h3>
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                color: "#b0b0b0",
                lineHeight: 1.8,
              }}
            >
              {exp.achievements.map((achievement, i) => (
                <li key={i} style={{ fontSize: "14px", marginBottom: "8px" }}>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <Code size={18} color={exp.color} />
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  margin: 0,
                  color: "#e0e0e0",
                }}
              >
                Skills Acquired
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {exp.skills.map((skill) => (
                <SkillButton
                  key={skill}
                  skill={skill}
                  isCollected={collectedSkills.has(skill)}
                  expColor={exp.color}
                  animatingSkill={animatingSkill}
                  onClick={onSkillClick}
                />
              ))}
            </div>
          </div>

          {isHovered && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "200%",
                height: "200%",
                background: `radial-gradient(circle, ${exp.color}15 0%, transparent 70%)`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: -1,
              }}
            />
          )}
        </div>
      </div>
    );
  },
);

ExperienceCard.displayName = "ExperienceCard";

const SkillButton = memo(
  ({
    skill,
    isCollected,
    expColor,
    animatingSkill,
    onClick,
  }: {
    skill: string;
    isCollected: boolean;
    expColor: string;
    animatingSkill: string | null;
    onClick: (skill: string) => void;
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = useCallback(() => {
      onClick(skill);
    }, [onClick, skill]);

    const handleMouseEnter = useCallback(() => {
      if (!isCollected) setIsHovered(true);
    }, [isCollected]);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
    }, []);

    return (
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={isCollected}
        aria-pressed={isCollected}
        aria-label={
          isCollected ? `${skill}, collected` : `Collect ${skill}, 100 XP`
        }
        style={{
          padding: "8px 16px",
          backgroundColor: isCollected
            ? expColor
            : isHovered
              ? "#3a3a3a"
              : "#2a2a2a",
          color: isCollected ? "#fff" : "#a0a0a0",
          border: `2px solid ${isCollected ? expColor : "#3a3a3a"}`,
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: 600,
          fontFamily: "inherit",
          cursor: isCollected ? "default" : "pointer",
          transition: "all 0.3s ease",
          transform: isCollected || isHovered ? "scale(1.05)" : "scale(1)",
          boxShadow: isCollected ? `0 0 15px ${expColor}60` : "none",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ position: "relative", display: "inline-flex" }}>
          <Star size={14} fill={isCollected ? "currentColor" : "none"} />
          {animatingSkill === skill && (
            <Star
              size={14}
              fill="currentColor"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                animation: "starFloat 1s ease-out forwards",
              }}
            />
          )}
        </span>
        {skill}
      </button>
    );
  },
);

SkillButton.displayName = "SkillButton";

interface Stat {
  label: string;
  value: string | number;
  color: string;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    style?: React.CSSProperties;
  }>;
}

const StatCard = memo(({ stat }: { stat: Stat }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: "#1a1a1a",
        borderRadius: "12px",
        padding: "20px 30px",
        border: `2px solid ${isHovered ? stat.color : "#2a2a2a"}`,
        minWidth: "150px",
        transition: "all 0.3s ease",
        cursor: "default",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered ? `0 10px 30px ${stat.color}40` : "none",
      }}
    >
      <stat.icon size={28} color={stat.color} style={{ marginBottom: "10px" }} />
      <div
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: stat.color,
          marginBottom: "5px",
        }}
      >
        {stat.value}
      </div>
      <div style={{ fontSize: "14px", color: "#a0a0a0" }}>{stat.label}</div>
    </div>
  );
});

StatCard.displayName = "StatCard";

export default WorkEx;