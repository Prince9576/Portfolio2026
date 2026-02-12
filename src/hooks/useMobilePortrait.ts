import { useState, useEffect } from "react";

const useMobilePortrait = () => {
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    const checkMobilePortrait = () => {
      const isMobile =
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        (window.innerWidth <= 768 && window.innerHeight > window.innerWidth);
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsMobilePortrait(isMobile && isPortrait);
    };

    checkMobilePortrait();
    window.addEventListener("resize", checkMobilePortrait);
    window.addEventListener("orientationchange", checkMobilePortrait);

    return () => {
      window.removeEventListener("resize", checkMobilePortrait);
      window.removeEventListener("orientationchange", checkMobilePortrait);
    };
  }, []);

  return isMobilePortrait;
};

export default useMobilePortrait;
