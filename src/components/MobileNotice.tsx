import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { RESUME_URL } from "../constants";

const MobileNotice = () => {
    const [visible, setVisible] = useState(false);
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => {
            setVisible(true);
            requestAnimationFrame(() => setEntered(true));
        }, 900);
        return () => clearTimeout(t);
    }, []);

    const close = () => {
        setEntered(false);
        setTimeout(() => setVisible(false), 260);
    };

    if (!visible) return null;

    return (
        <div
            onClick={close}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 2000000000,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                padding: "20px",
                backgroundColor: entered ? "rgba(4, 6, 12, 0.72)" : "rgba(4, 6, 12, 0)",
                backdropFilter: entered ? "blur(6px)" : "blur(0px)",
                WebkitBackdropFilter: entered ? "blur(6px)" : "blur(0px)",
                transition: "background-color 0.26s ease, backdrop-filter 0.26s ease",
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    marginBottom: "max(16px, env(safe-area-inset-bottom))",
                    padding: "26px 22px 22px",
                    borderRadius: "18px",
                    position: "relative",
                    background:
                        "linear-gradient(165deg, #12141c 0%, #0b0d14 100%)",
                    border: "1px solid rgba(99, 102, 241, 0.28)",
                    boxShadow:
                        "0 24px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(79, 70, 229, 0.14)",
                    color: "#e8e8ef",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    transform: entered ? "translateY(0)" : "translateY(24px)",
                    opacity: entered ? 1 : 0,
                    transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.3, 1), opacity 0.26s ease",
                }}
            >
                <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    style={{
                        position: "absolute",
                        top: "14px",
                        right: "14px",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.04)",
                        color: "#8b8b9c",
                        cursor: "pointer",
                        padding: 0,
                    }}
                >
                    <X size={15} />
                </button>

                <div
                    style={{
                        width: "34px",
                        height: "3px",
                        borderRadius: "2px",
                        marginBottom: "18px",
                        background: "linear-gradient(90deg, #6366F1 0%, #10B981 100%)",
                        boxShadow: "0 0 12px rgba(99, 102, 241, 0.6)",
                    }}
                />

                <h2
                    style={{
                        fontSize: "19px",
                        fontWeight: 650,
                        margin: "0 0 12px",
                        letterSpacing: "-0.01em",
                        color: "#f4f4f8",
                    }}
                >
                    Heads up, this one is built for a bigger screen
                </h2>

                <p
                    style={{
                        fontSize: "14.5px",
                        lineHeight: 1.65,
                        color: "#9d9daf",
                        margin: "0 0 12px",
                    }}
                >
                    You can still look around and poke at things, but a few bits are rough
                    on mobile and some are still under construction.
                </p>

                <p
                    style={{
                        fontSize: "14.5px",
                        lineHeight: 1.65,
                        color: "#9d9daf",
                        margin: "0 0 22px",
                    }}
                >
                    I am working on a V2 with more to explore and a lot more content.
                    Stay tuned. In the meantime, here is my resume.
                </p>

                <a
                    href={RESUME_URL}
                    download
                    onClick={close}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "9px",
                        width: "100%",
                        padding: "13px",
                        borderRadius: "11px",
                        boxSizing: "border-box",
                        fontSize: "14.5px",
                        fontWeight: 600,
                        textDecoration: "none",
                        color: "#ffffff",
                        background: "linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)",
                        border: "1px solid rgba(129, 140, 248, 0.4)",
                        boxShadow: "0 6px 20px rgba(79, 70, 229, 0.32)",
                    }}
                >
                    <Download size={16} />
                    Download resume
                </a>

                <p
                    style={{
                        fontSize: "12px",
                        color: "#5f5f70",
                        textAlign: "center",
                        margin: "13px 0 0",
                    }}
                >
                    Or use the icon below, anytime.
                </p>
            </div>
        </div >
    );
};

export default MobileNotice;