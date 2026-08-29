import { Download } from "lucide-react";
import { RESUME_URL } from "../constants";

const DownloadResume = () => {

    const handleClick = (e: any) => {
        e.stopPropagation();
        window.open(RESUME_URL, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            style={{
                position: "fixed",
                bottom: "20px",
                left: "90px",
                zIndex: 1000000000,
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
            {<Download />}
        </button>
    );
};

export default DownloadResume;
