/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cyber-pink": "#ff0080",
        "cyber-blue": "#00d4ff",
        "cyber-purple": "#8b5cf6",
        "cyber-green": "#00ff88",
        "neon-pink": "#ff00ff",
        "neon-blue": "#0080ff",
        "dark-bg": "#0a0a0a",
        "dark-card": "#1a1a1a",
        "dark-border": "#333333",
      },
      fontFamily: {
        cyber: ["Orbitron", "monospace"],
        mono: ["Fira Code", "monospace"],
      },
      animation: {
        glitch: "glitch 2s infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite alternate",
        float: "float 3s ease-in-out infinite",
        typing:
          "typing 3.5s steps(40, end), blink-caret .75s step-end infinite",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%": { transform: "translateX(-2px)" },
          "20%": { transform: "translateX(2px)" },
          "30%": { transform: "translateX(-2px)" },
          "40%": { transform: "translateX(2px)" },
          "50%": { transform: "translateX(-2px)" },
          "60%": { transform: "translateX(2px)" },
          "70%": { transform: "translateX(-2px)" },
          "80%": { transform: "translateX(2px)" },
          "90%": { transform: "translateX(-2px)" },
        },
        "neon-pulse": {
          "0%": {
            "box-shadow": "0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff",
            "text-shadow": "0 0 5px #ff00ff",
          },
          "100%": {
            "box-shadow":
              "0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff",
            "text-shadow": "0 0 10px #ff00ff",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "blink-caret": {
          "from, to": { "border-color": "transparent" },
          "50%": { "border-color": "#ff00ff" },
        },
      },
      boxShadow: {
        neon: "0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff",
        "neon-blue": "0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #00d4ff",
        "neon-green": "0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88",
      },
    },
  },
  plugins: [],
};
