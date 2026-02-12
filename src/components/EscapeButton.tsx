import React from "react";

const EscapeButton = ({ isVisible }: { isVisible: boolean }) => {
    const handleClick = () => {
        window.dispatchEvent(new CustomEvent('flyBackToOriginal'));
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isVisible) {
                window.dispatchEvent(new CustomEvent('flyBackToOriginal'));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <button
            onClick={handleClick}
            style={{
                position: "fixed",
                top: "20px",
                left: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                background: "rgba(10, 15, 30, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "14px",
                fontFamily: "system-ui, -apple-system, sans-serif",
                cursor: "pointer",
                pointerEvents: "auto",
                backdropFilter: "blur(10px)",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                zIndex: 1000000000,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(20, 30, 50, 0.95)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(10, 15, 30, 0.85)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            }}
        >
            <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px 6px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.5px",
            }}>
                ESC
            </span>
        </button>
    );
};

export default EscapeButton;
