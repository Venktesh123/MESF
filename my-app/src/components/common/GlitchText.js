import React, { useEffect, useState } from "react";

const GlitchText = ({
  text,
  className = "",
  autoGlitch = false,
  glitchInterval = 3000,
  glitchOnHover = false,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (autoGlitch) {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 500);
      }, glitchInterval);

      return () => clearInterval(interval);
    }
  }, [autoGlitch, glitchInterval]);

  const handleMouseEnter = () => {
    if (glitchOnHover) {
      setIsGlitching(true);
    }
  };

  const handleMouseLeave = () => {
    if (glitchOnHover) {
      setIsGlitching(false);
    }
  };

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-text={text}
    >
      <span
        className={`relative z-10 ${isGlitching ? "animate-glitch" : ""}`}
        style={{
          textShadow: isGlitching
            ? "0.05em 0 0 #ff00ff, -0.03em -0.04em 0 #00d4ff, 0.025em 0.04em 0 #ffff00"
            : "none",
        }}
      >
        {text}
      </span>

      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 w-full h-full opacity-80 text-cyber-pink"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              transform: "translate(-0.025em, -0.0125em)",
              animation: "glitch-1 0.6s infinite linear alternate-reverse",
            }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 w-full h-full opacity-80 text-cyber-blue"
            style={{
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              transform: "translate(0.025em, 0.0125em)",
              animation: "glitch-2 0.6s infinite linear alternate-reverse",
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};

export default GlitchText;
