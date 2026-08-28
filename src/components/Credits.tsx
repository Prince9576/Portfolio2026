import { Info, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Credit = {
    label: string;
    text: string;
    links: { text: string; href: string }[];
};

const CREDITS: Credit[] = [
    {
        label: "Room",
        text: "3D model pulled from CGTrader.",
        links: [
            {
                text: "hq3dmod",
                href: "https://www.cgtrader.com/designers/hq3dmod?utm_source=credit&utm_source=credit_item_page",
            },
            {
                text: "guy-in-a-poncho",
                href: "https://www.cgtrader.com/designers/guy-in-a-poncho?utm_source=credit&utm_source=credit_item_page",
            },
        ],
    },
    {
        label: "Bike",
        text: '"Kawasaki Ninja ZX-6R" by valvetin, licensed under Creative Commons Attribution.',
        links: [
            { text: "Model", href: "https://skfb.ly/oVZ8s" },
            { text: "License", href: "http://creativecommons.org/licenses/by/4.0/" },
        ],
    },
    {
        label: "Naruto",
        text: '"Naruto Shippuden - Naruto" by 3D Resource, licensed under Creative Commons Attribution.',
        links: [
            { text: "Model", href: "https://skfb.ly/ot8At" },
            { text: "License", href: "http://creativecommons.org/licenses/by/4.0/" },
        ],
    },
];

const Credits = () => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close on Escape and on a click outside the popup.
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        const onPointerDown = (event: MouseEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("mousedown", onPointerDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("mousedown", onPointerDown);
        };
    }, [isOpen]);

    return (
        <div
            ref={wrapperRef}
            style={{
                position: "fixed",
                bottom: "20px",
                left: "20px",
                zIndex: 1000000000,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                fontFamily: "system-ui, -apple-system, sans-serif",
            }}
        >
            {isOpen && (
                <div
                    role="dialog"
                    aria-label="Model credits"
                    style={{
                        width: "min(360px, calc(100vw - 40px))",
                        maxHeight: "min(70vh, 480px)",
                        overflowY: "auto",
                        background: "rgba(10, 15, 30, 0.95)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "16px",
                        boxShadow: "0 20px 45px rgba(0, 0, 0, 0.5)",
                        backdropFilter: "blur(12px)",
                        color: "rgba(255, 255, 255, 0.85)",
                        padding: "18px 20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "12px",
                            marginBottom: "12px",
                        }}
                    >
                        <h2
                            style={{
                                margin: 0,
                                fontSize: "15px",
                                fontWeight: 600,
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                                color: "#fff",
                            }}
                        >
                            Model Credits
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="Close credits"
                            style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                color: "rgba(255, 255, 255, 0.6)",
                                display: "flex",
                                padding: "2px",
                            }}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <ul
                        style={{
                            margin: 0,
                            paddingLeft: "18px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "14px",
                            fontSize: "13px",
                            lineHeight: 1.6,
                        }}
                    >
                        {CREDITS.map((credit) => (
                            <li key={credit.label}>
                                <span style={{ color: "#fff", fontWeight: 600 }}>
                                    {credit.label}:
                                </span>{" "}
                                {credit.text}
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "10px",
                                        marginTop: "4px",
                                    }}
                                >
                                    {credit.links.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: "#7dd3fc",
                                                textDecoration: "none",
                                                borderBottom: "1px solid rgba(125, 211, 252, 0.4)",
                                            }}
                                        >
                                            {link.text}
                                        </a>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-label="Model credits"
                style={{
                    background: "rgba(10, 15, 30, 0.85)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "100px",
                    cursor: "pointer",
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                    padding: "10px",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                }}
            >
                <Info />
            </button>
        </div>
    );
};

export default Credits;